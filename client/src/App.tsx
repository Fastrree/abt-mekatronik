import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Analytics } from "@vercel/analytics/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import { getLanguageFromPath, getPathWithoutLanguage } from "@/lib/language-utils";
import { useEffect, lazy, Suspense } from "react";
import { MAINTENANCE_MODE } from "@/config/maintenance";

// Lazy load pages for code splitting
const Home = lazy(() => import("@/pages/home"));
const About = lazy(() => import("@/pages/about"));
const OurExports = lazy(() => import("@/pages/our-exports"));
const ProductDetail = lazy(() => import("@/pages/product-detail"));
const NotFound = lazy(() => import("@/pages/not-found"));
const Maintenance = lazy(() => import("@/pages/maintenance"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen bg-white dark:bg-zinc-900 flex items-center justify-center">
      <div className="flex flex-col items-center gap-4">
        <div className="w-12 h-12 border-4 border-red-600 border-t-transparent rounded-full animate-spin" />
        <p className="text-zinc-600 dark:text-zinc-300 text-sm font-medium">Yükleniyor...</p>
      </div>
    </div>
  );
}

function Router() {
  const [location, setLocation] = useLocation();
  const { language, setLanguage } = useI18n();

  // CRITICAL: Redirect to language-prefixed URL on initial load
  useEffect(() => {
    const urlLanguage = getLanguageFromPath(location);
    
    // If URL has no language prefix (e.g., "/" or "/about"), redirect to language-prefixed URL
    if (!urlLanguage || urlLanguage === 'tr') {
      // Check if current path already has language prefix
      const hasLanguagePrefix = /^\/(tr|en|de|fr|es|ar|ru)(\/|$)/.test(location);
      
      if (!hasLanguagePrefix) {
        // Build language-prefixed URL
        const cleanPath = location === '/' ? '' : location;
        const newPath = `/${language}${cleanPath}`;
        
        // Redirect to language-prefixed URL
        console.log(`[i18n] Initial load redirect: ${location} → ${newPath}`);
        setLocation(newPath, { replace: true });
        return;
      }
    }
    
    // Sync URL language with i18n context
    if (urlLanguage !== language) {
      setLanguage(urlLanguage);
    }
  }, [location, language, setLanguage, setLocation]);

  // Scroll to top on route change (except hash navigation)
  useEffect(() => {
    // Eğer hash yoksa (normal sayfa geçişi), en üste scroll et
    if (!window.location.hash) {
      window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
    }
  }, [location]);

  // Hash-based scroll handling for cross-page navigation
  useEffect(() => {
    const handleHashScroll = () => {
      const hash = window.location.hash;
      if (hash) {
        // Sayfanın tamamen yüklenmesini bekle (daha uzun delay)
        setTimeout(() => {
          const element = document.querySelector(hash);
          if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }, 500); // 100ms -> 500ms (sayfa render için daha fazla zaman)
      }
    };

    // Route değiştiğinde ve hash varsa scroll et
    handleHashScroll();

    // Hash değiştiğinde scroll et
    window.addEventListener('hashchange', handleHashScroll);
    
    return () => window.removeEventListener('hashchange', handleHashScroll);
  }, [location]); // location dependency ekledik

  // Get clean path without language prefix for routing
  const cleanPath = getPathWithoutLanguage(location);

  return (
    <Suspense fallback={<PageLoader />}>
      <Switch location={cleanPath}>
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/exports" component={OurExports} />
        <Route path="/products/:productKey" component={ProductDetail} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function AppContent() {
  const { language } = useI18n();
  const isRTL = language === 'ar';

  useEffect(() => {
    // Set dir attribute on html element for global RTL support
    document.documentElement.dir = isRTL ? 'rtl' : 'ltr';
  }, [isRTL]);

  // Track page views on route change (GA4 is loaded via HTML script tag)
  useEffect(() => {
    if (window.gtag) {
      window.gtag('event', 'page_view', {
        page_path: window.location.pathname,
        page_title: document.title
      });
    }
  }, [window.location.pathname]);

  // MAINTENANCE MODE: Minimal UI (no cookies, no analytics, no extras)
  if (MAINTENANCE_MODE) {
    return (
      <TooltipProvider>
        <Toaster />
        <Maintenance />
      </TooltipProvider>
    );
  }

  // NORMAL MODE: Full features
  return (
    <TooltipProvider>
      <ScrollProgress />
      <Toaster />
      <Router />
      <WhatsAppButton />
      <BackToTop />
      <CookieBanner />
      <ExitIntentPopup />
      <SpeedInsights />
      <Analytics />
    </TooltipProvider>
  );
}

function App() {
  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <I18nProvider>
            <AppContent />
          </I18nProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
}

export default App;
