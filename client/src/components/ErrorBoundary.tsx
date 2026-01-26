import * as Sentry from "@sentry/react";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

interface FallbackProps {
  error: unknown;
  componentStack: string;
  eventId: string;
  resetError: () => void;
}

const ErrorFallback = ({ error, resetError }: FallbackProps) => {
  const { t, language } = useI18n();
  const isRTL = language === 'ar';
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-zinc-900 p-4" dir={isRTL ? 'rtl' : 'ltr'}>
      <div className="max-w-md w-full bg-zinc-800/50 backdrop-blur-sm border-2 border-red-600/30 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-red-600/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-red-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-white mb-4">
          {t('errorBoundary.title')}
        </h1>
        
        <p className="text-zinc-400 mb-6">
          {t('errorBoundary.description')}
        </p>
        
        {import.meta.env.DEV && (
          <div className="bg-zinc-900/50 border border-zinc-700 rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-mono text-red-400 break-all">
              {errorMessage}
            </p>
          </div>
        )}
        
        <div className={`flex gap-4 justify-center ${isRTL ? 'flex-row-reverse' : ''}`}>
          <Button
            onClick={resetError}
            variant="default"
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            {t('errorBoundary.retryButton')}
          </Button>
          
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
            className="border-zinc-600 text-zinc-300 hover:bg-zinc-800"
          >
            {t('errorBoundary.homeButton')}
          </Button>
        </div>
      </div>
    </div>
  );
};

// Sentry Error Boundary with custom fallback
export const ErrorBoundary = Sentry.withErrorBoundary(
  ({ children }: { children: React.ReactNode }) => <>{children}</>,
  {
    fallback: (errorData) => <ErrorFallback {...errorData} />,
    showDialog: false, // We have custom UI
  }
);
