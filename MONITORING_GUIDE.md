# 🔍 GÜVENLİ MONİTORİNG KILAVUZU

**UYARI**: Security monitoring verileri **hassas bilgi** içerir ve **public endpoint'e ASLA açılmamalıdır!**

---

## 🔒 GÜVENLİK PRENSİPLERİ

### ❌ ASLA YAPMAYIN
```typescript
// YANLIŞ - Güvenlik açığı!
app.get('/api/security/stats', (req, res) => {
  res.json(getSecurityStats()); // Herkes görebilir!
});
```

**Neden Tehlikeli:**
- Saldırganlar hangi IP'lerin engellendiğini görür
- Rate limit stratejinizi öğrenir
- Güvenlik açıklarınızı keşfeder
- Attack pattern'lerinizi analiz eder

---

## ✅ DOĞRU YAKLAŞIMLAR

### 1. SERVER CONSOLE LOGS (Varsayılan)

**Nasıl Çalışır:**
- Security event'ler **sadece server console'a** yazılır
- Vercel/AWS/DigitalOcean log sistemine kaydedilir
- Public endpoint yok, dışarıdan erişilemez

**Nasıl Görüntülenir:**

#### Vercel (Production)
```bash
# Vercel Dashboard > Project > Logs
# veya CLI ile:
vercel logs

# Real-time logs:
vercel logs --follow

# Sadece error logs:
vercel logs --level error
```

**Örnek Log Çıktısı:**
```json
{
  "timestamp": "2026-01-19T10:30:45.123Z",
  "type": "rate_limit_exceeded",
  "severity": "high",
  "ip": "192.168.1.100",
  "userAgent": "Mozilla/5.0...",
  "path": "/api/contact",
  "method": "POST",
  "details": {
    "attempts": 6,
    "limit": 5,
    "window": "1 hour"
  }
}
```

#### Local Development
```bash
# Terminal'de direkt görürsünüz:
npm run dev

# Output:
[SECURITY] {
  "timestamp": "2026-01-19T10:30:45.123Z",
  "type": "rate_limit_exceeded",
  "severity": "high",
  ...
}
```

---

### 2. EXTERNAL LOGGING SERVICE (Önerilen - Production)

**Neden Gerekli:**
- Vercel logs 7 gün sonra silinir
- Gelişmiş analiz ve alerting
- Dashboard ve görselleştirme
- Long-term storage

#### A. Datadog (Önerilen)

**Kurulum:**
```bash
npm install dd-trace
```

```typescript
// server/index.ts
import tracer from 'dd-trace';

if (process.env.NODE_ENV === 'production') {
  tracer.init({
    service: 'abt-mekatronik',
    env: 'production',
    logInjection: true
  });
}
```

**Environment Variables (Vercel):**
```bash
DD_API_KEY=your_datadog_api_key
DD_SITE=datadoghq.eu
```

**Maliyet:** $15/host/ay  
**Özellikler:**
- Real-time dashboard
- Custom alerts
- Log retention (15 gün)
- APM & Security monitoring

**Dashboard Erişimi:**
```
https://app.datadoghq.eu/logs
# Sadece Datadog hesabınızla erişebilirsiniz
# Public erişim YOK
```

#### B. Sentry (Error Tracking)

**Kurulum:**
```bash
npm install @sentry/node
```

```typescript
// server/index.ts
import * as Sentry from '@sentry/node';

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0
});

// Security event'leri Sentry'ye gönder
function sendToSentry(event: SecurityEvent) {
  Sentry.captureMessage(`Security: ${event.type}`, {
    level: event.severity as any,
    extra: event
  });
}
```

**Maliyet:** $26/ay (Team plan)  
**Özellikler:**
- Error tracking
- Performance monitoring
- Security alerts
- Email notifications

**Dashboard Erişimi:**
```
https://sentry.io/organizations/your-org/issues/
# Sadece Sentry hesabınızla erişebilirsiniz
```

#### C. LogRocket (Session Replay)

**Kurulum:**
```bash
npm install logrocket
```

```typescript
import LogRocket from 'logrocket';

LogRocket.init('your-app-id');

// Security event'leri LogRocket'e gönder
LogRocket.track('SecurityEvent', {
  type: event.type,
  severity: event.severity
});
```

**Maliyet:** $99/ay  
**Özellikler:**
- Session replay
- Console logs
- Network requests
- User behavior tracking

---

### 3. ADMIN-ONLY ENDPOINT (Gelişmiş)

**Güvenli Admin Endpoint:**

