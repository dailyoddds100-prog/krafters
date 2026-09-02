/**
 * Google Analytics (GA4 / gtag.js) integration module
 */

declare global {
  interface Window {
    dataLayer?: any[];
    gtag?: (...args: any[]) => void;
  }
}

// Default Google Analytics 4 Measurement ID or env variable
export const GA_MEASUREMENT_ID =
  (typeof import.meta !== "undefined" && import.meta.env?.VITE_GA_MEASUREMENT_ID) ||
  "G-3MD794P3YK";

/**
 * Initialize Google Analytics script in the browser
 */
export function initGoogleAnalytics(measurementId: string = GA_MEASUREMENT_ID): void {
  if (typeof window === "undefined" || !measurementId) return;

  // Prevent duplicate script injection
  if (document.getElementById("google-analytics-script")) {
    return;
  }

  // Set up dataLayer and gtag function
  window.dataLayer = window.dataLayer || [];
  function gtag(...args: any[]) {
    window.dataLayer?.push(arguments);
  }
  window.gtag = gtag;

  gtag("js", new Date());
  gtag("config", measurementId, {
    send_page_view: true,
    anonymize_ip: true,
  });

  // Inject external gtag script asynchronously
  const script = document.createElement("script");
  script.id = "google-analytics-script";
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
  document.head.appendChild(script);
}

/**
 * Track custom user events in Google Analytics
 */
export function trackEvent(
  eventName: string,
  eventParams: Record<string, any> = {}
): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", eventName, eventParams);
  }
}

/**
 * Track custom page view
 */
export function trackPageView(pagePath: string, pageTitle?: string): void {
  if (typeof window !== "undefined" && typeof window.gtag === "function") {
    window.gtag("event", "page_view", {
      page_path: pagePath,
      page_title: pageTitle || document.title,
    });
  }
}
