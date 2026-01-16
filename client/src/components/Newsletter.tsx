import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Send, CheckCircle } from 'lucide-react';
import { useI18n } from '@/lib/i18n';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export function Newsletter() {
  const { t } = useI18n();
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      setIsSubmitted(true);
      setIsLoading(false);
      setEmail('');
    }, 500);
  };

  return (
    <section className="py-16 bg-gradient-to-r from-red-600 to-red-700">
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-2xl mx-auto text-center"
        >
          <Mail className="w-12 h-12 text-white/80 mx-auto mb-4" />
          <h3 className="text-2xl md:text-3xl font-black text-white mb-3">
            {t('newsletter.title')}
          </h3>
          <p className="text-white/80 mb-6">
            {t('newsletter.description')}
          </p>

          {isSubmitted ? (
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="flex items-center justify-center gap-2 text-white"
            >
              <CheckCircle className="w-6 h-6" />
              <span className="font-semibold">{t('newsletter.success')}</span>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t('newsletter.placeholder')}
                className="flex-1 bg-white/10 border-white/20 text-white placeholder:text-white/50 h-12"
                required
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-white text-red-600 hover:bg-white/90 font-bold h-12 px-6"
              >
                {isLoading ? (
                  <span className="animate-spin">⏳</span>
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t('newsletter.button')}
                  </>
                )}
              </Button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