```typescript
// server/routes.ts
import { isAdminAuthenticated, getSecureStats } from './monitoring/security-monitor';

// 🔒 ADMIN-ONLY ENDPOINT
app.get('/api/admin/security/stats', (req, res) => {
  try {
    // Admin authentication kontrolü
    if (!isAdminAuthenticated(req)) {
      return res.status(401).json({
        error: 'Unauthorized',
        message: 'Admin access required'
      });
    }
    
    // Admin authenticated ise stats döndür
    const stats = getSecureStats(req);
    res.json(stats);
  } catch (error) {
    res.status(401).json({
      error: 'Unauthorized',
      message: error.message
    });
  }
});
```

**Environment Variables:**
```bash
# .env (ASLA git'e commit etmeyin!)
ADMIN_SECRET_TOKEN=super-secret-random-token-12345
```

**Kullanım:**
```bash
# Admin token ile istek
curl -H "X-Admin-Token: super-secret-random-token-12345" \
  https://abtmekatronik.com/api/admin/security/stats

# Response (sadece admin görebilir):
{
  "total": 1234,
  "criticalEvents": 4,
  "topAttackingIPs": [...]
}
```

**Güvenlik Önlemleri:**
- ✅ Strong token (min 32 karakter)
- ✅ Environment variable (hardcode etmeyin)
- ✅ HTTPS zorunlu
- ✅ Rate limiting (admin endpoint için de)
- ✅ IP whitelist (sadece ofis IP'si)

---

### 4. EMAIL ALERTS (Critical Events)

**Kurulum:**
```bash
npm install nodemailer
```

```typescript
// server/monitoring/email-alerts.ts
import nodemailer from 'nodemailer';

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.ALERT_EMAIL,
    pass: process.env.ALERT_EMAIL_PASSWORD
  }
});

export async function sendCriticalAlert(event: SecurityEvent) {
  const mailOptions = {
    from: process.env.ALERT_EMAIL,
    to: 'admin@abtmekatronik.com',
    subject: `🚨 CRITICAL SECURITY EVENT: ${event.type}`,
    html: `
      <h2>Critical Security Event Detected</h2>
      <p><strong>Type:</strong> ${event.type}</p>
      <p><strong>IP:</strong> ${event.ip}</p>
      <p><strong>Path:</strong> ${event.path}</p>
      <p><strong>Time:</strong> ${event.timestamp}</p>
      <pre>${JSON.stringify(event.details, null, 2)}</pre>
    `
  };

  await transporter.sendMail(mailOptions);
}
```

**Environment Variables:**
```bash
ALERT_EMAIL=alerts@abtmekatronik.com
ALERT_EMAIL_PASSWORD=your-app-password
```

---

### 5. SLACK NOTIFICATIONS

**Kurulum:**
```bash
npm install @slack/webhook
```

```typescript
// server/monitoring/slack-alerts.ts
import { IncomingWebhook } from '@slack/webhook';

const webhook = new IncomingWebhook(process.env.SLACK_WEBHOOK_URL!);

export async function sendSlackAlert(event: SecurityEvent) {
  await webhook.send({
    text: `🚨 Security Event: ${event.type}`,
    blocks: [
      {
        type: 'section',
        text: {
          type: 'mrkdwn',
          text: `*Security Event Detected*\n*Type:* ${event.type}\n*Severity:* ${event.severity}\n*IP:* ${event.ip}`
        }
      }
    ]
  });
}
```

**Slack Webhook URL:**
```bash
# Slack App > Incoming Webhooks > Add New Webhook
SLACK_WEBHOOK_URL=https://hooks.slack.com/services/YOUR/WEBHOOK/URL
```

---

## 📊 MONITORING ÇIKTI YÖNTEMLERİ KARŞILAŞTIRMA

| Yöntem | Maliyet | Güvenlik | Kullanım Kolaylığı | Önerilen |
|--------|---------|----------|-------------------|----------|
| **Server Console** | Ücretsiz | ✅ Güvenli | ⭐⭐⭐ | Başlangıç |
| **Datadog** | $15/ay | ✅ Güvenli | ⭐⭐⭐⭐⭐ | Production |
| **Sentry** | $26/ay | ✅ Güvenli | ⭐⭐⭐⭐ | Error tracking |
| **LogRocket** | $99/ay | ✅ Güvenli | ⭐⭐⭐⭐ | Session replay |
| **Admin Endpoint** | Ücretsiz | ⚠️ Dikkat | ⭐⭐⭐ | Gelişmiş |
| **Email Alerts** | Ücretsiz | ✅ Güvenli | ⭐⭐⭐⭐ | Critical events |
| **Slack Alerts** | Ücretsiz | ✅ Güvenli | ⭐⭐⭐⭐⭐ | Team collaboration |

---

## 🎯 ÖNERİLEN KURULUM (ABT MEKATRONİK)

### Başlangıç (İlk 3 Ay) - $0/ay
```
✅ Server Console Logs (Vercel)
✅ Email Alerts (Critical events)
✅ Slack Notifications (Team alerts)
```

**Kurulum:**
```bash
# 1. Email alerts kur
npm install nodemailer

# 2. Slack webhook kur
npm install @slack/webhook

# 3. Environment variables ekle
ALERT_EMAIL=alerts@abtmekatronik.com
ALERT_EMAIL_PASSWORD=your-password
SLACK_WEBHOOK_URL=your-webhook-url
```

### Büyüme (3-6 Ay) - $15/ay
```
✅ Datadog Monitoring
✅ Email Alerts
✅ Slack Notifications
```

**Kurulum:**
```bash
npm install dd-trace
```

### Kurumsal (6+ Ay) - $140/ay
```
✅ Datadog Monitoring ($15/ay)
✅ Sentry Error Tracking ($26/ay)
✅ LogRocket Session Replay ($99/ay)
✅ Email & Slack Alerts
```

---

## 🔧 KULLANIM ÖRNEKLERİ

### 1. Vercel Logs Görüntüleme

```bash
# Real-time logs
vercel logs --follow

# Son 100 log
vercel logs --limit 100

# Sadece error logs
vercel logs --level error

# Belirli tarih aralığı
vercel logs --since 2026-01-19 --until 2026-01-20
```

### 2. Datadog Dashboard

```
1. https://app.datadoghq.eu/logs adresine git
2. Search: "service:abt-mekatronik AND @type:security"
3. Filter: severity:critical
4. Time range: Last 24 hours
```

### 3. Email Alert Örneği

**Alınan Email:**
```
Subject: 🚨 CRITICAL SECURITY EVENT: xss_attempt

Critical Security Event Detected

Type: xss_attempt
IP: 192.168.1.100
Path: /api/contact
Time: 2026-01-19T10:30:45.123Z

Details:
{
  "input": "<script>alert('xss')</script>",
  "sanitized": "scriptalert('xss')/script",
  "blocked": true
}
```

### 4. Slack Alert Örneği

**Slack Channel:**
```
#security-alerts

🚨 Security Event: rate_limit_exceeded
Type: rate_limit_exceeded
Severity: high
IP: 192.168.1.100
Path: /api/contact
Time: 10:30 AM
```

---

## ⚠️ GÜVENLİK UYARILARI

### ASLA YAPMAYIN
❌ Public endpoint açmayın (`/api/security/stats`)  
❌ Admin token'ı hardcode etmeyin  
❌ Git'e secret key commit etmeyin  
❌ HTTP üzerinden admin endpoint açmayın  
❌ Weak admin password kullanmayın

### MUTLAKA YAPIN
✅ Environment variables kullanın  
✅ HTTPS zorunlu tutun  
✅ Strong token kullanın (min 32 karakter)  
✅ IP whitelist kullanın (admin endpoint)  
✅ Rate limiting ekleyin (admin endpoint)  
✅ External logging service kullanın (production)

---

## 📋 KURULUM KONTROL LİSTESİ

### Development
- [x] Server console logs çalışıyor
- [ ] Email alerts test edildi
- [ ] Slack notifications test edildi

### Production
- [ ] Vercel logs erişimi var
- [ ] External logging service kuruldu (Datadog/Sentry)
- [ ] Email alerts aktif
- [ ] Slack notifications aktif
- [ ] Admin endpoint güvenli (eğer kullanılıyorsa)
- [ ] Environment variables set edildi

---

## 🎓 SONUÇ

**Doğru Yaklaşım:**
1. **Development**: Server console logs
2. **Production**: External logging service (Datadog/Sentry)
3. **Critical Events**: Email + Slack alerts
4. **Admin Access**: Güvenli admin endpoint (opsiyonel)

**Yanlış Yaklaşım:**
❌ Public endpoint açmak (`/api/security/stats`)  
❌ Authentication olmadan stats döndürmek  
❌ Sensitive data'yı client'a göndermek

**Güvenlik Prensibi:**
> "Security monitoring verileri hassas bilgidir ve sadece authorized personel tarafından görüntülenmelidir."

---

**Hazırlayan**: ABT MEKATRONİK Security Team  
**Tarih**: 2026-01-19  
**Versiyon**: 1.0
