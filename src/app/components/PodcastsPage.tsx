import React, { useState } from 'react';
import Image from 'next/image';
import { songs } from '../data/songs';

interface PodcastsPageProps {
  onClose: () => void;
}

// For demo, create some podcast data
const podcasts = [
  {
    id: 1,
    title: "Tech Today",
    host: "Alex Morgan",
    cover: "https://images.unsplash.com/photo-1589903308904-1010c2294adc?q=80&w=1000&auto=format&fit=crop",
    episodes: 45,
    category: "Technology",
    description: "The latest in tech news and innovations",
    latestEpisode: "The Future of AI in Everyday Life"
  },
  {
    id: 2,
    title: "Music Unplugged",
    host: "Jamie Smith",
    cover: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop",
    episodes: 89,
    category: "Music",
    description: "Behind the scenes with your favorite artists",
    latestEpisode: "Exploring Jazz Influences in Modern Pop"
  },
  {
    id: 3,
    title: "Daily Mindfulness",
    host: "Sarah Chen",
    cover: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    episodes: 124,
    category: "Health & Wellness",
    description: "Short meditations for your busy life",
    latestEpisode: "5-Minute Meditation for Focus"
  },
  {
    id: 4,
    title: "History Revealed",
    host: "Daniel Torres",
    cover: "https://images.unsplash.com/photo-1461360370896-922624d12aa1?q=80&w=1000&auto=format&fit=crop",
    episodes: 67,
    category: "History",
    description: "Untold stories from the past",
    latestEpisode: "Lost Civilizations: Mysteries Solved"
  },
  {
    id: 5,
    title: "Entrepreneur Journey",
    host: "Linda Wang",
    cover: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?q=80&w=1000&auto=format&fit=crop",
    episodes: 52,
    category: "Business",
    description: "Stories from successful business founders",
    latestEpisode: "From Startup to IPO: The Full Story"
  },
  {
    id: 6,
    title: "Science Explorers",
    host: "Dr. Michael Lee",
    cover: "https://images.unsplash.com/photo-1507413245164-6160d8298b31?q=80&w=1000&auto=format&fit=crop",
    episodes: 78,
    category: "Science",
    description: "Making complex science accessible to everyone",
    latestEpisode: "Black Holes: What We Now Know"
  }
];

// Generate episodes using song data for demo purposes
const generateEpisodes = () => {
  return songs.slice(0, 10).map((song, idx) => ({
    id: idx + 1,
    title: `${song.title} - Discussion`,
    duration: `${Math.floor(Math.random() * 40) + 20}:${Math.floor(Math.random() * 60).toString().padStart(2, '0')}`,
    date: `${Math.floor(Math.random() * 28) + 1}/${Math.floor(Math.random() * 12) + 1}/2023`,
    description: `In this episode, we explore the making of "${song.title}" by ${song.artist} and its impact on the music industry.`,
    listened: Math.random() > 0.7
  }));
};

