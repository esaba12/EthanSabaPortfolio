'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

interface MusicTrack {
  title: string;
  artist: string;
  platform: 'soundcloud' | 'spotify';
  url: string;
  cover: string;
  duration: string;
  genre: string;
}

interface MusicCardProps {
  track: MusicTrack;
}

export default function MusicCard({ track }: MusicCardProps) {
  const getPlatformIcon = () => {
    if (track.platform === 'soundcloud') {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 22C6.486 22 2 17.514 2 12S6.486 2 12 2s10 4.486 10 10-4.486 10-10 10zm-1-6h2v-8h-2v8zm4 0h2v-8h-2v8z"/>
        </svg>
      );
    } else {
      return (
        <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"/>
        </svg>
      );
    }
  };

  const getPlatformName = () => {
    return track.platform === 'soundcloud' ? 'SoundCloud' : 'Spotify';
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="group h-full"
    >
      <a
        href={track.url}
        target="_blank"
        rel="noopener noreferrer"
        className="flex flex-col h-full card hover:shadow-card-hover transition-all duration-300 focus:ring-2 focus:ring-brand-accent focus:ring-offset-2 focus:ring-offset-brand-bg focus:outline-none cursor-pointer"
        aria-label={`Listen to ${track.title} by ${track.artist} on ${getPlatformName()}`}
      >
        {/* Cover image */}
        <div className="relative h-48 bg-brand-surface overflow-hidden flex-shrink-0">
          <Image
            src={track.cover}
            alt={`${track.title} by ${track.artist}`}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          
          {/* Platform badge */}
          <div className="absolute top-3 right-3 bg-black/80 text-white px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1">
            {getPlatformIcon()}
            {getPlatformName()}
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-col flex-grow p-6">
          <div className="flex-grow">
            <h3 className="text-lg font-semibold text-brand-text group-hover:text-brand-accent transition-colors duration-200 mb-2 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>
              {track.title}
            </h3>
            <p className="text-brand-text-secondary text-sm mb-4 overflow-hidden" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical' }}>{track.artist}</p>
          </div>

          <div className="flex items-center justify-between text-sm mb-4">
            <span className="bg-brand-surface-light text-brand-text-secondary px-3 py-1 rounded-full text-xs">{track.genre}</span>
            <span className="text-brand-text-muted">{track.duration}</span>
          </div>

          <div className="inline-flex items-center gap-2 text-brand-accent group-hover:text-brand-accent-hover transition-colors duration-200 mt-auto">
            <span>Listen on {getPlatformName()}</span>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
            </svg>
          </div>
        </div>
      </a>
    </motion.article>
  );
}
