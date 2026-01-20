import { createRoot } from "react-dom/client";
import * as Sentry from "@sentry/react";
import App from "./App";
import "./index.css";

// Production: Suppress console logs
if (import.meta.env.PROD) {
  console.log = () => {};
  console.debug = () => {};
  console.info = () => {};
  // Keep console.warn and console.error for critical issues
}

// Make Sentry globally accessible for testing
(window as any).Sentry = Sentry;

// Initialize Sentry for error tracking
Sentry.init({
  dsn: import.meta.env.VITE_SENTRY_DSN || "https://27046cc68c698b40908324726d122527@o4510736861036544.ingest.de.sentry.io/4510736862412880",
  environment: import.meta.env.MODE,
  integrations: [
    Sentry.browserTracingIntegration(),
    Sentry.replayIntegration({
      maskAllText: false,
      blockAllMedia: false,
    }),
  ],
  // Performance Monitoring
  tracesSampleRate: import.meta.env.PROD ? 0.1 : 1.0, // 10% in production, 100% in dev
  // Session Replay
  replaysSessionSampleRate: 0.1, // 10% of sessions
  replaysOnErrorSampleRate: 1.0, // 100% of sessions with errors
  // Release tracking
  release: import.meta.env.VITE_APP_VERSION || "development",
  // Ignore common non-critical errors
  ignoreErrors: [
    "ResizeObserver loop limit exceeded",
    "Non-Error promise rejection captured",
    "Network request failed",
    "Failed to fetch",
  ],
  // Filter out noise from Sentry
  beforeSend(event, hint) {
    // Don't send events from browser extensions
    if (event.exception?.values?.[0]?.value?.includes('chrome-extension://')) {
      return null;
    }
    // Don't send ad blocker errors
    if (event.exception?.values?.[0]?.value?.includes('ERR_BLOCKED_BY_CLIENT')) {
      return null;
    }
    return event;
  },
});

createRoot(document.getElementById("root")!).render(<App />);
