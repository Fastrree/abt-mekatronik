import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { useEffect } from 'react';
import { OptimizedImage } from './OptimizedImage';

interface ImageLightboxProps {
  images: string[];
  currentIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrevious: () => void;
}

export function ImageLightbox({ images, currentIndex, onClose, onNext, onPrevious }: ImageLightboxProps) {
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
    <div className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center" dir="ltr">
      {/* Close Button */}
      <button
        onClick={onClose}
        className="absolute top-4 right-4 z-50 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all"
        aria-label="Close lightbox"
      >
        <X className="w-6 h-6 text-white" />
      </button>

      {/* Previous Button */}
      <button
        onClick={onPrevious}
        className="absolute left-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
        aria-label="Previous image"
      >
        <ChevronLeft className="w-8 h-8 text-white" />
      </button>

      {/* Next Button */}
      <button
        onClick={onNext}
        className="absolute right-4 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-all"
        aria-label="Next image"
      >
        <ChevronRight className="w-8 h-8 text-white" />
      </button>

      {/* Main Image */}
      <div className="relative w-full h-full flex items-center justify-center p-16">
        <OptimizedImage
          src={`/media/${encodeURIComponent(images[currentIndex])}`}
          alt={`Image ${currentIndex + 1}`}
          className="max-w-full max-h-full object-contain"
          loading="eager"
        />
      </div>

      {/* Image Counter */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/10 px-4 py-2 rounded-full">
        <span className="text-white font-medium">
          {currentIndex + 1} / {images.length}
        </span>
      </div>

      {/* Thumbnail Strip */}
      <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-2 overflow-x-auto max-w-[90vw] px-4 py-2 bg-black/50 rounded-lg">
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
    </div>
  );
}
