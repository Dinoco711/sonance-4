'use client';

import { useState, useEffect, useRef } from 'react';
import { Song } from '../data/songs';
import { formatTime } from '../utils/formatTime';
import { motion } from 'framer-motion';
import { popupVariants, fadeInVariants } from '../utils/transitions';
import { VolumeControl } from './VolumeControl';

interface ExpandedSongCardProps {
  song: Song;
  isPlaying: boolean;
  progress: number;
  duration: number;
  suggestedSongs: Song[];
  volume: number;
  onPlayPause: () => void;
  onNext: () => void;
  onPrevious: () => void;
  onProgressChange: (time: number) => void;
  onVolumeChange: (volume: number) => void;
  onClose: () => void;
  onSelectSong: (songId: number) => void;
  onShuffleToggle: (isShuffleOn: boolean) => void;
  onRepeatModeChange: (mode: number) => void;
  progressPercentage: number;
  isShuffleOn?: boolean;
  repeatMode?: number;
}

export default function ExpandedSongCard({
  song,
  isPlaying,
  progress,
  duration,
  suggestedSongs,
  volume,
  onPlayPause,
  onNext,
  onPrevious,
  onProgressChange,
  onVolumeChange,
  onClose,
  onSelectSong,
  onShuffleToggle,
  onRepeatModeChange,
  progressPercentage,
  isShuffleOn = false,
  repeatMode = 0
}: ExpandedSongCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showPlaylistMenu, setShowPlaylistMenu] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const progressContainerRef = useRef<HTMLDivElement>(null);
  
  // Handle clicks outside to close the card
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Close expanded card when clicking outside
      const target = event.target as Node;
      if (cardRef.current && !cardRef.current.contains(target)) {
        onClose();
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [onClose]);
  
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (progressContainerRef.current) {
      const rect = progressContainerRef.current.getBoundingClientRect();
      const position = e.clientX - rect.left;
      const percentage = position / rect.width;
      const newTime = percentage * duration;
      onProgressChange(newTime);
    }
  };

  const handleProgressTouch = (e: React.TouchEvent<HTMLDivElement>) => {
    if (progressContainerRef.current) {
      setIsDragging(true);
      const rect = progressContainerRef.current.getBoundingClientRect();
      const touch = e.touches[0];
      const position = touch.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, position / rect.width));
      const newTime = percentage * duration;
      onProgressChange(newTime);
    }
  };

  // Add event listener to handle touch end
  useEffect(() => {
    const handleTouchEnd = () => {
      setIsDragging(false);
    };
    
    document.addEventListener('touchend', handleTouchEnd);
    return () => {
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = parseFloat(e.target.value);
    onProgressChange(newTime);
  };

  const handleVolumeChange = (newVolume: number) => {
    onVolumeChange(newVolume);
  };

  const handleShuffleToggle = () => {
    onShuffleToggle(!isShuffleOn);
  };

  const handleRepeatModeChange = () => {
    onRepeatModeChange((repeatMode + 1) % 3);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 touch-manipulation">
      <div 
        className="absolute inset-0 bg-black/70 backdrop-blur-md"
        onClick={onClose}
      ></div>

      <motion.div 
        ref={cardRef}
        className="w-full max-w-4xl bg-gradient-to-b from-gray-900 to-black rounded-xl overflow-hidden shadow-2xl relative z-10 flex flex-col md:flex-row max-h-[90vh]"
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-3 right-3 bg-black/60 sm:bg-black/40 text-white hover:text-white p-2 sm:p-1.5 rounded-full z-50 transition-colors touch-manipulation"
          aria-label="Close"
          style={{ minWidth: '40px', minHeight: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 sm:w-4 sm:h-4">
            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z" clipRule="evenodd" />
          </svg>
        </button>
        
        {/* Left side - Song info and controls */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-4 sm:p-6 flex flex-col items-center md:w-1/2 overflow-y-auto hide-scrollbar">
          <div className="text-white text-center mb-2">
            <div className="text-xs font-semibold">Now Playing</div>
            <div className="text-xs text-white/60">{song.album}</div>
          </div>
          
          {/* Album art */}
          <div className="relative mt-2 mb-4 w-40 h-40 sm:w-56 sm:h-56 mx-auto">
            <img 
              src={song.cover} 
              alt={`${song.title} album art`} 
              className="w-full h-full object-cover rounded-lg shadow-lg"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-black/40 rounded-lg transition-opacity duration-200 opacity-0 hover:opacity-100">
              <button 
                onClick={onPlayPause}
                className="bg-white text-gray-900 p-3 rounded-full transition-transform hover:scale-105"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          
          {/* Song info */}
          <div className="text-center mb-4 px-2">
            <h2 className="text-white text-lg sm:text-xl font-bold truncate">{song.title}</h2>
            <p className="text-white/80 text-sm sm:text-base mt-1 truncate">{song.artist}</p>
          </div>
          
          {/* Playback controls */}
          <div className="w-full px-2 sm:px-4">
            {/* Progress bar */}
            <div className="flex justify-between text-xs mb-1 text-white/70">
              <span>{formatTime(progress)}</span>
              <span>{formatTime(duration)}</span>
            </div>
            
            <div 
              className="w-full h-1.5 bg-gray-700/50 rounded-full overflow-hidden relative cursor-pointer touch-manipulation"
              ref={progressContainerRef}
              onClick={handleProgressClick}
              onTouchStart={handleProgressTouch}
              onTouchMove={handleProgressTouch}
            >
              <div 
                className="h-full bg-white rounded-full"
                style={{ width: `${progressPercentage}%` }}
              ></div>
              <div 
                className="absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"
                style={{ 
                  left: `calc(${progressPercentage}% - 6px)`, 
                  opacity: isDragging ? 1 : 0,
                  transition: 'opacity 0.2s ease'
                }}
              ></div>
            </div>
            
            {/* Controls */}
            <div className="flex items-center justify-between mt-6">
              <button 
                onClick={handleShuffleToggle}
                className={`p-2 ${isShuffleOn ? 'text-pink-400' : 'text-white/70'} transition-colors rounded-full`}
                aria-label="Toggle shuffle"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 21L3 16.5m0 0L7.5 12M3 16.5h13.5m0-13.5L21 7.5m0 0L16.5 12M21 7.5H7.5" />
                </svg>
              </button>
              
              <button 
                onClick={onPrevious}
                className="p-2 text-white/80 hover:text-white transition-colors rounded-full"
                aria-label="Previous track"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M9.195 18.44c1.25.713 2.805-.19 2.805-1.629v-2.34l6.945 3.968c1.25.714 2.805-.188 2.805-1.628V8.688c0-1.44-1.555-2.342-2.805-1.628L12 11.03v-2.34c0-1.44-1.555-2.343-2.805-1.629l-7.108 4.062c-1.26.72-1.26 2.536 0 3.256l7.108 4.061z" />
                </svg>
              </button>
              
              <button 
                onClick={onPlayPause}
                className="p-3 bg-white text-gray-900 rounded-full shadow-md transition-transform hover:scale-105 mx-1 sm:mx-2"
                aria-label={isPlaying ? "Pause" : "Play"}
              >
                {isPlaying ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M6.75 5.25a.75.75 0 0 1 .75-.75H9a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H7.5a.75.75 0 0 1-.75-.75V5.25Zm7.5 0A.75.75 0 0 1 15 4.5h1.5a.75.75 0 0 1 .75.75v13.5a.75.75 0 0 1-.75.75H15a.75.75 0 0 1-.75-.75V5.25Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                  </svg>
                )}
              </button>
              
              <button 
                onClick={onNext}
                className="p-2 text-white/80 hover:text-white transition-colors rounded-full"
                aria-label="Next track"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                  <path d="M5.055 7.06c-1.25-.714-2.805.189-2.805 1.628v8.123c0 1.44 1.555 2.342 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.342 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256L14.805 7.06C13.555 6.346 12 7.25 12 8.688v2.34L5.055 7.06z" />
                </svg>
              </button>
              
              <button 
                onClick={handleRepeatModeChange}
                className={`p-2 ${repeatMode > 0 ? 'text-pink-400' : 'text-white/70'} transition-colors rounded-full`}
                aria-label={repeatMode === 0 ? "Repeat off" : repeatMode === 1 ? "Repeat all" : "Repeat one"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M15.485 4.355a8.25 8.25 0 00-13.803 3.7m0 0l-3.181-3.183" />
                  {repeatMode === 2 && (
                    <>
                      <circle cx="12" cy="12" r="3" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v3" />
                    </>
                  )}
                </svg>
              </button>
            </div>
            
            {/* Secondary controls */}
            <div className="flex items-center justify-between mt-4">
              <button 
                onClick={() => setIsLiked(!isLiked)}
                className={`p-2 ${isLiked ? 'text-red-500' : 'text-white/70'} transition-colors rounded-full`}
                aria-label={isLiked ? "Unlike" : "Like"}
              >
                {isLiked ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path d="m11.645 20.91-.007-.003-.022-.012a15.247 15.247 0 0 1-.383-.218 25.18 25.18 0 0 1-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0 1 12 5.052 5.5 5.5 0 0 1 16.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 0 1-4.244 3.17 15.247 15.247 0 0 1-.383.219l-.022.012-.007.004-.003.001a.752.752 0 0 1-.704 0l-.003-.001Z" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                  </svg>
                )}
              </button>
              
              <button 
                onClick={() => setIsSaved(!isSaved)}
                className={`p-2 ${isSaved ? 'text-green-400' : 'text-white/70'} transition-colors rounded-full`}
                aria-label={isSaved ? "Remove from saved" : "Save"}
              >
                {isSaved ? (
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                    <path fillRule="evenodd" d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                )}
              </button>
              
              <div className="flex items-center">
                <VolumeControl 
                  volume={volume} 
                  onChange={handleVolumeChange}
                  className="ml-2"
                />
              </div>
              
              <button 
                onClick={() => setShowPlaylistMenu(!showPlaylistMenu)}
                id="playlist-container"
                className="p-2 text-white/70 hover:text-white transition-colors rounded-full"
                aria-label="Add to playlist"
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 10.5v6m3-3H9m4.06-7.19-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
        
        {/* Right side - Suggested songs */}
        <div className="bg-gradient-to-br from-gray-900 to-black p-4 sm:p-6 md:w-1/2 overflow-y-auto hide-scrollbar hidden md:block">
          <div className="mb-4">
            <h2 className="text-white text-base font-semibold">You might also like</h2>
            <p className="text-gray-400 text-xs">Based on your listening</p>
          </div>
          
          <div className="space-y-2">
            {suggestedSongs.map(suggestedSong => (
              <div 
                key={suggestedSong.id}
                onClick={() => onSelectSong(suggestedSong.id - 1)}
                className="flex items-center bg-white/5 hover:bg-white/10 p-2 rounded-lg cursor-pointer transition-colors group"
              >
                <div className="relative mr-3 flex-shrink-0">
                  <img 
                    src={suggestedSong.cover} 
                    alt={suggestedSong.title} 
                    className="w-10 h-10 rounded object-cover"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded flex items-center justify-center transition-opacity">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-white">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.427 1.529-2.33 2.779-1.643l11.54 6.347c1.295.712 1.295 2.573 0 3.286L7.28 19.99c-1.25.687-2.779-.217-2.779-1.643V5.653Z" clipRule="evenodd" />
                    </svg>
                  </div>
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="text-white font-medium truncate text-sm">{suggestedSong.title}</div>
                  <div className="text-gray-400 text-xs truncate">{suggestedSong.artist}</div>
                </div>
                
                <div className="text-gray-400 text-xs hidden sm:block ml-2">
                  {suggestedSong.duration}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6">
            <button className="w-full border border-white/20 text-white py-2 rounded-full hover:bg-white/5 transition-colors text-sm">
              View All Similar Songs
            </button>
          </div>
          
          <div className="mt-6 pb-4">
            <h3 className="text-white text-sm font-semibold mb-3">Share This Song</h3>
            <div className="flex gap-2 justify-center sm:justify-start">
              <button className="p-2 bg-blue-900/30 text-blue-400 rounded-full hover:bg-blue-900/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" />
                </svg>
              </button>
              
              <button className="p-2 bg-blue-500/30 text-blue-400 rounded-full hover:bg-blue-500/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </button>
              
              <button className="p-2 bg-green-900/30 text-green-400 rounded-full hover:bg-green-900/50 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 3c-5.2 0-9.4 4.2-9.4 9.4 0 5.2 4.2 9.4 9.4 9.4 5.2 0 9.4-4.2 9.4-9.4.01-5.2-4.19-9.4-9.4-9.4zm4.34 12.89c-.22.35-.7.51-1.06.29-.29-.18-3.2-1.98-3.38-2.08-.18-.1-.32-.08-.46.09-.14.18-.87 1.09-1.07 1.31-.18.22-.38.25-.7.08-1.28-.65-2.26-1.47-3.14-2.73-.87-1.25-1.46-2.71-1.63-4.23-.08-.77.11-1.44.54-2.06.16-.23.47-.27.73-.15.25.12 1.21.61 1.5.76.29.15.49.21.59.45.1.24.1.55.01.81-.09.27-.48 1.24-.63 1.63-.15.39-.02.65.19.88.21.22 1.13 1.32 1.33 1.53.2.21.33.27.56.18.23-.09 1.36-.55 1.64-.65.28-.1.45-.05.65.14.2.18 2.03 2.13 2.33 2.47.31.35.35.67.13 1.02z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
      
      {/* Add global styles for custom scrollbars and volume control */}
      <style jsx global>{`
        .hide-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .hide-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb {
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 20px;
        }
        .hide-scrollbar::-webkit-scrollbar-thumb:hover {
          background-color: rgba(255, 255, 255, 0.3);
        }
        .hide-scrollbar {
          scrollbar-width: thin;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent;
        }
        
        /* Progress bar styles */
        @media (hover: hover) {
          .progress-container:hover .progress-thumb {
            opacity: 1 !important;
          }
        }
      `}</style>
    </div>
  );
} 