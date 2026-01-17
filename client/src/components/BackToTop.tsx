import { useState, useEffect } from 'react';
import { ArrowUp } from 'lucide-react';

export function BackToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 500);
    };
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (!isVisible) return null;

  return (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 w-12 h-12 bg-white dark:bg-zinc-800 hover:bg-red-600 border border-zinc-300 dark:border-zinc-600 hover:border-red-600 rounded-full shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110 group"
      aria-label="Yukarı çık"
    >
      <ArrowUp className="w-5 h-5 text-zinc-700 dark:text-zinc-300 group-hover:text-white transition-colors" />
    </button>
  );
}
