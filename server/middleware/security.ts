/**
 * 🔒 SECURITY MIDDLEWARE
 * Kurumsal seviye güvenlik katmanı
 */

import { Request, Response, NextFunction } from 'express';
import crypto from 'crypto';

// Session type extension
declare module 'express-serve-static-core' {
  interface Request {
    session?: {
      csrfToken?: string;
      fingerprint?: string;
      destroy: (callback: (err?: any) => void) => void;
    };
    sessionID?: string;
  }
}

// Rate limiting store (production'da Redis kullan)
interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

const rateLimitStore: RateLimitStore = {};

/**
 * CSRF Token Generator
 * Cross-Site Request Forgery koruması
 */
export function generateCSRFToken(): string {
  return crypto.randomBytes(32).toString('hex');
}

/**
 * CSRF Token Validator
 */
export function validateCSRFToken(req: Request, res: Response, next: NextFunction) {
  // GET, HEAD, OPTIONS istekleri için CSRF kontrolü yapma
  if (['GET', 'HEAD', 'OPTIONS'].includes(req.method)) {
    return next();
  }

  const token = req.headers['x-csrf-token'] || req.body._csrf;
  const sessionToken = req.session?.csrfToken;

  if (!token || !sessionToken || token !== sessionToken) {
    return res.status(403).json({
      error: 'CSRF token validation failed',
      message: 'Invalid or missing CSRF token'
    });
  }

  next();
}

/**
 * Rate Limiter
 * Brute force ve DDoS koruması
 */
export function rateLimiter(options: {
  windowMs: number;  // Zaman penceresi (ms)
  maxRequests: number;  // Max istek sayısı
  message?: string;
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';
    const key = `${ip}:${req.path}`;
    const now = Date.now();

    // Store'dan rate limit bilgisini al
    let record = rateLimitStore[key];

    // Yeni kayıt veya süresi dolmuş kayıt
    if (!record || now > record.resetTime) {
      rateLimitStore[key] = {
        count: 1,
        resetTime: now + options.windowMs
      };
      return next();
    }

    // Rate limit aşıldı mı?
    if (record.count >= options.maxRequests) {
      const retryAfter = Math.ceil((record.resetTime - now) / 1000);
      res.setHeader('Retry-After', retryAfter.toString());
      return res.status(429).json({
        error: 'Too many requests',
        message: options.message || 'Rate limit exceeded. Please try again later.',
        retryAfter
      });
    }

    // İstek sayısını artır
    record.count++;
    next();
  };
}

/**
 * Input Sanitizer Middleware
 * XSS koruması için tüm input'ları temizle
 */
export function sanitizeInputs(req: Request, res: Response, next: NextFunction) {
  // Body sanitization
  if (req.body && typeof req.body === 'object') {
    req.body = sanitizeObject(req.body);
  }

  // Query sanitization
  if (req.query && typeof req.query === 'object') {
    req.query = sanitizeObject(req.query);
  }

  next();
}

/**
 * Object Sanitizer
 * Recursive olarak tüm string değerleri temizle
 */
function sanitizeObject(obj: any): any {
  if (typeof obj === 'string') {
    return sanitizeString(obj);
  }

  if (Array.isArray(obj)) {
    return obj.map(item => sanitizeObject(item));
  }

  if (obj && typeof obj === 'object') {
    const sanitized: any = {};
    for (const key in obj) {
      sanitized[key] = sanitizeObject(obj[key]);
    }
    return sanitized;
  }

  return obj;
}

/**
 * String Sanitizer
 * XSS ve injection koruması
 */
function sanitizeString(str: string): string {
  return str
    .replace(/[<>]/g, '')           // HTML tags
    .replace(/javascript:/gi, '')    // JavaScript protocol
    .replace(/on\w+=/gi, '')         // Event handlers
    .replace(/data:text\/html/gi, '') // Data URIs
    .trim()
    .slice(0, 10000);               // Max length
}

/**
 * Security Logger
 * Güvenlik olaylarını logla
 */
export function securityLogger(event: string, details: any) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    event,
    details,
    severity: getSeverity(event)
  };

  // Console log (production'da external service'e gönder)
  console.log('[SECURITY]', JSON.stringify(logEntry));

  // Kritik olaylar için alert (production'da email/SMS)
  if (logEntry.severity === 'critical') {
    console.error('[CRITICAL SECURITY EVENT]', logEntry);
  }
}

/**
 * Event Severity Classifier
 */
