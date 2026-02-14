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

  // Hide swipe hint after 2 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSwipeHint(false);
    }, 2000);
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
      className="fixed inset-0 z-50 bg-black flex items-center justify-center" 
      dir="ltr"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* TOP BAR - Mobile Optimized */}
      <div className="absolute top-0 left-0 right-0 z-50 bg-gradient-to-b from-black/80 to-transparent p-3 sm:p-4 flex items-center justify-between">
        {/* Image Counter - Left Side */}
        <div className="bg-white/10 backdrop-blur-sm px-3 py-1.5 rounded-full">
          <span className="text-white font-semibold text-sm">
            {currentIndex + 1} / {images.length}
          </span>
        </div>

        {/* Close Button - Right Side */}
        <button
          onClick={onClose}
          className="bg-red-600 hover:bg-red-700 p-2.5 rounded-full transition-all min-w-[44px] min-h-[44px] flex items-center justify-center shadow-lg"
          aria-label="Close lightbox"
        >
          <X className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Main Image Container */}
      <div className="relative w-full h-full flex items-center justify-center px-2 py-16 sm:px-4 sm:py-20">
        <OptimizedImage
          src={`/media/${encodeURIComponent(images[currentIndex])}`}
          alt={`Image ${currentIndex + 1} of ${images.length}`}
          className="max-w-full max-h-full object-contain"
          loading="eager"
        />
      </div>

      {/* BOTTOM NAVIGATION BAR - Mobile Optimized */}
      <div className="absolute bottom-0 left-0 right-0 z-50 bg-gradient-to-t from-black/80 to-transparent p-3 sm:p-4">
        <div className="flex items-center justify-center gap-4">
          {/* Previous Button */}
          <button
            onClick={onPrevious}
            disabled={currentIndex === 0}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-full transition-all min-w-[48px] min-h-[48px] flex items-center justify-center backdrop-blur-sm"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-6 h-6 text-white" />
          </button>

          {/* Swipe Hint - Center */}
          {showSwipeHint && (
            <div className="sm:hidden bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full animate-pulse">
              <span className="text-white text-xs font-medium">Swipe ←→</span>
            </div>
          )}

          {/* Next Button */}
          <button
            onClick={onNext}
            disabled={currentIndex === images.length - 1}
            className="bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed p-3 rounded-full transition-all min-w-[48px] min-h-[48px] flex items-center justify-center backdrop-blur-sm"
            aria-label="Next image"
          >
            <ChevronRight className="w-6 h-6 text-white" />
          </button>
        </div>

        {/* Thumbnail Strip - Desktop Only */}
        <div className="hidden lg:flex justify-center gap-2 mt-4 overflow-x-auto max-w-full px-4 scrollbar-thin">
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
              className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all ${
                idx === currentIndex 
                  ? 'border-red-600 scale-110 shadow-lg shadow-red-600/50' 
                  : 'border-white/20 opacity-50 hover:opacity-100 hover:border-white/50'
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
      </div>

      {/* Side Navigation Buttons - Desktop Only */}
      <button
        onClick={onPrevious}
        disabled={currentIndex === 0}
        className="hidden md:flex absolute left-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed p-4 rounded-full transition-all backdrop-blur-sm"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      <button
        onClick={onNext}
        disabled={currentIndex === images.length - 1}
        className="hidden md:flex absolute right-4 top-1/2 -translate-y-1/2 z-40 bg-white/10 hover:bg-white/20 disabled:opacity-30 disabled:cursor-not-allowed p-4 rounded-full transition-all backdrop-blur-sm"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>
    </div>
  );
}
