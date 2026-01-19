import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import { SpeedInsights } from "@vercel/speed-insights/react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import Home from "@/pages/home";
import About from "@/pages/about";
import ProductDetail from "@/pages/product-detail";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/products/:productKey" component={ProductDetail} />
      <Route component={NotFound} />
    </Switch>
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
