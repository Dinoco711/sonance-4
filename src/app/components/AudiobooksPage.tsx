import React, { useState } from 'react';

interface AudiobooksPageProps {
  onClose: () => void;
  onSongSelect: (index: number) => void;
}

// Sample audiobook data for demo
const audiobooks = [
  {
    id: 1,
    title: "The Silent Patient",
    author: "Alex Michaelides",
    cover: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?q=80&w=1000&auto=format&fit=crop",
    genre: "Thriller",
    rating: 4.8,
    duration: "8h 43m",
    narrator: "Louise Brealey, Jack Hawkins",
    synopsis: "A woman shoots her husband five times and then never speaks again. A criminal psychotherapist is determined to unravel the mystery."
  },
  {
    id: 2,
    title: "Atomic Habits",
    author: "James Clear",
    cover: "https://images.unsplash.com/photo-1589998059171-988d887df646?q=80&w=1000&auto=format&fit=crop",
    genre: "Self Help",
    rating: 4.9,
    duration: "5h 35m",
    narrator: "James Clear",
    synopsis: "An easy and proven way to build good habits and break bad ones, from leading expert on habit formation."
  },
  {
    id: 3,
    title: "Project Hail Mary",
    author: "Andy Weir",
    cover: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=1000&auto=format&fit=crop",
    genre: "Science Fiction",
    rating: 4.7,
    duration: "16h 10m",
    narrator: "Ray Porter",
    synopsis: "A lone astronaut must save the earth from disaster in this incredible new science-based thriller from the #1 New York Times bestselling author of The Martian."
  },
  {
    id: 4,
    title: "Dune",
    author: "Frank Herbert",
    cover: "https://images.unsplash.com/photo-1535905557558-afc4877a26fc?q=80&w=1000&auto=format&fit=crop",
    genre: "Science Fiction",
    rating: 4.6,
    duration: "21h 2m",
    narrator: "Scott Brick",
    synopsis: "Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides, who would become the mysterious man known as Muad'Dib."
  },
  {
    id: 5,
    title: "The Psychology of Money",
    author: "Morgan Housel",
    cover: "https://images.unsplash.com/photo-1554774853-719586f82d77?q=80&w=1000&auto=format&fit=crop",
    genre: "Finance",
    rating: 4.7,
    duration: "5h 48m",
    narrator: "Chris Hill",
    synopsis: "Timeless lessons on wealth, greed, and happiness doing well with money isn't necessarily about what you know. It's about how you behave."
  },
  {
    id: 6,
    title: "The Midnight Library",
    author: "Matt Haig",
    cover: "https://images.unsplash.com/photo-1512820790803-83ca734da794?q=80&w=1000&auto=format&fit=crop",
    genre: "Fiction",
    rating: 4.5,
    duration: "8h 50m",
    narrator: "Carey Mulligan",
    synopsis: "Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived."
  }
];

// Sample categories
const categories = [
  { id: 1, name: "Fiction", count: 145, color: "from-emerald-400 to-teal-500" },
  { id: 2, name: "Non-Fiction", count: 98, color: "from-blue-400 to-indigo-500" },
  { id: 3, name: "Science Fiction", count: 67, color: "from-violet-400 to-purple-500" },
  { id: 4, name: "Mystery", count: 53, color: "from-rose-400 to-pink-500" },
  { id: 5, name: "Self Help", count: 42, color: "from-amber-400 to-orange-500" },
  { id: 6, name: "Biography", count: 38, color: "from-cyan-400 to-sky-500" }
];

