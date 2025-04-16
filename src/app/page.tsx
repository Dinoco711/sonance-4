'use client';

import { useState, useCallback, memo, ReactNode, useRef, useEffect } from 'react';
import { songs } from './data/songs';
import { useMusicPlayer } from './hooks/useMusicPlayer';
import MusicCard from './components/MusicCard';
import NowPlayingBar from './components/NowPlayingBar';
import ExpandedSongCard from './components/ExpandedSongCard';
import GenrePage from './components/GenrePage';
import PlaylistPage from './components/PlaylistPage';
import LikedSongsPage from './components/LikedSongsPage';
import SavesPage from './components/SavesPage';
import AlbumsPage from './components/AlbumsPage';
import PodcastsPage from './components/PodcastsPage';
import AudiobooksPage from './components/AudiobooksPage';
import ArtistsPage from './components/ArtistsPage';

// Memoize components to prevent unnecessary re-renders
const MemoizedMusicCard = memo(MusicCard);
const MemoizedNowPlayingBar = memo(NowPlayingBar);

// Type definitions for NavItem props
interface NavItemProps {
  icon: ReactNode;
  label: string;
  onClick?: () => void;
  isDropdown?: boolean;
  isActive?: boolean;
  delay?: number;
  children?: ReactNode;
  isSidebarOpen?: boolean;
}

function NavItem({ 
  icon, 
  label, 
  onClick = () => {}, 
  isDropdown = false, 
  isActive = false, 
  delay = 0,
  children,
  isSidebarOpen = false
}: NavItemProps) {
  return (
    <div className="mb-1 transition-transform duration-500 ease-in-out" style={{ transitionDelay: `${delay}ms` }}>
      <button 
        className={`flex items-center justify-between w-full px-2.5 py-2 rounded-xl hover:bg-white/10 transition-colors text-left ${isActive ? 'bg-white/5' : ''}`}
        onClick={onClick}
        aria-expanded={isDropdown ? isActive : undefined}
      >
        <div className="flex items-center min-w-0">
          <div className="w-7 h-7 flex items-center justify-center flex-shrink-0 text-gray-200">
            {icon}
          </div>
          <span className={`ml-2.5 font-medium text-sm whitespace-nowrap transition-opacity duration-300 text-gray-200 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} overflow-hidden text-ellipsis`}>{label}</span>
        </div>
        {isDropdown && (
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" 
            className={`w-4 h-4 transition-transform duration-300 text-gray-300 ${isSidebarOpen ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} ${isActive ? 'rotate-180' : ''}`}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
          </svg>
        )}
      </button>
      {isDropdown && (
        <div className={`mt-1 overflow-hidden transition-all duration-300 ${isActive ? 'max-h-60' : 'max-h-0'}`}>
          {children}
        </div>
      )}
    </div>
  );
}

