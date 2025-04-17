'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';

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
  // State
  const [isMuted, setIsMuted] = useState(volume === 0);
  const [previousVolume, setPreviousVolume] = useState(volume > 0 ? volume : 0.5);
  const [showVolumeSlider, setShowVolumeSlider] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  
  // Refs
  const volumeControlRef = useRef<HTMLDivElement>(null);
  const sliderTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Check device type on mount and window resize
  useEffect(() => {
    const checkIsMobile = () => setIsMobile(window.innerWidth < 768);
    checkIsMobile();
    
    window.addEventListener('resize', checkIsMobile);
    return () => window.removeEventListener('resize', checkIsMobile);
  }, []);
  
  // Update muted state when volume changes
  useEffect(() => {
    if (volume === 0) {
      setIsMuted(true);
    } else if (isMuted && volume > 0) {
      setIsMuted(false);
    }
    
    // Save previous volume for unmute functionality
    if (volume > 0) {
      setPreviousVolume(volume);
    }
  }, [volume, isMuted]);
  
  // Handle clicks outside the volume control
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (volumeControlRef.current && !volumeControlRef.current.contains(event.target as Node)) {
        setShowVolumeSlider(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  // Clean up timeout on unmount
  useEffect(() => {
    return () => {
      if (sliderTimeoutRef.current) {
        clearTimeout(sliderTimeoutRef.current);
      }
    };
  }, []);
  
  // Event handlers
  const stopEvent = useCallback((e: React.SyntheticEvent) => {
    // Only stop propagation to avoid interfering with audio playback
    e.stopPropagation();
    if (e.nativeEvent && typeof e.nativeEvent.stopImmediatePropagation === 'function') {
      e.nativeEvent.stopImmediatePropagation();
    }
  }, []);
  
  const handleVolumeChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    stopEvent(e);
    
    const newVolume = parseFloat(e.target.value);
    const safeVolume = Math.max(0, Math.min(1, newVolume));
    
    if (safeVolume !== volume) {
      onChange(safeVolume);
    }
    
    if (safeVolume > 0 && isMuted) {
      setIsMuted(false);
    } else if (safeVolume === 0 && !isMuted) {
      setIsMuted(true);
    }
    
    if (safeVolume > 0) {
      setPreviousVolume(safeVolume);
    }
  }, [volume, isMuted, onChange, stopEvent]);
  
  const toggleMute = useCallback((e: React.MouseEvent) => {
    stopEvent(e);
    
    if (isMuted) {
      setIsMuted(false);
      onChange(previousVolume);
    } else {
      setIsMuted(true);
      onChange(0);
    }
  }, [isMuted, previousVolume, onChange, stopEvent]);
  
  const toggleVolumeSlider = useCallback((e: React.MouseEvent) => {
    stopEvent(e);
    setShowVolumeSlider(prev => !prev);
  }, [stopEvent]);
  
  // Show slider on hover for desktop
  const handleMouseEnter = useCallback(() => {
    if (!isMobile) {
      if (sliderTimeoutRef.current) {
        clearTimeout(sliderTimeoutRef.current);
        sliderTimeoutRef.current = null;
      }
      setShowVolumeSlider(true);
    }
  }, [isMobile]);
  
  // Hide slider after delay for desktop
  const handleMouseLeave = useCallback(() => {
    if (!isMobile) {
      sliderTimeoutRef.current = setTimeout(() => {
        setShowVolumeSlider(false);
      }, 800); // Slightly faster hide for better UI feel
    }
  }, [isMobile]);
  
  // Render volume icon based on state
  const getVolumeIcon = useCallback(() => {
    if (isMuted || volume === 0) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
          <path d="M18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" className="opacity-0" />
        </svg>
      );
    } else if (volume < 0.5) {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
        </svg>
      );
    } else {
      return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
          <path d="M13.5 4.06c0-1.336-1.616-2.005-2.56-1.06l-4.5 4.5H4.508c-1.141 0-2.318.664-2.66 1.905A9.76 9.76 0 001.5 12c0 .898.121 1.768.35 2.595.341 1.24 1.518 1.905 2.659 1.905h1.93l4.5 4.5c.945.945 2.561.276 2.561-1.06V4.06zM18.584 5.106a.75.75 0 011.06 0c3.808 3.807 3.808 9.98 0 13.788a.75.75 0 11-1.06-1.06 8.25 8.25 0 000-11.668.75.75 0 010-1.06z" />
          <path d="M15.932 7.757a.75.75 0 011.061 0 6 6 0 010 8.486.75.75 0 01-1.06-1.061 4.5 4.5 0 000-6.364.75.75 0 010-1.06z" />
        </svg>
      );
    }
  }, [isMuted, volume]);
  
  // Get the current volume as a percentage
  const volumePercent = isMuted ? 0 : volume * 100;
  
  return (
    <div 
      className={`relative group ${className}`} 
      ref={volumeControlRef}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={stopEvent}
    >
      <button
        type="button"
        className="focus:outline-none p-2 rounded-full transition-all duration-200 hover:bg-white/10 active:scale-95"
        onClick={(e) => {
          if (isMobile) {
            toggleVolumeSlider(e);
          } else {
            toggleMute(e);
          }
        }}
        aria-label={isMuted ? "Unmute" : "Mute"}
      >
        {getVolumeIcon()}
      </button>
      
      {/* Volume slider panel with smooth animation */}
      <div 
        className={`absolute ${isMobile ? 'bottom-12 left-1/2 transform -translate-x-1/2' : 'bottom-full -left-1 mb-2'} z-20
          transition-all duration-200 origin-bottom ${showVolumeSlider ? 'opacity-100 scale-100' : 'opacity-0 scale-95 pointer-events-none'}`}
        onClick={stopEvent}
      >
        <div className={`bg-zinc-900/90 backdrop-blur-md px-3 py-2 rounded-lg shadow-xl border border-zinc-800/40 
          ${isMobile ? 'w-36' : 'w-8'} flex ${isMobile ? 'flex-col' : 'flex-col'} items-center`}>
          
          {/* Vertical slider for desktop/horizontal for mobile */}
          <div className={`relative ${isMobile ? 'w-full' : 'h-24'} flex ${isMobile ? 'items-center' : 'flex-col justify-end'}`}>
            {/* Track background */}
            <div 
              className={`${isMobile ? 'w-full h-1' : 'w-1 h-full'} bg-zinc-800 rounded-full overflow-hidden relative`}
            >
              {/* Filled part of slider */}
              {isMobile ? (
                <div 
                  className="h-full bg-gradient-to-r from-white/70 to-white rounded-full"
                  style={{ width: `${volumePercent}%` }}
                />
              ) : (
                <div 
                  className="absolute bottom-0 w-full bg-gradient-to-t from-white/70 to-white rounded-full"
                  style={{ height: `${volumePercent}%` }}
                />
              )}
            </div>
            
            {/* Thumb indicator dot */}
            <div 
              className="absolute w-2.5 h-2.5 bg-white rounded-full shadow-md transform -translate-x-1/2 -translate-y-1/2 transition-all duration-100"
              style={{
                left: isMobile ? `${volumePercent}%` : '50%',
                bottom: !isMobile ? `calc(${volumePercent}% - 1.25px)` : 'auto',
                top: isMobile ? '50%' : 'auto',
              }}
            />
            
            {/* Invisible slider input */}
            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className={`absolute opacity-0 cursor-pointer ${isMobile ? 'w-full h-6' : 'h-full w-6'}`}
              style={{
                [isMobile ? 'top' : 'left']: '-8px',
                [isMobile ? 'left' : 'top']: '0',
              }}
              aria-label="Volume"
            />
          </div>
          
          {/* Volume percentage indicator - mobile only */}
          {isMobile && (
            <div className="flex justify-between items-center w-full mt-3">
              <button
                onClick={toggleMute}
                className="text-zinc-400 hover:text-white text-xs px-1.5 py-0.5 rounded hover:bg-white/10 transition-colors"
              >
                {isMuted ? "Unmute" : "Mute"}
              </button>
              <span className="text-zinc-300 text-xs font-medium">
                {Math.round(volumePercent)}%
              </span>
            </div>
          )}
        </div>
        
        {/* Subtle connecting triangle for desktop */}
        {!isMobile && (
          <div className="w-0 h-0 absolute left-2.5 bottom-0 transform translate-y-full border-t-4 border-l-4 border-r-4 border-t-zinc-900/90 border-l-transparent border-r-transparent" />
        )}
      </div>
    </div>
  );
}; 