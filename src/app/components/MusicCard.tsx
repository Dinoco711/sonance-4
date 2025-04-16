'use client';

import { motion } from 'framer-motion';
import { cardVariants } from '../utils/transitions';

interface MusicCardProps {
  imageUrl: string;
  title: string;
  artist: string;
  onClick: () => void;
}

export default function MusicCard({ imageUrl, title, artist, onClick }: MusicCardProps) {
  return (
    <motion.div 
      className="flex-shrink-0 w-36 cursor-pointer"
      onClick={onClick}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
      whileTap="tap"
    >
      <motion.div className="rounded-lg overflow-hidden mb-2 relative">
        <div className="absolute inset-0 bg-[#a1d4f7]">
          {/* Clouds overlay */}
          <div className="absolute w-full h-full left-0 top-0">
            <div className="absolute top-[20%] left-[15%] bg-white w-12 h-5 rounded-full opacity-90"></div>
            <div className="absolute top-[30%] left-[30%] bg-white w-8 h-3 rounded-full opacity-90"></div>
          </div>
          {/* Green hills */}
          <div className="absolute bottom-0 w-full">
            <svg viewBox="0 0 500 150" preserveAspectRatio="none" className="w-full h-24">
              <path d="M0,150 C150,100 300,100 500,150 L500,150 L0,150 Z" className="fill-[#a6d189]"></path>
            </svg>
          </div>
        </div>
        {/* Create correct aspect ratio */}
        <div className="pt-[75%]"></div>
      </motion.div>
      <motion.h3 
        className="font-medium text-sm truncate text-gray-800"
        transition={{ delay: 0.05 }}
      >{title}</motion.h3>
      <motion.p 
        className="text-xs text-gray-600 truncate"
        transition={{ delay: 0.1 }}
      >{artist}</motion.p>
    </motion.div>
  );
} 