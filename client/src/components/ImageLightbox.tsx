import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';
import { OptimizedImage } from './OptimizedImage';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ImageLightbox({ images, currentIndex, onClose, onNext, onPrevious }: ImageLightboxProps) {
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const [showSwipeHint, setShowSwipeHint] = useState(true);

  // Minimum swipe distance (in px)
  const minSwipeDistance = 50;

  // Hide swipe hint after 3 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
    setShowSwipeHint(false); // Hide hint on first touch
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;
    
    if (isLeftSwipe) {
      onNext();
    } else if (isRightSwipe) {
      onPrevious();
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') onPrevious();
      if (e.key === 'ArrowRight') onNext();
    };
    
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose, onNext, onPrevious]);

  return (
    <div 
      className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" 
      dir="ltr"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Close Button - Mobile Optimized */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 sm:top-4 sm:right-4 z-50 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Close lightbox"
      >
        <X className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
      </button>

      {/* Previous Button - Mobile Optimized */}
      <button
        onClick={onPrevious}
        className="absolute left-2 sm:left-4 z-50 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>

      {/* Next Button - Mobile Optimized */}
      <button
        onClick={onNext}
        className="absolute right-2 sm:right-4 z-50 p-2 sm:p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center"
        aria-label="Next image"
      >
        <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-white" />
      </button>

      {/* Main Image - Mobile Optimized Padding */}
      <div className="relative w-full h-full flex items-center justify-center p-4 sm:p-8 md:p-16">
        <OptimizedImage
          src={`/media/${encodeURIComponent(images[currentIndex])}`}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
          loading="eager"
        />
      </div>

      {/* Image Counter - Mobile Optimized */}
      <div className="absolute bottom-2 sm:bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-3 py-1.5 sm:px-4 sm:py-2 rounded-full">
        <span className="text-white font-medium text-xs sm:text-sm">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail Strip - Hidden on Mobile, Visible on Tablet+ */}
      <div className="hidden sm:flex absolute bottom-12 md:bottom-16 left-1/2 -translate-x-1/2 gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/50 rounded-lg scrollbar-thin">
        {images.map((img, idx) => (
          <button
            key={idx}
            onClick={() => {
              const diff = idx - currentIndex;
              if (diff > 0) {
                for (let i = 0; i < diff; i++) onNext();
              } else if (diff < 0) {
                for (let i = 0; i < Math.abs(diff); i++) onPrevious();
              }
            }}
            className={`flex-shrink-0 w-12 h-12 sm:w-16 sm:h-16 rounded-lg overflow-hidden border-2 transition-all ${
              idx === currentIndex ? 'border-red-600 scale-110' : 'border-white/30 opacity-50 hover:opacity-100'
            }`}
          >
            <OptimizedImage
              src={`/media/${encodeURIComponent(img)}`}
              alt={`Thumbnail ${idx + 1}`}
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </button>
        ))}
      </div>

      {/* Mobile Swipe Hint - Show briefly on first open */}
      {showSwipeHint && (
        <div className="sm:hidden absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-in fade-in duration-500">
          <div className="bg-black/70 px-4 py-2 rounded-full backdrop-blur-sm border border-white/20">
            <span className="text-white text-xs font-medium">← Swipe to navigate →</span>
          </div>
        </div>
      )}
    </div>
  );
}