function getSeverity(event: string): 'low' | 'medium' | 'high' | 'critical' {
  const criticalEvents = ['sql_injection', 'xss_attempt', 'csrf_failure'];
  const highEvents = ['rate_limit_exceeded', 'invalid_token'];
  const mediumEvents = ['suspicious_input', 'unusual_activity'];

  if (criticalEvents.includes(event)) return 'critical';
  if (highEvents.includes(event)) return 'high';
  if (mediumEvents.includes(event)) return 'medium';
  return 'low';
}

/**
 * IP Whitelist/Blacklist
 * Belirli IP'leri engelle veya izin ver
 */
export function ipFilter(options: {
  whitelist?: string[];
  blacklist?: string[];
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || req.socket.remoteAddress || 'unknown';

    // Blacklist kontrolü
    if (options.blacklist && options.blacklist.includes(ip)) {
      securityLogger('ip_blocked', { ip, reason: 'blacklisted' });
      return res.status(403).json({
        error: 'Access denied',
        message: 'Your IP address has been blocked'
      });
    }

    // Whitelist kontrolü (eğer whitelist varsa)
    if (options.whitelist && options.whitelist.length > 0) {
      if (!options.whitelist.includes(ip)) {
        securityLogger('ip_blocked', { ip, reason: 'not_whitelisted' });
        return res.status(403).json({
          error: 'Access denied',
          message: 'Your IP address is not authorized'
        });
      }
    }

    next();
  };
}

/**
 * Request Size Limiter
 * Büyük payload'ları engelle (DoS koruması)
 */
export function requestSizeLimiter(maxSize: number) {
  return (req: Request, res: Response, next: NextFunction) => {
    const contentLength = parseInt(req.headers['content-length'] || '0', 10);

    if (contentLength > maxSize) {
      securityLogger('request_too_large', {
        size: contentLength,
        maxSize,
        ip: req.ip
      });
      return res.status(413).json({
        error: 'Payload too large',
        message: `Request size exceeds ${maxSize} bytes`
      });
    }

    next();
  };
}

/**
 * Suspicious Activity Detector
 * Şüpheli davranışları tespit et
 */
