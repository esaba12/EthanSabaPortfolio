'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PhotoItem } from '../../types/creative';

interface PhotoCarouselProps {
  photos: PhotoItem[];
}

export default function PhotoCarousel({ photos }: PhotoCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextPhoto = () => {
    setCurrentIndex((prev) => (prev + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
  };

  const goToPhoto = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      {/* Main photo display */}
      <div className="relative h-96 md:h-[500px] bg-brand-surface rounded-lg overflow-hidden shadow-card">
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
              priority
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
          </>
        )}
      </div>

      {/* Thumbnail navigation */}
      {photos.length > 1 && (
        <div className="mt-6">
          <div className="flex justify-center space-x-2">
            {photos.map((_, index) => (
              <button
                key={index}
                onClick={() => goToPhoto(index)}
                className={`w-3 h-3 rounded-full transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-accent ${
                  index === currentIndex ? 'bg-brand-accent' : 'bg-brand-border hover:bg-brand-border-light'
                }`}
                aria-label={`Go to photo ${index + 1}`}
              />
            ))}
          </div>
          
          {/* Photo counter */}
          <div className="text-center mt-2 text-sm text-brand-text-muted">
            {currentIndex + 1} / {photos.length}
          </div>
        </div>
      )}
    </div>
  );
}
