import * as Sentry from "@sentry/react";

/**
 * Manually capture an exception with additional context
 */
export const captureException = (
  error: Error,
  context?: Record<string, any>
) => {
  Sentry.captureException(error, {
    extra: context,
  });
};

/**
 * Capture a custom message (for non-error events)
 */
export const captureMessage = (
  message: string,
  level: Sentry.SeverityLevel = "info",
  context?: Record<string, any>
) => {
  Sentry.captureMessage(message, {
    level,
    extra: context,
  });
};

/**
 * Set user context for error tracking
 */
export const setUser = (user: {
  id?: string;
  email?: string;
  username?: string;
}) => {
  Sentry.setUser(user);
};

/**
 * Clear user context (on logout)
 */
export const clearUser = () => {
  Sentry.setUser(null);
};

/**
 * Add breadcrumb for debugging
 */
export const addBreadcrumb = (
  message: string,
  category: string,
  data?: Record<string, any>
) => {
  Sentry.addBreadcrumb({
    message,
    category,
    data,
    level: "info",
  });
};

/**
 * Track performance of async operations
 */
export const trackPerformance = async <T>(
  operationName: string,
  operation: () => Promise<T>
): Promise<T> => {
  const span = Sentry.startSpan(
    {
      name: operationName,
      op: "function",
    },
    async (span) => {
      try {
        const result = await operation();
        span.setStatus({ code: 1, message: "ok" });
        return result;
      } catch (error) {
        span.setStatus({ code: 2, message: "internal_error" });
        throw error;
      }
    }
  );

  return span;
};
