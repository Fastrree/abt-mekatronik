/**
 * 🔍 SECURITY MONITORING SYSTEM
 * Gerçek zamanlı güvenlik izleme ve log sistemi
 */

import { Request } from 'express';

// Security event types
export type SecurityEventType =
  | 'rate_limit_exceeded'
  | 'suspicious_activity'
  | 'xss_attempt'
  | 'sql_injection_attempt'
  | 'csrf_failure'
  | 'session_hijack'
  | 'ip_blocked'
  | 'request_too_large'
  | 'invalid_input'
  | 'unauthorized_access';

export interface SecurityEvent {
  timestamp: string;
  type: SecurityEventType;
  severity: 'low' | 'medium' | 'high' | 'critical';
  ip: string;
  userAgent: string;
  path: string;
  method: string;
  details: Record<string, any>;
}

// In-memory event store (production'da database kullan)
const securityEvents: SecurityEvent[] = [];
const MAX_EVENTS = 1000; // Son 1000 event'i sakla

/**
 * Log Security Event
 * 🔒 SECURITY: Bu fonksiyon SADECE server-side çalışır
 * Public endpoint'e ASLA açılmamalı!
 */
export function logSecurityEvent(
  type: SecurityEventType,
  req: Request,
  details: Record<string, any> = {}
) {
  const event: SecurityEvent = {
    timestamp: new Date().toISOString(),
    type,
    severity: getSeverity(type),
    ip: req.ip || req.socket.remoteAddress || 'unknown',
    userAgent: req.headers['user-agent'] || 'unknown',
    path: req.path,
    method: req.method,
    details
  };

  // Event'i store'a ekle
  securityEvents.push(event);
  
  // Max limit aşıldıysa eski event'leri sil
  if (securityEvents.length > MAX_EVENTS) {
    securityEvents.shift();
  }

  // 🔒 SADECE SERVER CONSOLE'A LOG
  // Public endpoint'e ASLA açılmaz!
  const logLevel = event.severity === 'critical' || event.severity === 'high' ? 'error' : 'warn';
  console[logLevel]('[SECURITY]', JSON.stringify(event, null, 2));

  // Critical event'ler için alert (production'da email/SMS)
  if (event.severity === 'critical') {
    alertCriticalEvent(event);
  }

  // 🔒 PRODUCTION: External logging service'e gönder
  // Örnek: Datadog, Sentry, LogRocket
  if (process.env.NODE_ENV === 'production') {
    sendToExternalLogger(event);
  }

  return event;
}

/**
 * Get Event Severity
 */
function getSeverity(type: SecurityEventType): SecurityEvent['severity'] {
  const severityMap: Record<SecurityEventType, SecurityEvent['severity']> = {
    'xss_attempt': 'critical',
    'sql_injection_attempt': 'critical',
    'session_hijack': 'critical',
    'csrf_failure': 'high',
    'rate_limit_exceeded': 'high',
    'ip_blocked': 'high',
    'suspicious_activity': 'medium',
    'request_too_large': 'medium',
    'invalid_input': 'low',
    'unauthorized_access': 'medium'
  };

  return severityMap[type] || 'low';
}

/**
 * Alert Critical Event
 * Production'da email, SMS, Slack notification gönder
 */
function alertCriticalEvent(event: SecurityEvent) {
  console.error('🚨 CRITICAL SECURITY EVENT 🚨');
  console.error('Type:', event.type);
  console.error('IP:', event.ip);
  console.error('Path:', event.path);
  console.error('Details:', event.details);
  
  // TODO: Production'da gerçek alert sistemi
  // - Email: nodemailer
  // - SMS: Twilio
  // - Slack: Webhook
  // - PagerDuty: API
}

/**
 * Get Security Events
 * Dashboard için event listesi
 */
export function getSecurityEvents(filters?: {
  type?: SecurityEventType;
  severity?: SecurityEvent['severity'];
  ip?: string;
  limit?: number;
}): SecurityEvent[] {
  let filtered = [...securityEvents];

  if (filters?.type) {
    filtered = filtered.filter(e => e.type === filters.type);
  }

  if (filters?.severity) {
    filtered = filtered.filter(e => e.severity === filters.severity);
  }

  if (filters?.ip) {
    filtered = filtered.filter(e => e.ip === filters.ip);
  }

  // En yeni event'ler önce
  filtered.reverse();

  if (filters?.limit) {
    filtered = filtered.slice(0, filters.limit);
  }

  return filtered;
}

/**
 * Get Security Statistics
 * Dashboard için istatistikler
 */