export function suspiciousActivityDetector(req: Request, res: Response, next: NextFunction) {
  const suspiciousPatterns = [
    /(\.\.|\/etc\/|\/proc\/|\/sys\/)/i,  // Path traversal
    /(union|select|insert|update|delete|drop|create|alter)/i,  // SQL keywords
    /(<script|javascript:|onerror=|onload=)/i,  // XSS patterns
    /(eval\(|exec\(|system\(|passthru\()/i,  // Code execution
  ];

  const checkString = JSON.stringify({
    body: req.body,
    query: req.query,
    params: req.params
  });

  for (const pattern of suspiciousPatterns) {
    if (pattern.test(checkString)) {
      securityLogger('suspicious_activity', {
        pattern: pattern.toString(),
        ip: req.ip,
        path: req.path,
        method: req.method
      });
      
      // Şüpheli aktiviteyi logla ama engelleme (false positive olabilir)
      // Production'da daha agresif olabilir
      break;
    }
  }

  next();
}

/**
 * Session Security
 * Session hijacking koruması
 */
export function sessionSecurity(req: Request, res: Response, next: NextFunction) {
  if (req.session) {
    // Session fingerprint oluştur
    const fingerprint = crypto
      .createHash('sha256')
      .update(req.headers['user-agent'] || '')
      .update(req.ip || '')
      .digest('hex');

    // İlk istek - fingerprint kaydet
    if (!req.session.fingerprint) {
      req.session.fingerprint = fingerprint;
    }
    // Fingerprint değişmiş - session hijacking olabilir
    else if (req.session.fingerprint !== fingerprint) {
      securityLogger('session_hijack_attempt', {
        sessionId: req.sessionID,
        ip: req.ip,
        userAgent: req.headers['user-agent']
      });
      
      // Session'ı yok et
      req.session.destroy(() => {
        res.status(401).json({
          error: 'Session invalid',
          message: 'Your session has been terminated for security reasons'
        });
      });
      return;
    }
  }

  next();
}


/**
 * 🤖 BOT PROTECTION
 * Bot ve automated attack koruması
 */

// Bot detection patterns
const BOT_USER_AGENTS = [
  /bot/i,
  /crawler/i,
  /spider/i,
  /scraper/i,
  /curl/i,
  /wget/i,
  /python-requests/i,
  /go-http-client/i,
  /java/i,
  /apache-httpclient/i,
];

// Known good bots (allow these)
const GOOD_BOTS = [
  /googlebot/i,
  /bingbot/i,
  /slackbot/i,
  /twitterbot/i,
  /facebookexternalhit/i,
  /linkedinbot/i,
  /whatsapp/i,
];

/**
 * Bot Detector
 * Kötü bot'ları tespit et ve engelle
 */
export function botProtection(options?: {
  allowGoodBots?: boolean;
  blockUnknownBots?: boolean;
}) {
  const allowGoodBots = options?.allowGoodBots ?? true;
  const blockUnknownBots = options?.blockUnknownBots ?? true;

  return (req: Request, res: Response, next: NextFunction) => {
    const userAgent = req.headers['user-agent'] || '';

    // User agent yoksa şüpheli
    if (!userAgent) {
      securityLogger('bot_no_user_agent', {
        ip: req.ip,
        path: req.path
      });
      
      if (blockUnknownBots) {
        return res.status(403).json({
          error: 'Forbidden',
          message: 'User agent required'
        });
      }
    }

    // Good bot kontrolü
    if (allowGoodBots) {
      for (const pattern of GOOD_BOTS) {
        if (pattern.test(userAgent)) {
          // Good bot, izin ver
          return next();
        }
      }
    }

    // Bad bot kontrolü
    for (const pattern of BOT_USER_AGENTS) {
      if (pattern.test(userAgent)) {
        securityLogger('bot_detected', {
          ip: req.ip,
          userAgent,
          path: req.path,
          method: req.method
        });

        return res.status(403).json({
          error: 'Forbidden',
          message: 'Automated access detected'
        });
      }
    }

    next();
  };
}

/**
 * Honeypot Field Protection
 * Invisible field ile bot tespiti
 */
export function honeypotProtection(fieldName: string = '_honeypot') {
  return (req: Request, res: Response, next: NextFunction) => {
    // POST isteklerinde honeypot kontrolü
    if (req.method === 'POST' && req.body) {
      const honeypotValue = req.body[fieldName];

      // Honeypot doldurulmuşsa bot
      if (honeypotValue && honeypotValue.trim() !== '') {
        securityLogger('honeypot_triggered', {
          ip: req.ip,
          userAgent: req.headers['user-agent'],
          path: req.path,
          honeypotValue
        });

        // Bot'a başarılı gibi göster (ama kaydetme)
        return res.status(200).json({
          success: true,
          message: 'Form submitted successfully'
        });
      }
    }

    next();
  };
}

/**
 * Request Timing Analysis
 * Çok hızlı form submission'ları tespit et
 */
interface TimingStore {
  [key: string]: number;
}

const formTimings: TimingStore = {};

export function timingProtection(options: {
  minTime: number; // Minimum form doldurma süresi (ms)
  maxTime: number; // Maximum form doldurma süresi (ms)
}) {
  return (req: Request, res: Response, next: NextFunction) => {
    const ip = req.ip || 'unknown';
    const now = Date.now();

    // Form başlangıç zamanı
    if (req.method === 'GET') {
      formTimings[ip] = now;
      return next();
    }

    // Form submission zamanı
    if (req.method === 'POST') {
      const startTime = formTimings[ip];

      if (startTime) {
        const elapsed = now - startTime;

        // Çok hızlı (bot)
        if (elapsed < options.minTime) {
          securityLogger('form_too_fast', {
            ip,
            elapsed,
            minTime: options.minTime,
            path: req.path
          });

          return res.status(429).json({
            error: 'Too fast',
            message: 'Please take your time filling the form'
          });
        }

        // Çok yavaş (şüpheli)
        if (elapsed > options.maxTime) {
          securityLogger('form_too_slow', {
            ip,
            elapsed,
            maxTime: options.maxTime,
            path: req.path
          });
        }

        // Timing'i temizle
        delete formTimings[ip];
      }
    }

    next();
  };
}

/**
 * Browser Fingerprint Validation
 * Tarayıcı fingerprint'i ile bot tespiti
 */
export function fingerprintProtection(req: Request, res: Response, next: NextFunction) {
  const headers = req.headers;

  // Şüpheli header kombinasyonları
  const suspiciousPatterns = [
    // Accept header yoksa şüpheli
    !headers.accept,
    // Accept-Language yoksa şüpheli
    !headers['accept-language'],
    // Accept-Encoding yoksa şüpheli
    !headers['accept-encoding'],
    // Connection header anormal
    headers.connection && headers.connection.toLowerCase() !== 'keep-alive',
  ];

  const suspiciousCount = suspiciousPatterns.filter(Boolean).length;

  // 2+ şüpheli pattern varsa bot olabilir
  if (suspiciousCount >= 2) {
    securityLogger('suspicious_fingerprint', {
      ip: req.ip,
      userAgent: headers['user-agent'],
      suspiciousCount,
      headers: {
        accept: headers.accept,
        acceptLanguage: headers['accept-language'],
        acceptEncoding: headers['accept-encoding'],
        connection: headers.connection
      }
    });

    // Logla ama engelleme (false positive olabilir)
    // Production'da daha agresif olabilir
  }

  next();
}

/**
 * Challenge-Response Protection
 * Basit matematik sorusu ile bot tespiti
 */
interface ChallengeStore {
  [key: string]: {
    question: string;
    answer: number;
    timestamp: number;
  };
}

const challenges: ChallengeStore = {};

export function challengeProtection() {
  return {
    // Challenge oluştur
    generateChallenge: (req: Request, res: Response) => {
      const ip = req.ip || 'unknown';
      const num1 = Math.floor(Math.random() * 10) + 1;
      const num2 = Math.floor(Math.random() * 10) + 1;

      challenges[ip] = {
        question: `${num1} + ${num2}`,
        answer: num1 + num2,
        timestamp: Date.now()
      };

      res.json({
        challenge: challenges[ip].question
      });
    },

    // Challenge doğrula
    validateChallenge: (req: Request, res: Response, next: NextFunction) => {
      const ip = req.ip || 'unknown';
      const userAnswer = parseInt(req.body._challenge, 10);
      const challenge = challenges[ip];

      // Challenge yoksa veya süresi dolmuşsa
      if (!challenge || Date.now() - challenge.timestamp > 300000) { // 5 dakika
        return res.status(400).json({
          error: 'Challenge expired',
          message: 'Please refresh and try again'
        });
      }

      // Cevap yanlışsa
      if (userAnswer !== challenge.answer) {
        securityLogger('challenge_failed', {
          ip,
          expected: challenge.answer,
          received: userAnswer
        });

        return res.status(400).json({
          error: 'Challenge failed',
          message: 'Incorrect answer'
        });
      }

      // Challenge başarılı, temizle
      delete challenges[ip];
      next();
    }
  };
}

/**
 * Comprehensive Bot Protection Middleware
 * Tüm bot koruma yöntemlerini birleştirir
 */
export function comprehensiveBotProtection(options?: {
  enableUserAgentCheck?: boolean;
  enableHoneypot?: boolean;
  enableTiming?: boolean;
  enableFingerprint?: boolean;
}) {
  const config = {
    enableUserAgentCheck: options?.enableUserAgentCheck ?? true,
    enableHoneypot: options?.enableHoneypot ?? true,
    enableTiming: options?.enableTiming ?? true,
    enableFingerprint: options?.enableFingerprint ?? true,
  };

  return (req: Request, res: Response, next: NextFunction) => {
    // User agent check
    if (config.enableUserAgentCheck) {
      const userAgent = req.headers['user-agent'] || '';
      
      // Good bot'ları atla
      const isGoodBot = GOOD_BOTS.some(pattern => pattern.test(userAgent));
      if (!isGoodBot) {
        // Bad bot kontrolü
        const isBadBot = BOT_USER_AGENTS.some(pattern => pattern.test(userAgent));
        if (isBadBot) {
          securityLogger('bot_blocked', {
            ip: req.ip,
            userAgent,
            path: req.path
          });
          return res.status(403).json({
            error: 'Forbidden',
            message: 'Automated access detected'
          });
        }
      }
    }

    // Honeypot check (POST istekleri için)
    if (config.enableHoneypot && req.method === 'POST' && req.body) {
      const honeypot = req.body._honeypot;
      if (honeypot && honeypot.trim() !== '') {
        securityLogger('honeypot_triggered', {
          ip: req.ip,
          path: req.path
        });
        // Bot'a başarılı gibi göster
        return res.status(200).json({
          success: true,
          message: 'Form submitted successfully'
        });
      }
    }

    // Fingerprint check
    if (config.enableFingerprint) {
      const headers = req.headers;
      const suspiciousCount = [
        !headers.accept,
        !headers['accept-language'],
        !headers['accept-encoding'],
      ].filter(Boolean).length;

      if (suspiciousCount >= 2) {
        securityLogger('suspicious_fingerprint', {
          ip: req.ip,
          suspiciousCount
        });
        // Logla ama engelleme (false positive riski)
      }
    }

    next();
  };
}
