/**
 * Optimized Image Component
 * Features:
 * - WebP format with JPEG/PNG fallback
 * - Lazy loading with Intersection Observer
 * - Blur placeholder (LQIP)
 * - Responsive images support
 * - Error handling
 * - Loading state
 */

import { useState, useEffect, useRef, memo } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  className?: string;
  loading?: 'lazy' | 'eager';
  width?: number;
  height?: number;
  blurDataURL?: string;
  aspectRatio?: string; // e.g., "16/9", "4/3", "1/1"
  useWebP?: boolean; // Enable WebP format (default: true)
}

export const OptimizedImage = memo(function OptimizedImage({
  src,
  alt,
  className = '',
  loading = 'lazy',
  width,
  height,
  blurDataURL,
  aspectRatio,
  useWebP = true,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [hasError, setHasError] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // Calculate aspect ratio style for CLS prevention
  const aspectRatioStyle = aspectRatio ? { aspectRatio } : 
    (width && height) ? { aspectRatio: `${width}/${height}` } : undefined;

  // Generate WebP source path
  const getWebPSrc = (originalSrc: string) => {
    if (!useWebP) return originalSrc;
    return originalSrc.replace(/\.(jpg|jpeg|png)$/i, '.webp');
  };

  const webpSrc = getWebPSrc(src);

  useEffect(() => {
    if (loading === 'eager') {
      setIsInView(true);
      return;
    }

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
        rootMargin: '200px', // Start loading 200px before image enters viewport (was 50px)
        threshold: 0.01, // Trigger as soon as 1% is visible
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [loading]);

  return (
    <div className={`relative overflow-hidden ${className}`} ref={imgRef}>
      {/* Blur placeholder */}
      {blurDataURL && !isLoaded && (
        <img
          src={blurDataURL}
          alt=""
          className="absolute inset-0 w-full h-full object-cover blur-xl scale-110"
          aria-hidden="true"
        />
      )}

      {/* Main image with WebP support */}
      {isInView && !hasError && (
        <picture>
          {/* WebP source */}
          {useWebP && (
            <source srcSet={webpSrc} type="image/webp" />
          )}
          
          {/* Fallback to original format */}
          <img
            src={src}
            alt={alt}
            width={width}
            height={height}
            style={aspectRatioStyle}
            className={`${className} transition-opacity duration-300 ${
              isLoaded ? 'opacity-100' : 'opacity-0'
            }`}
            onLoad={() => setIsLoaded(true)}
            onError={() => setHasError(true)}
            loading={loading}
            decoding="async"
          />
        </picture>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-zinc-100 dark:bg-zinc-800">
          <p className="text-sm text-zinc-500 dark:text-zinc-400">Görsel yüklenemedi</p>
        </div>
      )}

      {/* Loading skeleton - shimmer effect */}
      {!isLoaded && !hasError && isInView && (
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-200 via-zinc-300 to-zinc-200 dark:from-zinc-700 dark:via-zinc-600 dark:to-zinc-700 animate-shimmer bg-[length:200%_100%]" />
      )}
    </div>
  );
});
