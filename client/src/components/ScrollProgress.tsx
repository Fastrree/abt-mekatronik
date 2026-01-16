import { useState, useEffect } from 'react';

export function ScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
      setProgress(scrollPercent);
    };

    // Initial calculation
    updateProgress();

    window.addEventListener('scroll', updateProgress);
    window.addEventListener('resize', updateProgress);
    
    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, []);

  // Don't show bar if at top (0%)
  if (progress < 0.5) return null;

  return (
    <div className="fixed top-0 left-0 right-0 z-[60] h-1 bg-zinc-800">
      <div 
        className="h-full bg-gradient-to-r from-red-600 to-red-500 transition-all duration-150 ease-out"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
