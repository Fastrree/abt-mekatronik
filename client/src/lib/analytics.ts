/**
 * Google Analytics 4 Integration
 * GA4 is loaded via HTML script tag in index.html
 * This file provides helper functions to track events using gtag
 */

// Declare gtag for TypeScript
declare global {
  interface Window {
    gtag: (...args: any[]) => void;
    dataLayer: any[];
  }
}

/**
 * Track page view
 */
export const trackPageView = (path: string, title?: string) => {
  if (window.gtag) {
    window.gtag('event', 'page_view', {
      page_path: path,
      page_title: title || document.title,
    });
  }
};

/**
 * Track custom event
 */
export const trackEvent = (
  eventName: string,
  eventParams?: Record<string, any>
) => {
  if (window.gtag) {
    window.gtag('event', eventName, eventParams);
  }
};

/**
 * Track button click
 */
export const trackButtonClick = (buttonName: string, location: string) => {
  trackEvent('button_click', {
    button_name: buttonName,
    location: location
  });
};

/**
 * Track form submission
 */
export const trackFormSubmit = (formName: string, success: boolean) => {
  trackEvent('form_submit', {
    form_name: formName,
    success: success
  });
};

/**
 * Track external link click
 */
export const trackExternalLink = (url: string, linkText: string) => {
  trackEvent('external_link_click', {
    url: url,
    link_text: linkText
  });
};

/**
 * Track video interaction
 */
export const trackVideoEvent = (
  action: "play" | "pause" | "complete",
  videoName: string
) => {
  trackEvent(`video_${action}`, {
    video_name: videoName
  });
};

/**
 * Track download
 */
export const trackDownload = (fileName: string, fileType: string) => {
  trackEvent('file_download', {
    file_name: fileName,
    file_type: fileType
  });
};

/**
 * Track search
 */
export const trackSearch = (searchTerm: string, resultsCount: number) => {
  trackEvent('search', {
    search_term: searchTerm,
    results_count: resultsCount
  });
};

/**
 * Track language change
 */
export const trackLanguageChange = (from: string, to: string) => {
  trackEvent('language_change', {
    from_language: from,
    to_language: to
  });
};

/**
 * Track theme change
 */
export const trackThemeChange = (theme: "light" | "dark") => {
  trackEvent('theme_change', {
    theme: theme
  });
};

/**
 * Track error
 */
export const trackError = (errorMessage: string, errorLocation: string) => {
  trackEvent('error_occurred', {
    error_message: errorMessage,
    error_location: errorLocation
  });
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
  trackEvent('timing_complete', {
    timing_category: category,
    timing_variable: variable,
    timing_value: Math.round(value),
    timing_label: label
  });
};

/**
 * Track user engagement
 */
export const trackEngagement = (action: string, details?: string) => {
  trackEvent('user_engagement', {
    engagement_action: action,
    engagement_details: details
  });
};

/**
 * Set user properties (for segmentation)
 */
export const setUserProperties = (properties: Record<string, any>) => {
  if (window.gtag) {
    window.gtag('set', 'user_properties', properties);
  }
};

/**
 * Track conversion (goal completion)
 */
export const trackConversion = (conversionName: string, value?: number) => {
  trackEvent('conversion', {
    conversion_name: conversionName,
    value: value
  });
};
