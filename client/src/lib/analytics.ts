import ReactGA from "react-ga4";

/**
 * Google Analytics 4 Integration
 * Tracks user behavior, page views, and custom events
 */

// Initialize GA4
export const initGA = () => {
  const measurementId = import.meta.env.VITE_GA_MEASUREMENT_ID;
  
  if (!measurementId) {
    console.warn("GA4 Measurement ID not found. Analytics disabled.");
    return;
  }

  ReactGA.initialize(measurementId, {
    gaOptions: {
      anonymizeIp: true, // GDPR compliance
      cookieFlags: "SameSite=None;Secure",
    },
  });

  console.log("✅ Google Analytics 4 initialized");
};

/**
 * Track page view
 */
export const trackPageView = (path: string, title?: string) => {
  ReactGA.send({
    hitType: "pageview",
    page: path,
    title: title || document.title,
  });
};

/**
 * Track custom event
 */
export const trackEvent = (
  category: string,
  action: string,
  label?: string,
  value?: number
) => {
  ReactGA.event({
    category,
    action,
    label,
    value,
  });
};

/**
 * Track button click
 */
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent("Button", "Click", `${buttonName} - ${location}`);
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent("Form", success ? "Submit Success" : "Submit Error", formName);
};

/**
 * Track external link click
 */
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent("External Link", "Click", `${linkText} - ${url}`);
};

/**
 * Track video interaction
 */
export const trackVideoEvent = (
  action: "play" | "pause" | "complete",
  videoName: string
) => {
  trackEvent("Video", action, videoName);
};

/**
 * Track download
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent("Download", "File", `${fileName} (${fileType})`);
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent("Search", "Query", searchTerm, resultsCount);
};

/**
 * Track language change
 */
export const trackLanguageChange = (from: string, to: string) => {
  trackEvent("Language", "Change", `${from} → ${to}`);
};

/**
 * Track theme change
 */
export const trackThemeChange = (theme: "light" | "dark") => {
  trackEvent("Theme", "Change", theme);
};

/**
 * Track error
 */
export const trackError = (errorMessage: string, errorLocation: string) => {
  trackEvent("Error", "Occurred", `${errorLocation}: ${errorMessage}`);
};

/**
 * Track timing (performance)
 */
export const trackTiming = (
  category: string,
  variable: string,
  value: number,
  label?: string
) => {
  ReactGA.event({
    category: "Timing",
    action: category,
    label: `${variable}${label ? ` - ${label}` : ""}`,
    value: Math.round(value),
  });
};

/**
 * Track user engagement
 */
export const trackEngagement = (action: string, details?: string) => {
  trackEvent("Engagement", action, details);
};

/**
 * Set user properties (for segmentation)
 */
export const setUserProperties = (properties: Record<string, any>) => {
  ReactGA.set(properties);
};

/**
 * Track conversion (goal completion)
 */
export const trackConversion = (conversionName: string, value?: number) => {
  trackEvent("Conversion", "Complete", conversionName, value);
};
