'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PhotoItem } from '../../types/creative';

interface PhotoCarouselProps {
  photos: PhotoItem[];
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [loadedImages, setLoadedImages] = useState<Set<number>>(new Set());
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentIndex(index);
  };

  // Preload all images
  useEffect(() => {
    const preloadImages = async () => {
      const imagePromises = photos.map((photo, index) => {
        return new Promise<void>((resolve) => {
          const img = new window.Image();
          img.onload = () => {
            setLoadedImages(prev => new Set([...prev, index]));
            resolve();
          };
          img.onerror = () => resolve(); // Still resolve to not block other images
          img.src = photo.src;
        });
      });

      // Wait for all images to load or timeout after 10 seconds
      try {
        await Promise.allSettled(imagePromises);
      } finally {
        setIsInitialLoading(false);
      }
    };

    preloadImages();
  }, [photos]);

  const startAutoPlay = useCallback(() => {
    if (photos.length > 1) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => (prev + 1) % photos.length);
      }, 4000); // Change photo every 4 seconds
    }
  }, [photos.length]);

  const stopAutoPlay = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  useEffect(() => {
    if (isAutoPlaying && !isInitialLoading) {
      startAutoPlay();
    } else {
      stopAutoPlay();
    }

    return () => stopAutoPlay();
  }, [isAutoPlaying, isInitialLoading, startAutoPlay, stopAutoPlay]);

  const handleMouseEnter = () => {
    if (isAutoPlaying) {
      stopAutoPlay();
    }
  };

  const handleMouseLeave = () => {
    if (isAutoPlaying) {
      startAutoPlay();
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Loading indicator */}
      {isInitialLoading && (
        <div className="absolute inset-0 z-10 flex items-center justify-center bg-brand-surface rounded-lg">
          <div className="flex flex-col items-center gap-4">
            <div className="w-8 h-8 border-2 border-brand-accent border-t-transparent rounded-full animate-spin"></div>
            <p className="text-brand-text-secondary text-sm">
              Loading images... ({loadedImages.size}/{photos.length})
            </p>
          </div>
        </div>
      )}

      {/* Hidden preload images */}
      <div className="hidden">
        {photos.map((photo, index) => (
          <Image
            key={`preload-${index}`}
            src={photo.src}
            alt=""
            width={1}
            height={1}
            priority={index < 3} // Priority for first 3 images
          />
        ))}
      </div>

      {/* Main photo display */}
      <div 
        className="relative h-96 md:h-[500px] bg-brand-surface rounded-lg overflow-hidden shadow-card"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="relative w-full h-full"
          >
            <Image
              src={photos[currentIndex].src}
              alt={photos[currentIndex].alt}
              fill
              className="object-cover"
              priority={currentIndex === 0}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1000px"
              quality={90}
            />
            
            {/* Photo info overlay */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-6 text-white">
           {  /* <h3 className="text-lg font-semibold mb-2">{photos[currentIndex].alt}</h3> title if wanted */}
              <div className="flex flex-wrap gap-4 text-sm text-brand-text-secondary">
                {photos[currentIndex].camera && (
                  <span>{photos[currentIndex].camera}</span>
                )}
                {photos[currentIndex].stock && (
                  <span>{photos[currentIndex].stock}</span>
                )}
                {photos[currentIndex].location && (
                  <span>{photos[currentIndex].location}</span>
                )}
                {photos[currentIndex].date && (
                  <span>{new Date(photos[currentIndex].date!).toLocaleDateString()}</span>
                )}
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent"
              aria-label="Previous photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button
              onClick={nextPhoto}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent"
              aria-label="Next photo"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Play/Pause button */}
            <button
              onClick={toggleAutoPlay}
              className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/60 text-white flex items-center justify-center hover:bg-black/80 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent"
              aria-label={isAutoPlaying ? "Pause slideshow" : "Play slideshow"}
            >
              {isAutoPlaying ? (
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 9v6m4-6v6" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 5v14l11-7z"/>
                </svg>
              )}
            </button>
          </>
        )}
      </div>

      {/* Thumbnail navigation */}
      {photos.length > 1 && (
        <div className="mt-6">
          {/* Thumbnail strip */}
          <div className="flex justify-center space-x-2 mb-4 overflow-x-auto pb-2">
            {photos.map((photo, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                className={`relative flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent ${
                  index === currentIndex 
                    ? 'ring-2 ring-brand-accent scale-110' 
                    : 'opacity-70 hover:opacity-100 hover:scale-105'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              >
                <Image
                  src={photo.src}
                  alt=""
                  fill
                  className="object-cover"
                  sizes="64px"
                  quality={60}
                />
                {!loadedImages.has(index) && (
                  <div className="absolute inset-0 bg-brand-surface flex items-center justify-center">
                    <div className="w-4 h-4 border border-brand-accent border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
              </button>
            ))}
          </div>

          {/* Dot navigation (fallback) */}
          <div className="flex justify-center space-x-2">
            {photos.map((_, index) => (
              <button
                key={`dot-${index}`}
                onClick={() => goToPhoto(index)}
                className={`w-2 h-2 rounded-full transition-colors duration-200 focus:outline-none focus:ring-1 focus:ring-brand-accent ${
                  index === currentIndex ? 'bg-brand-accent' : 'bg-brand-border hover:bg-brand-border-light'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Photo counter */}
          <div className="text-center mt-2 text-sm text-brand-text-muted">
            {currentIndex + 1} / {photos.length}
            {isInitialLoading && (
              <span className="ml-2 text-brand-accent">
                • Loading...
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
