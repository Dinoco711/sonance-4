'use client';

import { useState, useRef, useEffect, RefObject, useCallback } from 'react';
import { Song } from '../data/songs';

export function useMusicPlayer(songs: Song[], externalAudioRef?: RefObject<HTMLAudioElement | null>) {
  const [currentSongIndex, setCurrentSongIndex] = useState<number | null>(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(0.7);
  const [recentlyPlayed, setRecentlyPlayed] = useState<number[]>([]);
  const internalAudioRef = useRef<HTMLAudioElement | null>(null);
  
  // Use the external audio ref if provided, otherwise use the internal one
  const audioRef = externalAudioRef || internalAudioRef;

  // Handle time updates from the audio element
  const handleTimeUpdate = useCallback(() => {
    if (audioRef.current) {
      setProgress(audioRef.current.currentTime);
      setDuration(audioRef.current.duration);
    }
  }, [audioRef]);

  useEffect(() => {
    // Initialize audio element
    if (!audioRef.current) {
      const audio = new Audio();
      if (externalAudioRef) {
        externalAudioRef.current = audio;
      } else {
        internalAudioRef.current = audio;
      }
      
      audioRef.current = audio;
    }
    
    if (audioRef.current && currentSongIndex !== null && songs[currentSongIndex]) {
      audioRef.current.src = songs[currentSongIndex].audioSrc;
      audioRef.current.volume = volume;
      
      // Add event listeners
      audioRef.current.addEventListener('timeupdate', handleTimeUpdate);
      
      // Cleanup
      return () => {
        if (audioRef.current) {
          audioRef.current.pause();
          audioRef.current.removeEventListener('timeupdate', handleTimeUpdate);
        }
      };
    }
  }, [audioRef, currentSongIndex, songs, volume, externalAudioRef, handleTimeUpdate]);

  useEffect(() => {
    // Handle song changes
    if (audioRef.current && currentSongIndex !== null && songs[currentSongIndex]) {
      audioRef.current.src = songs[currentSongIndex].audioSrc;
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Error playing audio:', err));
      }
    }
  }, [audioRef, currentSongIndex, isPlaying, songs]);

  useEffect(() => {
    // Handle play/pause
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(err => console.error('Error playing audio:', err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [audioRef, isPlaying]);

  useEffect(() => {
    // Handle volume changes
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [audioRef, volume]);

  const handlePlayPause = useCallback(() => {
    setIsPlaying(!isPlaying);
  }, [isPlaying]);

  const handleNext = useCallback(() => {
    if (currentSongIndex === null) return;
    
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      
      const newIndex = prevIndex === songs.length - 1 ? 0 : prevIndex + 1;
      
      // Update recently played songs
      if (songs[newIndex]) {
        addToRecentlyPlayed(songs[newIndex]);
      }
      
      return newIndex;
    });
    setIsPlaying(true);
  }, [currentSongIndex, songs]);

  const handlePrevious = useCallback(() => {
    if (currentSongIndex === null) return;
    
    setCurrentSongIndex((prevIndex) => {
      if (prevIndex === null) return 0;
      
      const newIndex = prevIndex === 0 ? songs.length - 1 : prevIndex - 1;
      
      // Update recently played songs
      if (songs[newIndex]) {
        addToRecentlyPlayed(songs[newIndex]);
      }
      
      return newIndex;
    });
    setIsPlaying(true);
  }, [currentSongIndex, songs]);

  const handleProgressChange = useCallback((time: number) => {
    setProgress(time);
    if (audioRef.current) {
      audioRef.current.currentTime = time;
    }
  }, [audioRef]);

  const handleVolumeChange = useCallback((newVolume: number) => {
    setVolume(newVolume);
  }, []);

  const addToRecentlyPlayed = useCallback((song: Song) => {
    const index = songs.findIndex(s => s.id === song.id);
    if (index !== -1) {
      setRecentlyPlayed(prev => {
        // Remove the song if it already exists in the array
        const filtered = prev.filter(songIndex => songIndex !== index);
        // Add the song to the beginning of the array and limit to 10 items
        return [index, ...filtered].slice(0, 10);
      });
    }
  }, [songs]);

  const handleSongSelect = useCallback((index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
    
    // Update recently played songs
    if (songs[index]) {
      addToRecentlyPlayed(songs[index]);
    }
  }, [songs, addToRecentlyPlayed]);

  return {
    currentSongIndex,
    setCurrentSongIndex,
    isPlaying,
    setIsPlaying, 
    progress,
    setProgress,
    duration,
    volume,
    recentlyPlayed,
    addToRecentlyPlayed,
    handlePlayPause,
    handleNext,
    handlePrevious,
    handleProgressChange,
    handleVolumeChange,
    handleSongSelect,
    currentSong: currentSongIndex !== null && songs[currentSongIndex] ? songs[currentSongIndex] : null
  };
} 