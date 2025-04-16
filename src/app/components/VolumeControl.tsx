'use client';

import React, { useState, useEffect, useRef } from 'react';

interface VolumeControlProps {
  volume: number;
  onChange: (value: number) => void;
  className?: string;
}

export const VolumeControl: React.FC<VolumeControlProps> = ({ 
  volume, 
  onChange,
  className = ""
}) => {
  const [isMuted, setIsMuted] = useState(volume === 0);
  const [previousVolume, setPreviousVolume] = useState(0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const volumeControlRef = useRef<HTMLDivElement>(null);
  const volumeSliderRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Check if we're on mobile
    setIsMobile(window.innerWidth < 768);
    
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (volume === 0) {
      setIsMuted(true);
    } else if (isMuted && volume > 0) {
      setIsMuted(false);
    }
  }, [volume, isMuted]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    onChange(newVolume);
    
    if (newVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (newVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
    
    if (newVolume > 0) {
      setPreviousVolume(newVolume);
    }
  };

  const handleVolumeTouch = (e: React.TouchEvent<HTMLInputElement>) => {
    // Calculate volume based on touch position
    const slider = volumeSliderRef.current;
    if (slider) {
      const rect = slider.getBoundingClientRect();
      const touch = e.touches[0];
      const position = touch.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, position / rect.width));
      
      onChange(percentage);
      
      if (percentage > 0 && isMuted) {
        setIsMuted(false);
      } else if (percentage === 0 && !isMuted) {
        setIsMuted(true);
      }
      
      if (percentage > 0) {
        setPreviousVolume(percentage);
      }
    }
  };

  const toggleMute = () => {
    if (isMuted) {
      setIsMuted(false);
      onChange(previousVolume);
    } else {
      setIsMuted(true);
      setPreviousVolume(volume);
      onChange(0);
    }
  };

  const toggleVolumeSlider = () => {
    // On mobile, we use the click to toggle the volume slider
    if (isMobile) {
      setShowVolumeSlider(!showVolumeSlider);
    }
  };

  const getVolumeIcon = () => {
    if (isMuted || volume === 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
        </svg>
      );
    } else if (volume < 0.5) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M18.5 12c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM5 9v6h4l5 5V4L9 9H5z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
          <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
        </svg>
      );
    }
  };

  return (
    <div className={`relative ${className}`} ref={volumeControlRef}>
      <button
        type="button"
        className="text-white focus:outline-none p-2 transition-transform hover:scale-110 active:scale-95 touch-manipulation"
        onClick={isMobile ? toggleVolumeSlider : toggleMute}
        onMouseEnter={() => !isMobile && setShowVolumeSlider(true)}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
      
      {showVolumeSlider && (
        <div 
          className={`absolute ${isMobile ? 'bottom-12 left-1/2 transform -translate-x-1/2' : 'bottom-0 left-0'} z-10`}
          onMouseLeave={() => !isMobile && setShowVolumeSlider(false)}
        >
          <div className={`bg-gray-800 p-3 rounded-lg shadow-lg ${isMobile ? 'w-40' : 'w-32'}`}>
            <input
              ref={volumeSliderRef}
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              onTouchMove={handleVolumeTouch}
              className="w-full h-1.5 bg-gray-600 rounded-lg appearance-none cursor-pointer accent-pink-500 touch-manipulation"
              aria-label="Volume"
            />
            {isMobile && (
              <div className="flex justify-between mt-2">
                <button
                  onClick={toggleMute}
                  className="text-white text-xs p-1"
                >
                  {isMuted ? "Unmute" : "Mute"}
                </button>
                <span className="text-white text-xs p-1">
                  {Math.round(isMuted ? 0 : volume * 100)}%
                </span>
              </div>
            )}
          </div>
          {isMobile && (
            <div className="w-0 h-0 border-l-8 border-r-8 border-t-8 border-t-gray-800 border-l-transparent border-r-transparent absolute left-1/2 transform -translate-x-1/2"></div>
          )}
        </div>
      )}
    </div>
  );
}; 