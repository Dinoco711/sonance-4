'use client';

import { useState, useMemo } from 'react';
import type { Song } from '../data/songs';
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
    <div
      className="bg-gray-900/90 backdrop-blur-md text-white rounded-xl px-1 sm:px-6 py-1 sm:py-3 border border-zinc-800/40 shadow-md w-full cursor-pointer hover:bg-gray-900/95 transition-colors"
      onClick={onExpand}
    >
      <div className="flex items-center justify-between">
        {/* Current Song Info */}
        <div className="flex items-center w-1/4 sm:w-1/4">
          <div className="h-8 w-8 sm:h-12 sm:w-12 flex-shrink-0 mr-1 sm:mr-3 rounded-lg overflow-hidden">
            <Image
              src={currentSong.cover}
              alt={`${currentSong.title} by ${currentSong.artist}`}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </div>
          <div className="flex-1 min-w-0 hidden sm:block">
            <p className="text-sm font-medium truncate">
              {currentSong.title}
            </p>
            <p className="text-xs text-gray-400 truncate">
              {currentSong.artist}
            </p>
          </div>
          {/* Mobile song title - visible only on small screens */}
          <div className="flex-1 min-w-0 sm:hidden max-w-[80px]">
            <p className="text-xs font-medium truncate">
              {currentSong.title}
            </p>
            <p className="text-[10px] text-gray-400 truncate">
              {currentSong.artist}
            </p>
          </div>
        </div>

        {/* Player Controls */}
        <div className="flex flex-col items-center w-1/2 sm:w-2/4">
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
                e.stopPropagation();
                onPrevious();
              }}
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors touch-manipulation"
              aria-label="Previous"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061A1.125 1.125 0 0 1 21 8.689v8.122ZM11.25 16.811c0 .864-.933 1.406-1.683.977l-7.108-4.061a1.125 1.125 0 0 1 0-1.954l7.108-4.061a1.125 1.125 0 0 1 1.683.977v8.122Z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onPlayPause();
              }}
              className="bg-white text-black p-1.5 sm:p-2 rounded-full hover:scale-105 transition-transform touch-manipulation"
              aria-label={isPlaying ? "Pause" : "Play"}
            >
              {isPlaying ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z" />
                </svg>
              )}
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onNext();
              }}
              className="text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors touch-manipulation"
              aria-label="Next"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l7.108 4.061A1.125 1.125 0 0 1 3 16.811V8.69ZM12.75 8.689c0-.864.933-1.406 1.683-.977l7.108 4.061a1.125 1.125 0 0 1 0 1.954l7.108 4.061A1.125 1.125 0 0 1 12.75 16.811V8.69Z" />
              </svg>
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                setRepeatMode((prev) => (prev + 1) % 3);
              }}
              className={`text-gray-400 hover:text-white hover:bg-white/10 rounded-full p-1 transition-colors touch-manipulation hidden xs:flex xs:items-center xs:justify-center ${
                repeatMode === 1 ? 'text-green-400' : repeatMode === 2 ? 'text-blue-400' : ''
              }`}
              aria-label="Repeat"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3 h-3 sm:w-4 sm:h-4">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
              </svg>
            </button>
          </div>

          {/* Progress bar */}
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
            </div>
            <span className="text-[8px] sm:text-[10px] text-gray-400 xs:inline">{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume Control and additional buttons */}
        <div className="flex items-center justify-end w-1/4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              setIsLiked(!isLiked);
            }}
            className="text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-full p-1.5 mr-0.5 hidden md:flex md:items-center md:justify-center"
            aria-label={isLiked ? "Unlike" : "Like"}
          >
            {isLiked ? (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 text-red-500">
                <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-3.5 h-3.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            )}
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
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
    </div>
  );
}

export default NowPlayingBar; 