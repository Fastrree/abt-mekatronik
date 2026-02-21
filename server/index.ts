import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";
import {
  rateLimiter,
  sanitizeInputs,
  suspiciousActivityDetector,
  requestSizeLimiter,
  comprehensiveBotProtection
} from "./middleware/security";
import { languageRoutingMiddleware, setLanguageHeader } from "./middleware/language-routing";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// 🔒 SECURITY HEADERS - A+ Rating (SecurityHeaders.com Compliant)
app.use((req, res, next) => {
  // 1. HSTS - Force HTTPS (1 year, includeSubDomains, preload)
  res.setHeader('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  
  // 2. Content-Security-Policy (CSP) - XSS Protection
  // CRITICAL: This is the most important security header
  // Development: unsafe-inline/unsafe-eval for HMR
  // Production: Strict CSP without unsafe directives
  const isDevelopment = process.env.NODE_ENV !== 'production';
  
  const cspDirectives = [
    "default-src 'self'",
    isDevelopment 
      ? "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://cdn.jsdelivr.net https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com blob:"
      : "script-src 'self' https://cdn.jsdelivr.net https://unpkg.com https://www.googletagmanager.com https://www.google-analytics.com blob:",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://cdn.jsdelivr.net",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https:",
    "connect-src 'self' https: wss: https://www.google-analytics.com https://*.ingest.de.sentry.io",
    "frame-src 'self' https://wa.me https://api.whatsapp.com https://www.google.com",
    "media-src 'self' blob: data:",
    "worker-src 'self' blob:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
    "frame-ancestors 'none'",
    "upgrade-insecure-requests",
    "block-all-mixed-content"
  ];
  
  res.setHeader('Content-Security-Policy', cspDirectives.join('; '));
  
  // 3. X-Frame-Options - Clickjacking Protection
  // DENY is stronger than SAMEORIGIN
  res.setHeader('X-Frame-Options', 'DENY');
  
  // 4. X-Content-Type-Options - MIME Sniffing Protection
  res.setHeader('X-Content-Type-Options', 'nosniff');
  
  // 5. Referrer-Policy - Information Leakage Protection
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // 6. Permissions-Policy - Feature Control (Disable unnecessary APIs)
  res.setHeader('Permissions-Policy', [
    'geolocation=()',
    'microphone=()',
    'camera=()',
    'payment=()',
    'usb=()',
    'magnetometer=()',
    'gyroscope=()',
    'accelerometer=()',
    'autoplay=()',
    'encrypted-media=()',
    'fullscreen=(self)',
    'picture-in-picture=()'
  ].join(', '));
  
  // 7. X-XSS-Protection - Legacy XSS Protection (for older browsers)
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // 8. X-DNS-Prefetch-Control - Privacy Enhancement
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  
  // 9. X-Download-Options - IE8+ Download Protection
  res.setHeader('X-Download-Options', 'noopen');
  
  // 10. X-Permitted-Cross-Domain-Policies - Adobe Products Protection
  res.setHeader('X-Permitted-Cross-Domain-Policies', 'none');
  
  // 11. Cross-Origin-Embedder-Policy - Isolation
  res.setHeader('Cross-Origin-Embedder-Policy', 'require-corp');
  
  // 12. Cross-Origin-Opener-Policy - Isolation
  res.setHeader('Cross-Origin-Opener-Policy', 'same-origin');
  
  // 13. Cross-Origin-Resource-Policy - Resource Protection
  res.setHeader('Cross-Origin-Resource-Policy', 'same-origin');
  
  next();
});

// 🌍 LANGUAGE ROUTING MIDDLEWARE
// Handle URL-based language routing (must be before other middleware)
app.use(languageRoutingMiddleware);
app.use(setLanguageHeader);

// 🔒 SECURITY MIDDLEWARE LAYER
// Request size limiter - DoS koruması
app.use(requestSizeLimiter(2 * 1024 * 1024)); // 2MB max

// 🤖 BOT PROTECTION
// Comprehensive bot protection (user agent, honeypot, fingerprint)
app.use(comprehensiveBotProtection({
  enableUserAgentCheck: true,
  enableHoneypot: true,
  enableFingerprint: true
}));

// Suspicious activity detector
app.use(suspiciousActivityDetector);

// Rate limiting - Brute force koruması
app.use('/api', rateLimiter({
  windowMs: 15 * 60 * 1000, // 15 dakika
  maxRequests: 100, // 15 dakikada max 100 istek
  message: 'Too many requests from this IP, please try again later.'
}));

// Contact form için daha sıkı rate limit
app.use('/api/contact', rateLimiter({
  windowMs: 60 * 60 * 1000, // 1 saat
  maxRequests: 5, // Saatte max 5 form submission
  message: 'Too many contact form submissions. Please try again in an hour.'
}));

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
    limit: '1mb', // Request size limiti
  }),
);

app.use(express.urlencoded({ extended: false, limit: '1mb' }));

// Input sanitization - XSS koruması
app.use(sanitizeInputs);

export function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    second: "2-digit",
    hour12: true,
  });

  console.log(`${formattedTime} [${source}] ${message}`);
}

app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      log(logLine);
    }
  });

  next();
});

(async () => {
  await registerRoutes(httpServer, app);

  app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
    const status = err.status || err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    res.status(status).json({ message });
    throw err;
  });

  // importantly only setup vite in development and after
  // setting up all the other routes so the catch-all route
  // doesn't interfere with the other routes
  if (process.env.NODE_ENV === "production") {
    serveStatic(app);
  } else {
    const { setupVite } = await import("./vite");
    await setupVite(httpServer, app);
  }

  // ALWAYS serve the app on the port specified in the environment variable PORT
  // Other ports are firewalled. Default to 5000 if not specified.
  // this serves both the API and the client.
  // It is the only port that is not firewalled.
  const port = parseInt(process.env.PORT || "3000", 10);
  httpServer.listen(port, () => {
    log(`serving on http://localhost:${port}`);
  });
})();
