'use client';

import { useState, useEffect, useRef, useMemo } from 'react';
import type { Song } from '../data/songs';
import { motion, AnimatePresence } from 'framer-motion';
import { slideUpVariants } from '../utils/transitions';
import Image from 'next/image';
import { VolumeControl } from './VolumeControl';

interface NowPlayingBarProps {
  currentSong: Song;
  isPlaying: boolean;
  progress: number;
  duration: number;
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onProgressChange: (newProgress: number) => void;
  onVolumeChange: (newVolume: number) => void;
  onExpand: () => void;
}

const NowPlayingBar: React.FC<NowPlayingBarProps> = ({
  currentSong,
  isPlaying,
  progress,
  duration,
  volume,
  onPlayPause,
  onNext,
  onPrevious,
  onProgressChange,
  onVolumeChange,
  onExpand
}) => {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one

  // Calculate progress percentage once to avoid recalculations during render
  const progressPercentage = useMemo(() => {
    return ((progress || 0) / (duration || 1)) * 100;
  }, [progress, duration]);

  const formatTime = (time: number) => {
    if (isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    // Validate the time is a finite, non-negative number
    if (isFinite(newTime) && newTime >= 0) {
      onProgressChange(newTime);
    } else {
      console.warn('Invalid time value in progress change:', newTime);
    }
  };

  if (!currentSong) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="bg-gray-900/90 backdrop-blur-md text-white rounded-xl px-1 sm:px-6 py-1 sm:py-3 border border-zinc-800/40 shadow-md w-full cursor-pointer hover:bg-gray-900/95 transition-colors"
        onClick={onExpand}
        variants={slideUpVariants}
        initial="hidden"
        animate="visible"
        whileHover={{ y: -2, transition: { duration: 0.2 } }}
      >
        <div className="flex items-center justify-between">
          {/* Current Song Info */}
          <motion.div
            className="flex items-center w-1/4 sm:w-1/4"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0 mr-1 sm:mr-3 rounded-lg overflow-hidden"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <Image
                src={currentSong.cover}
                alt={`${currentSong.title} by ${currentSong.artist}`}
                width={48}
                height={48}
                className="w-full h-full object-cover"
              />
            </motion.div>
            <div className="flex-1 min-w-0 hidden sm:block">
              <motion.p
                className="text-sm font-medium truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {currentSong.title}
              </motion.p>
              <motion.p
                className="text-xs text-gray-400 truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                {currentSong.artist}
              </motion.p>
            </div>
            {/* Mobile song title - visible only on small screens */}
            <div className="flex-1 min-w-0 sm:hidden max-w-[80px]">
              <motion.p
                className="text-xs font-medium truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
              >
                {currentSong.title}
              </motion.p>
              <motion.p
                className="text-[10px] text-gray-400 truncate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.2 }}
              >
                {currentSong.artist}
              </motion.p>
            </div>
          </motion.div>

          {/* Player Controls */}
          <motion.div
            className="flex flex-col items-center w-1/2 sm:w-2/4"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex items-center justify-center gap-1 sm:gap-3 mb-0.5 sm:mb-1">
              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering expand
                  setIsShuffleOn(!isShuffleOn);
                }}
                className={`text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors touch-manipulation hidden xs:flex xs:items-center xs:justify-center ${isShuffleOn ? 'text-green-400' : ''}`}
                aria-label="Shuffle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 110 6 3 3 0 010-6z" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering expand
                  onPrevious();
                }}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors touch-manipulation flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                  <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering expand
                  onPlayPause();
                }}
                className="bg-white text-black p-1.5 sm:p-1.5 rounded-full hover:scale-105 transition-transform shadow-md mx-1.5 touch-manipulation flex items-center justify-center"
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-4 sm:h-4">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-4 sm:h-4">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                )}
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering expand
                  onNext();
                }}
                className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1.5 transition-colors touch-manipulation flex items-center justify-center"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                  <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                </svg>
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation(); // Prevent triggering expand
                  setRepeatMode((repeatMode + 1) % 3); // cycle through repeat modes
                }}
                className={`text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors touch-manipulation hidden xs:flex xs:items-center xs:justify-center ${repeatMode > 0 ? 'text-green-400' : ''}`}
                aria-label={repeatMode === 0 ? "Repeat off" : repeatMode === 1 ? "Repeat all" : "Repeat one"}
              >
                {repeatMode === 2 ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7a48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3M9 12h6m-6 0a3 3 0 11-6 0 3 3 0 016 0zm6 0a3 3 0 110 6 3 3 0 010-6z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 00-3.7-3.7 48.678 48.678 0 00-7.324 0 4.006 4.006 0 00-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3l-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 003.7 3.7 48.656 48.656 0 007.324 0 4.006 4.006 0 003.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3l-3 3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Progress Bar */}
            <div className="w-full flex items-center gap-1 sm:gap-2">
              <span className="text-[8px] sm:text-[10px] text-gray-400 xs:inline">{formatTime(progress)}</span>
              <div className="relative flex-grow" onClick={(e) => e.stopPropagation()}>
                <div className="h-1.5 bg-gray-700/50 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-white/80 rounded-full"
                    style={{ width: `${progressPercentage}%` }}
                  ></div>
                </div>
                <input
                  type="range"
                  min="0"
                  max={duration || 0}
                  value={progress}
                  onChange={handleProgressChange}
                  className="absolute inset-0 w-full opacity-0 cursor-pointer touch-manipulation"
                  aria-label="Seek timeline"
                />
                {/* Timeline markers - hide on mobile to save space */}
                <div className="hidden sm:flex justify-between mt-0.5 text-[7px] sm:text-[8px] text-gray-400 px-1 w-full">
                  <span>0:00</span>
                  <span>{formatTime(duration / 4)}</span>
                  <span>{formatTime(duration / 2)}</span>
                  <span>{formatTime(duration * 3 / 4)}</span>
                  <span>{formatTime(duration)}</span>
                </div>
              </div>
              <span className="text-[8px] sm:text-[10px] text-gray-400 xs:inline">{formatTime(duration)}</span>
            </div>
          </motion.div>

          {/* Volume Control and additional buttons */}
          <div className="w-1/4 sm:w-1/4 flex justify-end items-center space-x-1">
            {/* Like button - hidden on smallest screens */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering expand
                setIsLiked(!isLiked);
              }}
              className="text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-full p-1.5 mr-0.5 hidden sm:flex sm:items-center sm:justify-center"
              aria-label={isLiked ? "Unlike song" : "Like song"}
            >
              {isLiked ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-red-500">
                  <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                </svg>
              )}
            </button>

            {/* Save button - hidden on small screens */}
            <button
              onClick={(e) => {
                e.stopPropagation(); // Prevent triggering expand
                setIsSaved(!isSaved);
              }}
              className="text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-full p-1.5 mr-0.5 hidden md:flex md:items-center md:justify-center"
              aria-label={isSaved ? "Remove from library" : "Save to library"}
            >
              {isSaved ? (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-green-400">
                  <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                </svg>
              )}
            </button>

            {/* Volume Control for both desktop and mobile */}
            <div 
              className="flex items-center ml-0.5" 
              onClick={(e) => e.stopPropagation()}
            >
              <VolumeControl 
                volume={volume} 
                onChange={onVolumeChange}
                className="text-zinc-400 hover:text-white"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default NowPlayingBar; 