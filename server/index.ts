import express, { type Request, Response, NextFunction } from "express";
import { registerRoutes } from "./routes";
import { serveStatic } from "./static";
import { createServer } from "http";

const app = express();
const httpServer = createServer(app);

declare module "http" {
  interface IncomingMessage {
    rawBody: unknown;
  }
}

// Security Headers - Bot widget'larına izin veren CSP
app.use((req, res, next) => {
  // XSS koruması
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  
  // Clickjacking koruması - kendi domain'inde iframe'e izin ver
  res.setHeader('X-Frame-Options', 'SAMEORIGIN');
  
  // Referrer policy
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Permissions policy - gereksiz API'leri kapat
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
  
  // Content Security Policy - Bot widget'larına izin verir
  // Tawk.to, Crisp, Intercom, WhatsApp widget, Tidio vb. için açık
  res.setHeader('Content-Security-Policy', [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.tawk.to https://*.crisp.chat https://*.intercom.io https://*.tidio.co https://*.hubspot.com https://*.zopim.com https://*.zendesk.com https://cdn.jsdelivr.net https://unpkg.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://*.tawk.to https://*.crisp.chat",
    "font-src 'self' https://fonts.gstatic.com data:",
    "img-src 'self' data: blob: https: http:",
    "connect-src 'self' https: wss:",
    "frame-src 'self' https://*.tawk.to https://*.crisp.chat https://*.intercom.io https://wa.me https://api.whatsapp.com",
    "media-src 'self' blob: data:",
    "object-src 'none'",
    "base-uri 'self'",
    "form-action 'self'",
  ].join('; '));
  
  next();
});

app.use(
  express.json({
    verify: (req, _res, buf) => {
      req.rawBody = buf;
    },
    limit: '1mb', // Request size limiti
  }),
);

app.use(express.urlencoded({ extended: false, limit: '1mb' }));

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
