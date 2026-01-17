/**
 * Optimized Video Component
 * Features:
 * - Lazy loading with Intersection Observer
 * - Preload metadata only
 * - Loading state with poster
 * - Error handling
 */

import { useState, useEffect, useRef, memo } from 'react';

interface OptimizedVideoProps {
  src: string;
  poster?: string;
  className?: string;
  controls?: boolean;
  muted?: boolean;
  autoPlay?: boolean;
  loop?: boolean;
  playsInline?: boolean;
  'aria-label'?: string;
}

export const OptimizedVideo = memo(function OptimizedVideo({
  src,
  poster,
  className = '',
  controls = true,
  muted = true,
  autoPlay = false,
  loop = false,
  playsInline = false,
  'aria-label': ariaLabel,
}: OptimizedVideoProps) {
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsInView(true);
            observer.disconnect();
          }
        });
      },
      {
        rootMargin: '100px', // Start loading 100px before video enters viewport
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className={`relative ${className}`} ref={videoRef}>
      {isInView && !hasError ? (
        <video
          className="w-full h-full object-cover"
          controls={controls}
          muted={muted}
          autoPlay={autoPlay}
          loop={loop}
          playsInline={playsInline}
          preload="metadata"
          poster={poster}
          onError={() => setHasError(true)}
          aria-label={ariaLabel}
        >
          <source src={src} type="video/mp4" />
          Tarayıcınız video etiketini desteklemiyor.
        </video>
      ) : hasError ? (
        <div className="w-full h-full flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Video yüklenemedi</p>
        </div>
      ) : (
        // Loading state with poster
        poster && (
          <img
            src={poster}
            alt=""
            className="w-full h-full object-cover"
            aria-hidden="true"
          />
        )
      )}
    </div>
  );
});