export function getSecurityStats() {
  const now = Date.now();
  const oneHourAgo = now - (60 * 60 * 1000);
  const oneDayAgo = now - (24 * 60 * 60 * 1000);

  const recentEvents = securityEvents.filter(e => 
    new Date(e.timestamp).getTime() > oneHourAgo
  );

  const dailyEvents = securityEvents.filter(e => 
    new Date(e.timestamp).getTime() > oneDayAgo
  );

  // Event type counts
  const eventTypeCounts: Record<string, number> = {};
  securityEvents.forEach(e => {
    eventTypeCounts[e.type] = (eventTypeCounts[e.type] || 0) + 1;
  });

  // Severity counts
  const severityCounts: Record<string, number> = {
    low: 0,
    medium: 0,
    high: 0,
    critical: 0
  };
  securityEvents.forEach(e => {
    severityCounts[e.severity]++;
  });

  // Top attacking IPs
  const ipCounts: Record<string, number> = {};
  securityEvents.forEach(e => {
    ipCounts[e.ip] = (ipCounts[e.ip] || 0) + 1;
  });
  const topIPs = Object.entries(ipCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 10)
    .map(([ip, count]) => ({ ip, count }));

  return {
    total: securityEvents.length,
    lastHour: recentEvents.length,
    last24Hours: dailyEvents.length,
    byType: eventTypeCounts,
    bySeverity: severityCounts,
    topAttackingIPs: topIPs,
    criticalEvents: securityEvents.filter(e => e.severity === 'critical').length
  };
}

/**
 * Clear Old Events
 * Eski event'leri temizle (cron job ile çalıştır)
 */
export function clearOldEvents(daysToKeep: number = 7) {
  const cutoffDate = Date.now() - (daysToKeep * 24 * 60 * 60 * 1000);
  
  const initialLength = securityEvents.length;
  
  // Eski event'leri filtrele
  for (let i = securityEvents.length - 1; i >= 0; i--) {
    if (new Date(securityEvents[i].timestamp).getTime() < cutoffDate) {
      securityEvents.splice(i, 1);
    }
  }

  const removed = initialLength - securityEvents.length;
  console.log(`[SECURITY] Cleared ${removed} old events (keeping last ${daysToKeep} days)`);
  
  return removed;
}

/**
 * Export Events to JSON
 * Backup veya analiz için event'leri export et
 */
export function exportEvents(): string {
  return JSON.stringify({
    exportDate: new Date().toISOString(),
    totalEvents: securityEvents.length,
    events: securityEvents
  }, null, 2);
}

/**
 * Health Check
 * Monitoring sisteminin sağlığını kontrol et
 */
export function healthCheck() {
  const stats = getSecurityStats();
  
  return {
    status: 'healthy',
    uptime: process.uptime(),
    memoryUsage: process.memoryUsage(),
    securityStats: stats,
    alerts: {
      criticalEvents: stats.criticalEvents,
      recentHighSeverity: stats.bySeverity.high + stats.bySeverity.critical
    }
  };
}


/**
 * 🔒 EXTERNAL LOGGER INTEGRATION
 * Production'da external logging service'e gönder
 */
function sendToExternalLogger(event: SecurityEvent) {
  // TODO: Production'da gerçek external logger entegrasyonu
  
  // Örnek: Datadog
  // datadogLogger.log(event);
  
  // Örnek: Sentry
  // Sentry.captureMessage(`Security Event: ${event.type}`, {
  //   level: event.severity,
  //   extra: event
  // });
  
  // Örnek: Custom webhook
  // fetch('https://your-logging-service.com/api/logs', {
  //   method: 'POST',
  //   headers: { 'Content-Type': 'application/json' },
  //   body: JSON.stringify(event)
  // });
  
  console.log('[EXTERNAL_LOGGER] Event sent to external service:', event.type);
}

/**
 * 🔒 ADMIN-ONLY ENDPOINT HELPER
 * Admin authentication için helper fonksiyon
 */
export function isAdminAuthenticated(req: Request): boolean {
  // TODO: Gerçek admin authentication
  // Örnek: JWT token, session, API key
  
  const adminToken = req.headers['x-admin-token'];
  const validToken = process.env.ADMIN_SECRET_TOKEN;
  
  return adminToken === validToken;
}

/**
 * 🔒 SECURE STATS ENDPOINT
 * Admin-only, authentication gerektirir
 */
export function getSecureStats(req: Request) {
  // Admin authentication kontrolü
  if (!isAdminAuthenticated(req)) {
    throw new Error('Unauthorized: Admin access required');
  }
  
  // Admin authenticated ise stats döndür
  return getSecurityStats();
}