export default function Home() {
  const audioRef = useRef<HTMLAudioElement>(null);
  
  const { 
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
    handleNext: nextSong,
    handlePrevious: previousSong,
    handleProgressChange,
    handleVolumeChange,
    handleSongSelect,
    currentSong
  } = useMusicPlayer(songs, audioRef);

  // Add state for managing dropdown menus
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  
  // Add state for expanded song card
  const [showExpandedCard, setShowExpandedCard] = useState(false);
  
  // Add state for selected genre
  const [selectedGenre, setSelectedGenre] = useState<string | null>(null);
  
  // Add state for selected playlist
  const [selectedPlaylist, setSelectedPlaylist] = useState<string | null>(null);
  
  // Add state for liked songs page
  const [showLikedSongs, setShowLikedSongs] = useState(false);
  
  // Add state for saves page
  const [showSaves, setShowSaves] = useState(false);
  
  // Add state for albums page
  const [showAlbums, setShowAlbums] = useState(false);
  
  // Add state for podcasts page
  const [showPodcasts, setShowPodcasts] = useState(false);
  
  // Add state for audiobooks page
  const [showAudiobooks, setShowAudiobooks] = useState(false);
  
  // Add state for artists page
  const [showArtists, setShowArtists] = useState(false);
  
  // Add state for sidebar visibility on mobile
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);
  
  // Add state for profile popup
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  
  // Add state for notification popup
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  
  // Add state for shuffle
  const [isShuffleOn, setIsShuffleOn] = useState(false);
  
  // Add state for repeat mode
  const [repeatMode, setRepeatMode] = useState(0); // 0: off, 1: repeat all, 2: repeat one
  
  // Create refs for popup handling
  const profileRef = useRef<HTMLDivElement>(null);
  const notificationRef = useRef<HTMLDivElement>(null);
  
  // Create ref for the sidebar
  const sidebarRef = useRef<HTMLDivElement>(null);
  
  // Toggle dropdown function
  const toggleDropdown = useCallback((id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  }, [openDropdown]);

  // Handle sidebar collapse
  const handleSidebarMouseLeave = useCallback(() => {
    // Close any open dropdown when the sidebar is collapsed
    if (openDropdown) {
      setOpenDropdown(null);
    }
  }, [openDropdown]);

  // Toggle sidebar visibility (for mobile)
  const toggleSidebar = useCallback(() => {
    setIsSidebarVisible(!isSidebarVisible);
  }, [isSidebarVisible]);

  // Toggle profile popup
  const toggleProfile = useCallback(() => {
    setIsProfileOpen(!isProfileOpen);
    if (isNotificationOpen) setIsNotificationOpen(false);
  }, [isProfileOpen, isNotificationOpen]);

  // Toggle notification popup
  const toggleNotification = useCallback(() => {
    setIsNotificationOpen(!isNotificationOpen);
    if (isProfileOpen) setIsProfileOpen(false);
  }, [isNotificationOpen, isProfileOpen]);

  // Handle clicks outside popups
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setIsNotificationOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Handle expanded card visibility
  const handleExpandCard = useCallback(() => {
    setShowExpandedCard(true);
  }, []);
  
  const handleCloseExpandedCard = useCallback(() => {
    setShowExpandedCard(false);
  }, []);
  
  // Get suggested songs based on current song
  const getSuggestedSongs = useCallback(() => {
    if (!currentSong) return [];
    
    // Get songs with the same artist
    const sameArtist = songs.filter(song => 
      song.artist === currentSong.artist && song.id !== currentSong.id
    );
    
    // Add more songs to make up at least 10 suggestions
    let suggestions = [...sameArtist];
    
    if (suggestions.length < 10) {
      // Add some other songs to reach at least 10 suggestions
      const otherSongs = songs.filter(song => 
        !suggestions.includes(song) && song.id !== currentSong.id
      ).slice(0, 10 - suggestions.length);
      
      suggestions = [...suggestions, ...otherSongs];
    }
    
    return suggestions;
  }, [currentSong]);

  // Handle song selection with expanded view
  const handleSongClick = useCallback((songIndex: number) => {
    handleSongSelect(songIndex);
    setShowExpandedCard(true);
  }, [handleSongSelect, setShowExpandedCard]);

  // Handle genre selection
  const handleGenreClick = useCallback((genreName: string) => {
    setSelectedGenre(genreName);
    setSelectedPlaylist(null); // Close playlist page if open
    resetOtherPages(['genre']); // Keep genre page open by adding it to except array
  }, []);
  
  // Handle closing the genre page
  const handleCloseGenrePage = useCallback(() => {
    setSelectedGenre(null);
  }, []);
  
  // Handle playlist selection
  const handlePlaylistClick = useCallback((playlistName: string) => {
    setSelectedPlaylist(playlistName);
    setSelectedGenre(null); // Close genre page if open
    resetOtherPages(['playlist']); // Keep playlist page open by adding it to except array
  }, []);
  
  // Handle closing the playlist page
  const handleClosePlaylistPage = useCallback(() => {
    setSelectedPlaylist(null);
  }, []);
  
  // Handle liked songs click
  const handleLikedSongsClick = useCallback(() => {
    setShowLikedSongs(true);
    resetOtherPages(['likedSongs']);
  }, []);
  
  // Handle closing liked songs page
  const handleCloseLikedSongsPage = useCallback(() => {
    setShowLikedSongs(false);
  }, []);
  
  // Handle saves click
  const handleSavesClick = useCallback(() => {
    setShowSaves(true);
    resetOtherPages(['saves']);
  }, []);
  
  // Handle closing saves page
  const handleCloseSavesPage = useCallback(() => {
    setShowSaves(false);
  }, []);
  
  // Handle albums click
  const handleAlbumsClick = useCallback(() => {
    setShowAlbums(true);
    resetOtherPages(['albums']);
  }, []);
  
  // Handle closing albums page
  const handleCloseAlbumsPage = useCallback(() => {
    setShowAlbums(false);
  }, []);
  
  // Handle podcasts click
  const handlePodcastsClick = useCallback(() => {
    setShowPodcasts(true);
    resetOtherPages(['podcasts']);
  }, []);
  
  // Handle closing podcasts page
  const handleClosePodcastsPage = useCallback(() => {
    setShowPodcasts(false);
  }, []);
  
  // Handle audiobooks click
  const handleAudiobooksClick = useCallback(() => {
    setShowAudiobooks(true);
    resetOtherPages(['audiobooks']);
  }, []);
  
  // Handle closing audiobooks page
  const handleCloseAudiobooksPage = useCallback(() => {
    setShowAudiobooks(false);
  }, []);
  
  // Handle artists click
  const handleArtistsClick = useCallback(() => {
    setShowArtists(true);
    resetOtherPages(['artists']);
  }, []);
  
  // Handle closing artists page
  const handleCloseArtistsPage = useCallback(() => {
    setShowArtists(false);
  }, []);
  
  // Helper function to reset all page states except the specified ones
  const resetOtherPages = useCallback((except: string[] = []) => {
    if (!except.includes('genre')) setSelectedGenre(null);
    if (!except.includes('playlist')) setSelectedPlaylist(null);
    if (!except.includes('likedSongs')) setShowLikedSongs(false);
    if (!except.includes('saves')) setShowSaves(false);
    if (!except.includes('albums')) setShowAlbums(false);
    if (!except.includes('podcasts')) setShowPodcasts(false);
    if (!except.includes('audiobooks')) setShowAudiobooks(false);
    if (!except.includes('artists')) setShowArtists(false);
  }, []);

  // Memoize the sections to prevent unnecessary re-renders
  const renderNewReleases = useCallback(() => (
    <section className="mb-8">
      <h2 className="text-xl font-semibold mb-5 text-gray-800">New Releases</h2>
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
        {songs.slice(0, 6).map((song, index) => (
          <div key={song.id} className="flex-shrink-0 w-[170px]" onClick={() => handleSongClick(song.id - 1)}>
            <div className="rounded-xl overflow-hidden bg-gray-50 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer hover-card-animation">
              <div className="w-full aspect-square rounded-lg overflow-hidden mb-3">
                <img 
                  src={song.cover} 
                  alt={`${song.title} by ${song.artist}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
              <h3 className="font-medium text-sm mb-1 truncate text-gray-800">{song.title}</h3>
              <p className="text-xs text-gray-600 truncate">{song.artist}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  ), [handleSongClick]);

  // Memoize the Recently Played section
  const renderRecentlyPlayed = useCallback(() => {
    // Only show the section if there are recently played songs
    if (recentlyPlayed.length === 0) return null;
    
    return (
      <section className="mb-8">
        <h2 className="text-xl font-semibold mb-5 text-gray-800">Recently Played</h2>
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          {recentlyPlayed.map((songIndex) => {
            const song = songs[songIndex];
            return (
              <div key={`recent-${song.id}`} className="flex-shrink-0 w-[170px]" onClick={() => handleSongClick(songIndex)}>
                <div className="rounded-xl overflow-hidden bg-gray-50 p-3 shadow-sm hover:shadow-md transition-all cursor-pointer hover-card-animation">
                  <div className="w-full aspect-square rounded-lg overflow-hidden mb-3">
                    <img 
                      src={song.cover} 
                      alt={`${song.title} by ${song.artist}`}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <h3 className="font-medium text-sm mb-1 truncate text-gray-800">{song.title}</h3>
                  <p className="text-xs text-gray-600 truncate">{song.artist}</p>
                </div>
              </div>
            );
          })}
        </div>
      </section>
    );
  }, [recentlyPlayed, songs, handleSongClick]);

  // Add these handler functions
  const handleShuffleToggle = (shuffleOn: boolean) => {
    setIsShuffleOn(shuffleOn);
  };

  const handleRepeatModeChange = (mode: number) => {
    setRepeatMode(mode);
  };

  // Add audio ended event listener to handle repeat and shuffle modes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      const handleEnded = () => {
        if (repeatMode === 2) {
          // Repeat one: replay the same song
          audioRef.current!.currentTime = 0;
          audioRef.current!.play().catch(err => console.error("Error playing audio:", err));
        } else if (repeatMode === 1 || isShuffleOn) {
          // Repeat all or shuffle: go to next song
          if (isShuffleOn) {
            // Get random song that's not the current one
            const randomIndex = Math.floor(Math.random() * songs.length);
            handleSongSelect(randomIndex);
          } else {
            // Just play next song
            nextSong();
          }
        } else {
          // No repeat: if last song, stop playback
          if (currentSongIndex === songs.length - 1) {
            setIsPlaying(false);
          } else {
            nextSong();
          }
        }
      };
      
      audioRef.current.addEventListener('ended', handleEnded);
      
      return () => {
        audioRef.current?.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioRef, currentSong, currentSongIndex, repeatMode, isShuffleOn, songs.length, nextSong, handleSongSelect, setIsPlaying, addToRecentlyPlayed]);

  return (
    <div className="h-screen flex overflow-hidden bg-gray-50 p-1 sm:p-2 md:p-3">
      {/* Sidebar - fixed height to match viewport with rounded edges and margin */}
      <aside 
        ref={sidebarRef}
        className={`${isSidebarVisible ? 'translate-x-0 w-60' : '-translate-x-full sm:translate-x-0 sm:w-16'} 
        transition-all duration-300 ease-out fixed sm:static z-50 sm:z-20 group 
        flex flex-col bg-black text-gray-200 h-[calc(100vh-0.5rem)] sm:h-[calc(100vh-1rem)] md:h-[calc(100vh-1.5rem)] 
        flex-shrink-0 overflow-hidden rounded-xl sm:rounded-2xl mr-0 shadow-lg hover:w-60 sm:hover:w-60`}
        onMouseLeave={handleSidebarMouseLeave}
      >
        {/* Logo - combined collapsed/expanded view with conditional styling */}
        <div className="p-2.5 mb-6 flex items-center w-full">
          <button 
            className="w-10 h-10 bg-white text-gray-900 rounded-full flex items-center justify-center flex-shrink-0 hover:bg-gray-200 transition-all cursor-pointer" 
            aria-label="Home"
            onClick={() => {
              resetOtherPages();
              if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                setIsSidebarVisible(false);
              }
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
              <path d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
            </svg>
          </button>
          <span className={`ml-3 text-lg font-medium transition-opacity duration-300 text-gray-200 ${isSidebarVisible ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'} whitespace-nowrap overflow-hidden`}>Library</span>
        </div>
        
        {/* Navigation section */}
        <div className="flex flex-col gap-1 px-2 overflow-y-auto flex-grow scrollbar-hide">
          {/* Navigation icons - optimized to show in both collapsed/expanded states */}
          <NavItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
              </svg>
            }
            label="Playlists"
            onClick={() => toggleDropdown('playlists')}
            isDropdown
            isActive={openDropdown === 'playlists'}
            delay={100}
            isSidebarOpen={isSidebarVisible}
          >
            <div className="ml-7 space-y-1 overflow-hidden">
              <a 
                href="#" 
                className="flex items-center px-2.5 py-1.5 text-sm rounded-lg hover:bg-white/10 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handlePlaylistClick("Top Hits 2024");
                  if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                    setIsSidebarVisible(false);
                  }
                }}
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-purple-400 to-pink-500 flex-shrink-0 mr-2"></div>
                <span className={`transition-opacity duration-300 text-gray-200 ${isSidebarVisible || openDropdown === 'playlists' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>Top Hits 2024</span>
              </a>
              <a 
                href="#" 
                className="flex items-center px-2.5 py-1.5 text-sm rounded-lg hover:bg-white/10 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handlePlaylistClick("Chill Vibes");
                  if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                    setIsSidebarVisible(false);
                  }
                }}
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-blue-400 to-teal-500 flex-shrink-0 mr-2"></div>
                <span className={`transition-opacity duration-300 text-gray-200 ${isSidebarVisible || openDropdown === 'playlists' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>Chill Vibes</span>
              </a>
              <a 
                href="#" 
                className="flex items-center px-2.5 py-1.5 text-sm rounded-lg hover:bg-white/10 transition-colors"
                onClick={(e) => {
                  e.preventDefault();
                  handlePlaylistClick("Party Mix");
                  if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                    setIsSidebarVisible(false);
                  }
                }}
              >
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-amber-400 to-red-500 flex-shrink-0 mr-2"></div>
                <span className={`transition-opacity duration-300 text-gray-200 ${isSidebarVisible || openDropdown === 'playlists' ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>Party Mix</span>
              </a>
            </div>
          </NavItem>

          <NavItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
              </svg>
            }
            label="Liked Songs"
            onClick={() => {
              handleLikedSongsClick();
              if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                setIsSidebarVisible(false);
              }
            }}
            isSidebarOpen={isSidebarVisible}
          />
          
          {/* Remaining NavItems with the mobile closing functionality added */}
          <NavItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0111.186 0z" />
              </svg>
            }
            label="Saves"
            delay={200}
            onClick={() => {
              handleSavesClick();
              if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                setIsSidebarVisible(false);
              }
            }}
            isSidebarOpen={isSidebarVisible}
          />

          <NavItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
              </svg>
            }
            label="Albums"
            delay={250}
            onClick={() => {
              handleAlbumsClick();
              if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                setIsSidebarVisible(false);
              }
            }}
            isSidebarOpen={isSidebarVisible}
          />

          <NavItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 18.75a6 6 0 0 0 6-6v-1.5m-6 7.5a6 6 0 0 1-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 0 1-3-3V4.5a3 3 0 1 1 6 0v8.25a3 3 0 0 1-3 3Z" />
              </svg>
            }
            label="Podcasts"
            delay={350}
            onClick={() => {
              handlePodcastsClick();
              if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                setIsSidebarVisible(false);
              }
            }}
            isSidebarOpen={isSidebarVisible}
          />

          <NavItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25" />
              </svg>
            }
            label="Audiobooks"
            delay={400}
            onClick={() => {
              handleAudiobooksClick();
              if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                setIsSidebarVisible(false);
              }
            }}
            isSidebarOpen={isSidebarVisible}
          />

          <NavItem 
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
              </svg>
            }
            label="Artists"
            delay={450}
            onClick={() => {
              handleArtistsClick();
              if (window.innerWidth < 640) { // sm breakpoint in Tailwind
                setIsSidebarVisible(false);
              }
            }}
            isSidebarOpen={isSidebarVisible}
          />
        </div>
      </aside>

      {/* Overlay for mobile when sidebar is open */}
      {isSidebarVisible && (
        <div 
          className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
          onClick={() => setIsSidebarVisible(false)}
          aria-hidden="true"
        ></div>
      )}

      {/* Main content wrapper - changed min-width-0 to ensure it doesn't overflow when sidebar expands */}
      <div className="flex-1 flex flex-col h-screen min-w-0 overflow-hidden">
        {/* Header area - remains outside the rounded container */}
        <header className="flex items-center justify-between p-1.5 md:p-3 mb-1">
          <div className="flex items-center gap-2.5">
            {/* Library toggle button - only visible on mobile */}
            <button 
              className="sm:hidden w-8 h-8 flex items-center justify-center focus:outline-none text-neutral-600 hover:text-neutral-900 transition-colors"
              onClick={toggleSidebar}
              aria-label={isSidebarVisible ? "Close library" : "Open library"}
              aria-expanded={isSidebarVisible}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12" />
              </svg>
            </button>
            <h1 
              className="text-2xl font-bold tracking-tight cursor-pointer hover:text-neutral-700 transition-colors text-gray-900 leading-tight flex items-center"
              onClick={() => resetOtherPages()}
              style={{ 
                fontFamily: 'var(--font-geist-sans)',
                letterSpacing: '-0.02em',
                textShadow: '0 1px 2px rgba(0,0,0,0.05)'
              }}
            >
              <span className="bg-gradient-to-r from-black to-gray-600 bg-clip-text text-transparent">Sonance</span>
              <span className="ml-1 text-xs font-semibold bg-black text-white px-1.5 py-0.5 rounded-md opacity-80">
                MUSIC
              </span>
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {/* Search bar - hidden on mobile, visible on larger screens */}
            <div className="hidden sm:relative sm:block sm:w-48 md:w-80">
              <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 text-neutral-400" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Search"
                className="pl-10 pr-4 py-1.5 w-full bg-white text-neutral-800 rounded-full border-none focus:outline-none focus:ring-2 focus:ring-neutral-200 text-sm shadow-sm"
                aria-label="Search"
              />
            </div>
            
            {/* Search icon for mobile */}
            <button className="sm:hidden w-8 h-8 flex items-center justify-center focus:outline-none text-neutral-600 hover:text-neutral-900 transition-colors" aria-label="Search">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4.5 h-4.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
              </svg>
            </button>
            
            {/* Notification icon and popup */}
            <div className="relative" ref={notificationRef}>
              <button 
                className="w-8 h-8 flex items-center justify-center focus:outline-none text-neutral-600 hover:text-neutral-900 transition-colors relative"
                onClick={toggleNotification}
                aria-label="Notifications"
                aria-expanded={isNotificationOpen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4.5 h-4.5" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <span className="absolute top-1 right-1 w-1.5 h-1.5 bg-red-500 rounded-full"></span>
              </button>
              
              {/* Notification popup */}
              {isNotificationOpen && (
                <div className="absolute right-0 top-full mt-1 w-80 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden z-50 transition-all duration-200 ease-out transform origin-top-right">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center justify-between">
                      <h3 className="font-medium text-sm">Notifications</h3>
                      <button className="text-xs text-blue-500 hover:text-blue-700">Mark all as read</button>
                    </div>
                  </div>
                  <div className="max-h-96 overflow-y-auto">
                    <div className="p-3 hover:bg-gray-50 transition-colors border-b border-gray-100">
                      <div className="flex items-start">
                        <div className="w-9 h-9 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-indigo-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New playlist added: <span className="text-gray-900">Summer Hits</span></p>
                          <p className="text-xs text-gray-500 mt-1">Check out our latest curated playlist!</p>
                          <p className="text-xs text-gray-400 mt-2">15 minutes ago</p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 hover:bg-gray-50 transition-colors">
                      <div className="flex items-start">
                        <div className="w-9 h-9 rounded-full bg-green-100 flex items-center justify-center flex-shrink-0 mr-3">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-green-500">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-.99-3.467l2.31-.66a2.25 2.25 0 001.632-2.163zm0 0V2.25L9 5.25v10.303m0 0v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 01-.99-3.467l2.31-.66A2.25 2.25 0 009 15.553z" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">New song release: <span className="text-gray-900">Taylor Swift</span></p>
                          <p className="text-xs text-gray-500 mt-1">Listen to the latest single from your favorite artist</p>
                          <p className="text-xs text-gray-400 mt-2">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="p-3 bg-gray-50 text-center">
                    <button className="text-xs text-neutral-600 hover:text-neutral-900">View all notifications</button>
                  </div>
                </div>
              )}
            </div>
            
            {/* Profile button and popup */}
            <div className="relative" ref={profileRef}>
              <button 
                className="h-8 w-8 flex items-center justify-center bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-full transition-colors"
                onClick={toggleProfile}
                aria-label="User Profile"
                aria-expanded={isProfileOpen}
              >
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4.5 h-4.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                </svg>
              </button>
              
              {/* Profile popup */}
              {isProfileOpen && (
                <div className="absolute right-0 top-full mt-1 w-60 bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden z-50 transition-all duration-200 ease-out transform origin-top-right">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0 mr-3">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 text-gray-600">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
                        </svg>
                      </div>
                      <div>
                        <p className="font-medium text-sm">John Doe</p>
                        <p className="text-xs text-gray-500">john.doe@example.com</p>
                      </div>
                    </div>
                  </div>
                  <div className="py-2">
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-3 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      View Profile
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-3 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.325.196.72.257 1.075.124l1.17-.195c.323-.054.654.036.905.245l1.33 1.108c.32.267.46.694.358 1.1a8.7 8.7 0 0 1-2.288 4.04l-.723.724a1.125 1.125 0 0 1-1.298.21l-.153-.076a1.125 1.125 0 0 1-.622-1.006v-1.089c0-.298-.119-.585-.33-.796l-1.347-1.347a1.125 1.125 0 0 1-.21-1.298L9.75 12l-1.64-1.64a6 6 0 0 1-1.676-3.257l-.172-1.03Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      </svg>
                      Settings
                    </button>
                    <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 mr-3 text-gray-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15m3 0 3-3m0 0-3-3m3 3H9" />
                      </svg>
                      Sign Out
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Fixed content container with rounded borders */}
        <div className="flex-1 flex flex-col mx-1 sm:mx-3 md:mx-6 mb-1 sm:mb-3 md:mb-6 bg-white rounded-xl sm:rounded-2xl shadow-md overflow-hidden border border-gray-100">
          {/* Main content area - conditionally render various pages */}
          {selectedGenre ? (
            <GenrePage 
              genreName={selectedGenre}
              onClose={handleCloseGenrePage}
              onSongSelect={handleSongSelect}
            />
          ) : selectedPlaylist ? (
            <PlaylistPage
              playlistName={selectedPlaylist}
              onClose={handleClosePlaylistPage}
              onSongSelect={handleSongSelect}
            />
          ) : showLikedSongs ? (
            <LikedSongsPage
              onClose={handleCloseLikedSongsPage}
              onSongSelect={handleSongSelect}
            />
          ) : showSaves ? (
            <SavesPage
              onClose={handleCloseSavesPage}
              onSongSelect={handleSongSelect}
            />
          ) : showAlbums ? (
            <AlbumsPage
              onClose={handleCloseAlbumsPage}
              onSongSelect={handleSongSelect}
            />
          ) : showPodcasts ? (
            <PodcastsPage
              onClose={handleClosePodcastsPage}
              onSongSelect={handleSongSelect}
            />
          ) : showAudiobooks ? (
            <AudiobooksPage
              onClose={handleCloseAudiobooksPage}
              onSongSelect={handleSongSelect}
            />
          ) : showArtists ? (
            <ArtistsPage
              onClose={handleCloseArtistsPage}
              onSongSelect={handleSongSelect}
            />
          ) : (
            <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
              <div className="p-3 sm:p-4 md:p-6">
                {/* Render optimized sections */}
                {renderNewReleases()}
                
                {/* Recently Played section */}
                {renderRecentlyPlayed()}

                {/* Featured playlists section */}
                <section className="mb-8">
                  <h2 className="text-xl font-semibold mb-5 text-gray-800">Featured Playlists</h2>
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
                    <div 
                      className="bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md cursor-pointer hover-card-animation"
                      onClick={() => handlePlaylistClick("Top Hits 2024")}
                    >
                      <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 shadow-sm bg-gradient-to-br from-purple-400 to-pink-500"></div>
                      <h3 className="font-medium text-sm mb-1 truncate text-gray-800">Top Hits 2024</h3>
                      <p className="text-xs text-gray-600 truncate">The hottest tracks right now</p>
                    </div>
                    <div 
                      className="bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md cursor-pointer hover-card-animation"
                      onClick={() => handlePlaylistClick("Chill Vibes")}
                    >
                      <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 shadow-sm bg-gradient-to-br from-blue-400 to-teal-500"></div>
                      <h3 className="font-medium text-sm mb-1 truncate text-gray-800">Chill Vibes</h3>
                      <p className="text-xs text-gray-600 truncate">Relaxing tunes to unwind</p>
                    </div>
                    <div 
                      className="bg-gray-50 p-4 rounded-2xl shadow-sm hover:shadow-md cursor-pointer hover-card-animation"
                      onClick={() => handlePlaylistClick("Party Mix")}
                    >
                      <div className="w-full aspect-square rounded-xl overflow-hidden mb-3 shadow-sm bg-gradient-to-br from-amber-400 to-red-500"></div>
                      <h3 className="font-medium text-sm mb-1 truncate text-gray-800">Party Mix</h3>
                      <p className="text-xs text-gray-600 truncate">Upbeat tracks for your party</p>
                    </div>
                  </div>
                </section>

                {/* Featured Artist */}
                <div className="bg-gray-50 rounded-2xl mb-6 sm:mb-8 overflow-hidden shadow-sm">
                  <div className="flex flex-col md:flex-row">
                    <div className="p-4 sm:p-8 md:p-10 flex-1">
                      <div className="flex flex-col h-full justify-between">
                        <div>
                          <div className="flex items-center mb-2 sm:mb-3">
                            <span className="bg-blue-50 text-blue-600 text-xs px-2 sm:px-3 py-1 rounded-full font-medium">Featured artist</span>
                          </div>
                          <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold mb-2 sm:mb-3 text-gray-800">{currentSong?.artist || "Featured Artist"}</h2>
                          <p className="text-gray-600 mb-4 sm:mb-8 text-xs sm:text-sm">Trending with "{currentSong?.title}"</p>
                        </div>
                        <div className="flex items-center gap-2 sm:gap-4">
                          <button 
                            className="px-4 sm:px-8 py-2 sm:py-3 bg-gray-800 text-white rounded-full flex items-center justify-center gap-1 sm:gap-2 font-medium text-sm hover:bg-gray-700 transition-colors"
                            onClick={handlePlayPause}
                            aria-label={isPlaying ? "Pause" : "Play"}
                          >
                            {isPlaying ? (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
                                </svg>
                                <span className="sm:inline hidden">Pause</span>
                              </>
                            ) : (
                              <>
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                                  <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                                </svg>
                                <span className="sm:inline hidden">Play</span>
                              </>
                            )}
                          </button>
                          <button className="px-3 sm:px-6 py-2 sm:py-3 border border-neutral-200 text-gray-800 rounded-full font-medium text-sm hover:bg-gray-50 transition-colors">
                            <span className="sm:inline hidden">Follow</span>
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:hidden">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zM4 19.235v-.11a6.375 6.375 0 0114.998 0v.109A12.318 12.318 0 0110.374 21c-2.331 0-4.512-.645-6.374-1.632z" />
                            </svg>
                          </button>
                          <button className="w-8 h-8 sm:w-10 sm:h-10 flex items-center justify-center text-gray-600 hover:text-gray-800 transition-colors" aria-label="More options">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 12a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H8.25m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0H12m4.125 0a.375.375 0 11-.75 0 .375.375 0 01.75 0zm0 0h-.375M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="md:w-2/5 w-full relative overflow-hidden md:h-auto bg-gray-100">
                      {currentSong?.cover ? (
                        <img 
                          src={currentSong.cover} 
                          alt={`${currentSong.artist} cover`} 
                          className="w-full h-full object-cover aspect-square md:aspect-auto min-h-[200px] sm:min-h-[300px]"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full min-h-[200px] sm:min-h-[300px] bg-gradient-to-br from-gray-200 to-gray-300"></div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Main Content */}
                <div className="pb-24">
                  {/* Popular Tracks */}
                  <section className="mb-8 md:mb-10">
                    <h2 className="text-xl font-semibold mb-4 md:mb-5 text-gray-800">Popular</h2>
                    <div className="bg-gray-50 rounded-2xl shadow-sm overflow-hidden">
                      {songs.slice(0, 8).map((song, index) => (
                        <div 
                          key={song.id}
                          className={`flex items-center p-3 sm:p-4 ${song.id - 1 === currentSongIndex ? 'bg-neutral-100' : ''} hover:bg-neutral-50 cursor-pointer transition-colors border-b border-neutral-100 last:border-b-0`}
                          onClick={() => handleSongClick(song.id - 1)}
                        >
                          <div className="mr-3 sm:mr-5 text-neutral-400 w-4 sm:w-5 text-center font-medium text-xs sm:text-sm">{index + 1}</div>
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md overflow-hidden mr-2 sm:mr-4 flex-shrink-0">
                            <img src={song.cover} alt={song.title} className="w-full h-full object-cover" loading="lazy" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium mb-0.5 sm:mb-1 text-sm sm:text-base truncate text-gray-800">{song.title}</h3>
                            <p className="text-xs sm:text-sm text-neutral-500 truncate">{song.artist}</p>
                          </div>
                          <div className="text-xs sm:text-sm text-neutral-500 mr-2 sm:mr-4">{song.duration}</div>
                          <button 
                            className="text-neutral-400 hover:text-neutral-700 transition-colors p-1.5 sm:p-2"
                            aria-label={`Like ${song.title}`}
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </section>
                  
                  {/* Music card sections */}
                  <div className="grid grid-cols-1 gap-6 sm:gap-10">
                    {/* Picked for you */}
                    <section>
                      <div className="flex justify-between items-center mb-4 md:mb-5">
                        <h2 className="text-xl font-semibold text-gray-800">Recommended for you</h2>
                        <button 
                          className="text-neutral-700 hover:text-neutral-900 transition-colors"
                          aria-label="View all recommendations"
                        >
                          <span className="hidden md:inline-flex items-center text-sm font-medium">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:hidden" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
                        {songs.slice(8, 20).map((song) => (
                          <div 
                            key={song.id} 
                            className="bg-gray-50 p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-md cursor-pointer hover-card-animation"
                            onClick={() => handleSongClick(song.id - 1)}
                          >
                            <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 sm:mb-3 shadow-sm">
                              <img src={song.cover} alt={song.title} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <h3 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1 truncate text-gray-800">{song.title}</h3>
                            <p className="text-xs text-neutral-500 truncate">{song.artist}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    {/* Genres */}
                    <section>
                      <div className="flex justify-between items-center mb-4 md:mb-5">
                        <h2 className="text-xl font-semibold text-gray-800">Explore Genres</h2>
                        <button 
                          className="text-neutral-700 hover:text-neutral-900 transition-colors"
                          aria-label="View all genres"
                        >
                          <span className="hidden md:inline-flex items-center text-sm font-medium">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:hidden" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-3 sm:gap-5">
                        {[
                          { name: "Pop", color: "bg-gradient-to-br from-pink-400 to-red-500", songs: songs.filter(s => ["Katy Perry", "Taylor Swift", "Lady Gaga & Bruno Mars", "Harry Styles"].includes(s.artist)) },
                          { name: "Rock", color: "bg-gradient-to-br from-red-400 to-amber-500", songs: songs.filter(s => ["Bastille", "KALEO", "OneRepublic"].includes(s.artist)) },
                          { name: "Indie", color: "bg-gradient-to-br from-emerald-400 to-cyan-500", songs: songs.filter(s => ["Girl in Red", "Hollow Coves", "Lord Huron"].includes(s.artist)) },
                          { name: "Electronic", color: "bg-gradient-to-br from-blue-400 to-indigo-500", songs: songs.filter(s => ["Eiffel 65", "The Neighbourhood", "Cigarettes After Sex"].includes(s.artist)) },
                          { name: "Acoustic", color: "bg-gradient-to-br from-violet-400 to-purple-500", songs: songs.filter(s => ["Vance Joy", "SYML", "Tom Rosenthal"].includes(s.artist)) },
                          { name: "Alternative", color: "bg-gradient-to-br from-amber-400 to-yellow-500", songs: songs.filter(s => ["New West", "The Rare Occasions", "Dr. Dog"].includes(s.artist)) }
                        ].map((genre, index) => (
                          <div 
                            key={index} 
                            className="bg-gray-50 rounded-2xl p-4 sm:p-5 shadow-sm hover:shadow-md transition-all cursor-pointer overflow-hidden relative h-24 sm:h-36 group"
                            onClick={() => handleGenreClick(genre.name)}
                          >
                            <div className={`absolute inset-0 ${genre.color} opacity-30 group-hover:opacity-50 transition-opacity duration-300`}></div>
                            <div className="absolute bottom-3 sm:bottom-5 left-3 sm:left-5">
                              <h3 className="text-base sm:text-lg font-bold text-gray-800">{genre.name}</h3>
                              <p className="text-xs sm:text-sm text-gray-600">{genre.songs.length} songs</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </section>
                    
                    {/* Recently Added */}
                    <section>
                      <div className="flex justify-between items-center mb-4 md:mb-5">
                        <h2 className="text-xl font-semibold text-gray-800">Recently Added</h2>
                        <button 
                          className="text-neutral-700 hover:text-neutral-900 transition-colors"
                          aria-label="View all recently added"
                        >
                          <span className="hidden md:inline-flex items-center text-sm font-medium">
                            View All
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 ml-1" aria-hidden="true">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                            </svg>
                          </span>
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 md:hidden" aria-hidden="true">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                          </svg>
                        </button>
                      </div>
                      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 sm:gap-5">
                        {songs.slice(20, 32).map((song) => (
                          <div 
                            key={song.id} 
                            className="bg-gray-50 p-3 sm:p-4 rounded-2xl shadow-sm hover:shadow-md cursor-pointer hover-card-animation"
                            onClick={() => handleSongClick(song.id - 1)}
                          >
                            <div className="w-full aspect-square rounded-xl overflow-hidden mb-2 sm:mb-3 shadow-sm">
                              <img src={song.cover} alt={song.title} className="w-full h-full object-cover" loading="lazy" />
                            </div>
                            <h3 className="font-medium text-xs sm:text-sm mb-0.5 sm:mb-1 truncate text-gray-800">{song.title}</h3>
                            <p className="text-xs text-neutral-500 truncate">{song.artist}</p>
                          </div>
                        ))}
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          )}
          
          {/* Now playing bar - fixed at bottom of container */}
          <div className="flex-shrink-0 bg-none">
            <MemoizedNowPlayingBar
              currentSong={currentSong}
              isPlaying={isPlaying}
              progress={progress}
              duration={duration}
              volume={volume}
              onPlayPause={handlePlayPause}
              onNext={nextSong}
              onPrevious={previousSong}
              onProgressChange={handleProgressChange}
              onVolumeChange={handleVolumeChange}
              onExpand={handleExpandCard}
            />
          </div>
        </div>
      </div>
      
      {/* Expanded Song Card */}
      {showExpandedCard && currentSong && (
        <ExpandedSongCard
          song={currentSong}
          isPlaying={isPlaying}
          progress={progress}
          duration={duration}
          volume={volume}
          progressPercentage={(progress / duration) * 100}
          suggestedSongs={getSuggestedSongs()}
          onPlayPause={handlePlayPause}
          onNext={nextSong}
          onPrevious={previousSong}
          onProgressChange={handleProgressChange}
          onVolumeChange={handleVolumeChange}
          onClose={handleCloseExpandedCard}
          onSelectSong={handleSongSelect}
          onShuffleToggle={handleShuffleToggle}
          onRepeatModeChange={handleRepeatModeChange}
          isShuffleOn={isShuffleOn}
          repeatMode={repeatMode}
        />
      )}
    </div>
  );
}