const PodcastsPage: React.FC<PodcastsPageProps> = ({ onClose }) => {
  const [selectedTab, setSelectedTab] = useState<'shows' | 'episodes' | 'downloads'>('shows');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedPodcast, setSelectedPodcast] = useState<number | null>(null);
  
  const filteredPodcasts = selectedCategory 
    ? podcasts.filter(podcast => podcast.category === selectedCategory) 
    : podcasts;
  
  const categories = Array.from(new Set(podcasts.map(p => p.category)));
  
  const currentPodcast = selectedPodcast !== null 
    ? podcasts.find(p => p.id === selectedPodcast) 
    : null;

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
      {/* Header */}
      <div className="relative overflow-hidden h-72 bg-gradient-to-r from-purple-900 to-violet-700">
        <div className="absolute inset-0 overflow-hidden opacity-20 pointer-events-none">
          <div className="absolute inset-0">
            {Array(8).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="absolute rounded-full bg-white"
                style={{
                  width: `${Math.random() * 300 + 50}px`,
                  height: `${Math.random() * 300 + 50}px`,
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  opacity: Math.random() * 0.4,
                  transform: `scale(${Math.random() * 0.5 + 0.5})`,
                  animation: `pulse ${Math.random() * 4 + 3}s infinite alternate`,
                  willChange: 'transform, opacity'
                }}
              ></div>
            ))}
          </div>
        </div>
        
        <div className="absolute top-0 left-0 p-6">
          <button 
            onClick={onClose}
            className="p-2 bg-white/10 hover:bg-white/20 rounded-full text-white transition-colors"
            aria-label="Go back"
          >
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
            </svg>
          </button>
        </div>
        
        <div className="absolute bottom-0 left-0 p-8 flex items-end">
          <div className="mr-6 bg-purple-800 rounded-xl p-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-white">
              <path d="M8.25 4.5a3.75 3.75 0 117.5 0v8.25a3.75 3.75 0 11-7.5 0V4.5z" />
              <path d="M6 10.5a.75.75 0 01.75.75v1.5a5.25 5.25 0 1010.5 0v-1.5a.75.75 0 011.5 0v1.5a6.751 6.751 0 01-6 6.709v2.291h3a.75.75 0 010 1.5h-7.5a.75.75 0 010-1.5h3v-2.291a6.751 6.751 0 01-6-6.709v-1.5A.75.75 0 016 10.5z" />
            </svg>
          </div>
          <div>
            <div className="text-white text-sm font-medium mb-1">EXPLORE</div>
            <h1 className="text-white text-5xl font-bold mb-3">Podcasts</h1>
            <div className="flex items-center text-white/80 text-sm">
              <span className="font-medium">Available shows</span>
              <span className="mx-1">•</span>
              <span>{podcasts.length} podcasts</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 bg-gradient-to-b from-purple-900/10 to-neutral-50/0">
        {/* Tabs */}
        <div className="flex items-center gap-1 mb-8 border-b border-neutral-200">
          <button 
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              selectedTab === 'shows' 
                ? 'text-purple-700' 
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
            onClick={() => {
              setSelectedTab('shows');
              setSelectedPodcast(null);
            }}
          >
            Shows
            {selectedTab === 'shows' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-700"></div>
            )}
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              selectedTab === 'episodes' 
                ? 'text-purple-700' 
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
            onClick={() => {
              setSelectedTab('episodes');
              setSelectedPodcast(null);
            }}
          >
            Episodes
            {selectedTab === 'episodes' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-700"></div>
            )}
          </button>
          <button 
            className={`px-4 py-3 font-medium text-sm transition-colors relative ${
              selectedTab === 'downloads' 
                ? 'text-purple-700' 
                : 'text-neutral-500 hover:text-neutral-800'
            }`}
            onClick={() => {
              setSelectedTab('downloads');
              setSelectedPodcast(null);
            }}
          >
            Downloads
            {selectedTab === 'downloads' && (
              <div className="absolute bottom-0 left-0 w-full h-0.5 bg-purple-700"></div>
            )}
          </button>
        </div>
        
        {/* Selected Podcast View */}
        {selectedPodcast !== null && currentPodcast ? (
          <div>
            <button 
              onClick={() => setSelectedPodcast(null)}
              className="flex items-center text-purple-700 mb-6 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to {selectedTab}
            </button>
            
            <div className="flex flex-col md:flex-row gap-8 mb-10">
              <div className="w-full md:w-60 flex-shrink-0">
                <div className="w-60 h-60 rounded-xl overflow-hidden shadow-lg mb-4">
                  <Image 
                    src={currentPodcast.cover} 
                    alt={currentPodcast.title}
                    width={500}
                    height={500}
                    className="w-full h-full object-cover"
                    style={{ objectFit: 'cover' }}
                  />
                </div>
                <h2 className="text-xl font-bold mb-1 text-gray-800">{currentPodcast.title}</h2>
                <p className="text-sm text-neutral-500 mb-3">{currentPodcast.host}</p>
                
                <div className="flex gap-2 mb-4">
                  <button className="px-5 py-2.5 bg-purple-700 text-white rounded-full font-medium text-sm hover:bg-purple-800 transition-colors flex items-center">
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-1.5">
                      <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                    </svg>
                    Follow
                  </button>
                  <button className="p-2.5 border border-neutral-200 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
                    </svg>
                  </button>
                </div>
                
                <div className="bg-neutral-50 p-4 rounded-xl">
                  <h3 className="font-medium text-sm mb-2 text-gray-800">About</h3>
                  <p className="text-sm text-neutral-600 mb-3">{currentPodcast.description}</p>
                  <div className="flex items-center text-xs text-neutral-500">
                    <span className="font-medium">{currentPodcast.episodes} episodes</span>
                    <span className="mx-1">•</span>
                    <span>{currentPodcast.category}</span>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-4">All Episodes</h3>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-neutral-100">
                  {generateEpisodes().map((episode) => (
                    <div 
                      key={episode.id} 
                      className="p-4 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-purple-700">
                            <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <h4 className="font-medium text-sm truncate text-gray-800">{episode.title}</h4>
                            {episode.listened && (
                              <span className="bg-neutral-100 text-neutral-600 text-xs px-2 py-0.5 rounded-full">Played</span>
                            )}
                          </div>
                          <div className="static-text">
                            <p className="text-xs text-gray-500">{episode.date}</p>
                            <p className="text-xs text-gray-500">{episode.duration}</p>
                          </div>
                        </div>
                        <button className="text-neutral-400 hover:text-neutral-700 transition-colors">
                          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                          </svg>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {selectedTab === 'shows' && (
              <>
                {/* Category filters */}
                <div className="flex items-center gap-3 mb-8 overflow-x-auto pb-2 scrollbar-hide">
                  <button 
                    className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                      selectedCategory === null 
                        ? 'bg-purple-700 text-white' 
                        : 'bg-white text-neutral-700 hover:bg-neutral-100'
                    } transition-colors`}
                    onClick={() => setSelectedCategory(null)}
                  >
                    All Categories
                  </button>
                  {categories.map((category, index) => (
                    <button 
                      key={index}
                      className={`px-4 py-2 rounded-full font-medium text-sm whitespace-nowrap ${
                        selectedCategory === category 
                          ? 'bg-purple-700 text-white' 
                          : 'bg-white text-neutral-700 hover:bg-neutral-100'
                      } transition-colors`}
                      onClick={() => setSelectedCategory(category)}
                    >
                      {category}
                    </button>
                  ))}
                </div>
                
                {/* Trending shows grid */}
                <div className="mb-10">
                  <h2 className="text-xl font-semibold mb-5">Trending Shows</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filteredPodcasts.map((podcast) => (
                      <div 
                        key={podcast.id} 
                        className="bg-white p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all hover:-translate-y-1"
                        onClick={() => setSelectedPodcast(podcast.id)}
                      >
                        <div className="w-full aspect-square rounded-lg overflow-hidden mb-3 shadow-sm">
                          <Image 
                            src={podcast.cover} 
                            alt={podcast.title}
                            width={300}
                            height={300}
                            className="w-full h-full object-cover"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                          />
                        </div>
                        <h3 className="font-medium text-sm mb-1 truncate text-gray-800">{podcast.title}</h3>
                        <p className="text-xs text-neutral-500 truncate mb-2">{podcast.host}</p>
                        <div className="text-xs flex items-center justify-between">
                          <span className="text-purple-700 font-medium">{podcast.category}</span>
                          <span className="text-neutral-500">{podcast.episodes} episodes</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Recently updated */}
                <div>
                  <h2 className="text-xl font-semibold mb-5">Recently Updated</h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
                    {filteredPodcasts.slice().reverse().slice(0, 4).map((podcast) => (
                      <div 
                        key={podcast.id} 
                        className="flex bg-white p-4 rounded-xl shadow-sm hover:shadow-md cursor-pointer transition-all"
                        onClick={() => setSelectedPodcast(podcast.id)}
                      >
                        <div className="w-16 h-16 rounded-lg overflow-hidden mr-3 flex-shrink-0">
                          <Image 
                            src={podcast.cover} 
                            alt={podcast.title}
                            width={100}
                            height={100}
                            className="w-full h-full object-cover"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                          />
                        </div>
                        <div className="min-w-0">
                          <h3 className="font-medium text-sm mb-1 truncate text-gray-800">{podcast.title}</h3>
                          <p className="text-xs text-neutral-500 truncate mb-1">{podcast.host}</p>
                          <p className="text-xs text-purple-700 font-medium truncate">{podcast.latestEpisode}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </>
            )}
            
            {selectedTab === 'episodes' && (
              <div>
                <h2 className="text-xl font-semibold mb-5">New Episodes</h2>
                <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-neutral-100">
                  {podcasts.flatMap(podcast => 
                    generateEpisodes().slice(0, 2).map(episode => ({
                      ...episode,
                      podcast
                    }))
                  ).slice(0, 10).map((item, idx) => (
                    <div 
                      key={idx} 
                      className="p-4 hover:bg-neutral-50 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg overflow-hidden flex-shrink-0">
                          <Image 
                            src={item.podcast.cover} 
                            alt={item.podcast.title}
                            width={80}
                            height={80}
                            className="w-full h-full object-cover"
                            style={{ objectFit: 'cover' }}
                            loading="lazy"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-medium text-sm mb-1 line-clamp-1 text-gray-800">{item.title}</h4>
                          <p className="text-xs text-neutral-500 line-clamp-1">
                            {item.podcast.title} • {item.podcast.host}
                          </p>
                          <div className="flex items-center text-xs text-neutral-400 mt-1">
                            <span>{item.date}</span>
                            <span className="mx-1">•</span>
                            <span>{item.duration}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-1">
                          <button className="w-8 h-8 rounded-full flex items-center justify-center bg-purple-100 text-purple-700">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                          </button>
                          <button className="text-neutral-400 hover:text-neutral-700 transition-colors">
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {selectedTab === 'downloads' && (
              <div className="text-center py-10">
                <div className="w-20 h-20 mx-auto bg-neutral-100 rounded-full flex items-center justify-center mb-4">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-10 h-10 text-neutral-400">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium mb-2">No downloads yet</h3>
                <p className="text-neutral-500 mb-6 max-w-md mx-auto">Download episodes to listen offline. They&apos;ll appear here.</p>
                <button className="px-6 py-2.5 bg-purple-700 text-white rounded-full font-medium hover:bg-purple-800 transition-colors">
                  Browse podcasts
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PodcastsPage; 