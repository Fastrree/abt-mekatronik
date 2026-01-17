import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { I18nProvider, useI18n } from "@/lib/i18n";
import { CookieBanner } from "@/components/CookieBanner";
import { WhatsAppButton } from "@/components/WhatsAppButton";
import { ScrollProgress } from "@/components/ScrollProgress";
import { BackToTop } from "@/components/BackToTop";
import { ExitIntentPopup } from "@/components/ExitIntentPopup";
import Home from "@/pages/home";
import NotFound from "@/pages/not-found";
import { useEffect } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
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

  return (
    <TooltipProvider>
      <ScrollProgress />
      <Toaster />
      <Router />
      <WhatsAppButton />
      <BackToTop />
      <CookieBanner />
      <ExitIntentPopup />
    </TooltipProvider>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <I18nProvider>
        <AppContent />
      </I18nProvider>
    </QueryClientProvider>
  );
}

export default App;