const AudiobooksPage: React.FC<AudiobooksPageProps> = ({ onClose, onSongSelect }) => {
  const [selectedBook, setSelectedBook] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  const filteredBooks = searchQuery
    ? audiobooks.filter(book => 
        book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        book.author.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : audiobooks;
    
  const currentBook = selectedBook 
    ? audiobooks.find(book => book.id === selectedBook) 
    : null;

  return (
    <div className="flex-1 overflow-y-auto overflow-x-hidden custom-scrollbar">
      {/* Header */}
      <div className="relative overflow-hidden h-72 bg-gradient-to-r from-cyan-800 to-teal-600">
        <div className="absolute inset-0 overflow-hidden opacity-20">
          <div className="absolute inset-0 flex items-center justify-around">
            {Array(7).fill(0).map((_, i) => (
              <div 
                key={i} 
                className="h-full w-1 bg-white transform rotate-12"
                style={{
                  opacity: 0.1 + (i * 0.1),
                  marginLeft: `${i * 50}px`
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
          <div className="mr-6 bg-teal-700 rounded-xl p-4 shadow-lg">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-14 h-14 text-white">
              <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
            </svg>
          </div>
          <div>
            <div className="text-white text-sm font-medium mb-1">LIBRARY</div>
            <h1 className="text-white text-5xl font-bold mb-3">Audiobooks</h1>
            <div className="flex items-center text-white/80 text-sm">
              <span className="font-medium">{audiobooks.length} titles</span>
              <span className="mx-1">•</span>
              <span>{categories.length} categories</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Content */}
      <div className="p-6 bg-gradient-to-b from-teal-800/10 to-neutral-50/0">
        {/* Search */}
        <div className="relative mb-8 max-w-xl">
          <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 text-neutral-400">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
            </svg>
          </div>
          <input
            type="text"
            placeholder="Search by title, author, or narrator"
            className="pl-10 pr-4 py-3 w-full bg-white text-neutral-800 rounded-xl border-none focus:outline-none focus:ring-2 focus:ring-teal-300 text-sm shadow-sm"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        {selectedBook && currentBook ? (
          <div>
            <button 
              onClick={() => setSelectedBook(null)}
              className="flex items-center text-teal-700 mb-6 font-medium"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 mr-1">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Back to audiobooks
            </button>
            
            <div className="flex flex-col md:flex-row gap-10">
              <div className="w-full md:w-1/3 max-w-xs">
                <div className="bg-white p-6 rounded-2xl shadow-md">
                  <div className="w-full aspect-[2/3] rounded-xl overflow-hidden shadow-lg mb-5">
                    <img 
                      src={currentBook.cover}
                      alt={currentBook.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-500 mr-1">
                        <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                      </svg>
                      <span className="font-medium text-sm">{currentBook.rating}/5.0</span>
                    </div>
                    <span className="text-sm text-neutral-500">{currentBook.duration}</span>
                  </div>
                  
                  <h2 className="text-xl font-bold mb-1 text-gray-800">{currentBook.title}</h2>
                  <p className="text-neutral-500 mb-6">By {currentBook.author}</p>
                  
                  <div className="flex flex-col gap-4">
                    <button className="w-full py-3 bg-teal-600 hover:bg-teal-700 text-white font-medium rounded-xl transition-colors flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 mr-2">
                        <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                      </svg>
                      Play Sample
                    </button>
                    <button className="w-full py-3 border border-neutral-200 hover:bg-neutral-50 text-neutral-800 font-medium rounded-xl transition-colors flex items-center justify-center">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mr-2">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                      </svg>
                      Add to Library
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="flex-1">
                <div className="bg-white p-6 rounded-2xl shadow-md mb-8">
                  <h3 className="font-semibold mb-4 text-gray-800">About this audiobook</h3>
                  <p className="text-neutral-700 mb-6">{currentBook.synopsis}</p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <h4 className="text-sm text-neutral-500 mb-1">Narrator</h4>
                      <p className="font-medium">{currentBook.narrator}</p>
                    </div>
                    <div>
                      <h4 className="text-sm text-neutral-500 mb-1">Genre</h4>
                      <p className="font-medium">{currentBook.genre}</p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold mb-4 text-gray-800">Similar audiobooks you might enjoy</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {audiobooks
                      .filter(book => book.id !== currentBook.id && book.genre === currentBook.genre)
                      .slice(0, 3)
                      .map(book => (
                        <div 
                          key={book.id}
                          className="bg-white p-3 rounded-xl shadow-sm hover:shadow-md transition-all cursor-pointer"
                          onClick={() => setSelectedBook(book.id)}
                        >
                          <div className="flex">
                            <img 
                              src={book.cover}
                              alt={book.title}
                              className="w-16 h-24 object-cover rounded-lg"
                            />
                            <div className="ml-3">
                              <h4 className="font-medium text-sm mb-1 text-gray-800">{book.title}</h4>
                              <p className="text-xs text-neutral-500 mb-1">{book.author}</p>
                              <div className="flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-500 mr-0.5">
                                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                                </svg>
                                <span className="text-xs text-neutral-600">{book.rating}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Categories */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Categories</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5 mb-10">
                {categories.map(category => (
                  <div 
                    key={category.id} 
                    className="bg-white rounded-xl p-4 shadow-sm hover:shadow-md transition-all cursor-pointer relative overflow-hidden group"
                  >
                    <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-15 transition-opacity`}></div>
                    <h3 className="font-semibold mb-1 text-gray-800 relative z-10 group-hover:text-gray-900">{category.name}</h3>
                    <p className="text-sm text-neutral-600 relative z-10 group-hover:text-neutral-700">{category.count} titles</p>
                  </div>
                ))}
              </div>
            </div>
          
            {/* Featured Audiobooks */}
            <div className="mb-10">
              <h2 className="text-xl font-semibold mb-6 text-gray-800">Popular Audiobooks</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 mb-10">
                {filteredBooks.map(book => (
                  <div 
                    key={book.id} 
                    className="group cursor-pointer"
                    onClick={() => setSelectedBook(book.id)}
                  >
                    <div className="bg-white p-3 rounded-xl shadow-sm group-hover:shadow-md transition-all">
                      <div className="aspect-[2/3] rounded-lg overflow-hidden mb-3 shadow-sm relative">
                        <img 
                          src={book.cover}
                          alt={book.title}
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          loading="lazy"
                        />
                        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-40 transition-opacity flex items-center justify-center">
                          <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center transform scale-0 group-hover:scale-100 transition-transform duration-300">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 text-white">
                              <path fillRule="evenodd" d="M4.5 5.653c0-1.426 1.529-2.33 2.779-1.643l11.54 6.348c1.295.712 1.295 2.573 0 3.285L7.28 19.991c-1.25.687-2.779-.217-2.779-1.643V5.653z" clipRule="evenodd" />
                            </svg>
                          </div>
                        </div>
                      </div>
                      <h3 className="font-medium text-sm mb-1 truncate text-gray-800">{book.title}</h3>
                      <p className="text-xs text-neutral-500 truncate">{book.author}</p>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-yellow-500 mr-1">
                            <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                          </svg>
                          <span className="text-xs">{book.rating}</span>
                        </div>
                        <span className="text-xs text-neutral-500">{book.duration}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recently Added */}
            <div>
              <h2 className="text-xl font-semibold mb-6 text-gray-800">New Releases</h2>
              <div className="bg-white rounded-xl shadow-sm overflow-hidden divide-y divide-neutral-100">
                {audiobooks.slice(0, 5).map(book => (
                  <div 
                    key={book.id} 
                    className="flex p-4 hover:bg-neutral-50 cursor-pointer transition-colors"
                    onClick={() => setSelectedBook(book.id)}
                  >
                    <div className="w-12 h-16 rounded overflow-hidden mr-4 flex-shrink-0 shadow-sm">
                      <img 
                        src={book.cover}
                        alt={book.title}
                        className="w-full h-full object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-sm mb-1 truncate text-gray-800">{book.title}</h3>
                      <p className="text-xs text-neutral-500 mb-1">{book.author}</p>
                      <div className="flex items-center gap-3">
                        <span className="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                          {book.genre}
                        </span>
                        <span className="text-xs text-neutral-500">{book.duration}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <button className="text-neutral-400 hover:text-teal-600 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                        </svg>
                      </button>
                      <button className="text-neutral-400 hover:text-neutral-700 transition-colors">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM12.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0ZM18.75 12a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AudiobooksPage; 