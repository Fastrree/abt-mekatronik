import * as Sentry from "@sentry/react";
import { Button } from "./ui/button";
import { AlertTriangle } from "lucide-react";

interface FallbackProps {
  error: unknown;
  componentStack: string;
  eventId: string;
  resetError: () => void;
}

const ErrorFallback = ({ error, resetError }: FallbackProps) => {
  const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
  
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-bg-primary to-bg-secondary p-4">
      <div className="max-w-md w-full bg-bg-secondary/50 backdrop-blur-sm border-2 border-danger-red/30 rounded-2xl p-8 text-center">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 rounded-full bg-danger-red/10 flex items-center justify-center">
            <AlertTriangle className="w-10 h-10 text-danger-red" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-text-primary mb-4">
          Bir Şeyler Yanlış Gitti
        </h1>
        
        <p className="text-text-secondary mb-6">
          Üzgünüz, beklenmeyen bir hata oluştu. Teknik ekibimiz bilgilendirildi.
        </p>
        
        {import.meta.env.DEV && (
          <div className="bg-bg-tertiary/50 border border-border-primary rounded-lg p-4 mb-6 text-left">
            <p className="text-xs font-mono text-danger-red break-all">
              {errorMessage}
            </p>
          </div>
        )}
        
        <div className="flex gap-4 justify-center">
          <Button
            onClick={resetError}
            variant="default"
            className="bg-electric-blue hover:bg-electric-blue/90"
          >
            Tekrar Dene
          </Button>
          
          <Button
            onClick={() => window.location.href = "/"}
            variant="outline"
          >
            Ana Sayfaya Dön
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
