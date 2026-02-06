'use client';

import { Track } from '@/types/generation';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Play, ThumbsUp, ThumbsDown, Ellipsis } from 'lucide-react';

interface GeneratingCardProps {
  progress: number;
  prompt?: string;
  trackIndex?: number;
  totalTracks?: number;
  isCompleted?: boolean;
  isNew?: boolean;
  track?: Track;
}

export default function GeneratingCard({
  progress,
  prompt,
  trackIndex = 1,
  totalTracks = 1,
  isCompleted = false,
  isNew = false,
  track
}: GeneratingCardProps) {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Get progress message based on progress
  const getProgressMessage = (progress: number): string => {
    if (progress < 30) return 'Initializing sound models...';
    if (progress < 60) return 'Composing melodies...';
    if (progress < 90) return 'Adding harmonies...';
    return 'Finalizing your track...';
  };

  return (
    <motion.div
      className='relative flex items-center gap-3 p-2 rounded-xl overflow-visible cursor-pointer hover:bg-primary-200 transition-colors'
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      layout
    >
      {/* Green pulsating dot - only show when newly completed */}
      {isCompleted && isNew && (
        <div className='absolute left-[3px] top-[3px] z-20 flex items-center justify-center'>
          {/* Solid green dot - positioned first as the anchor */}
          <div className='w-4 h-4 rounded-full bg-green-500 shadow-lg shadow-green-500/50' />
          {/* Pulsating rings using CSS animation */}
          <span
            className='absolute w-4 h-4 rounded-full bg-green-500 animate-ping-slow'
            style={{ animationDelay: '0s' }}
          />
          <span
            className='absolute w-4 h-4 rounded-full bg-green-500 animate-ping-slow'
            style={{ animationDelay: '0.5s' }}
          />
        </div>
      )}

      {/* Background progress slider - only show when generating */}
      {!isCompleted && (
        <motion.div
          className='absolute inset-y-0 left-0 bg-primary-200 rounded-xl'
          initial={{ width: '0%' }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        />
      )}

      {/* Cover with gradient border and progress */}
      <div className='relative flex-shrink-0'>
        {/* Radial gradient border - always visible during generation, fades when image loads */}
        <motion.div
          className='absolute -inset-[1px] rounded-[16px]'
          style={{
            background:
              'radial-gradient(circle at 50% 100%, #ff6200, #aa00ff 50%, #000 100%)'
          }}
          animate={{ opacity: isCompleted && imageLoaded ? 0 : 1 }}
          transition={{ duration: 0.5 }}
        />
        <div className='relative w-[60px] h-[60px] rounded-[16px] overflow-hidden flex items-center justify-center group'>
          {/* Base dark background */}
          <div className='absolute inset-0 bg-[#1a0a2e]' />

          {/* Animated gradient layers - fade out when image loads */}
          <motion.div
            className='absolute inset-0'
            animate={{ opacity: isCompleted && imageLoaded ? 0 : 1 }}
            transition={{ duration: 0.8 }}
          >
            {/* Blurred gradient blob at bottom */}
            <motion.div
              className='absolute -bottom-4 -left-4 -right-4 h-[50px]'
              style={{
                background:
                  'linear-gradient(180deg, transparent 0%, #AA00FF 40%, #8962FF 100%)',
                filter: 'blur(20px)',
                opacity: 0.7
              }}
              animate={{
                opacity: [0.5, 0.8, 0.5]
              }}
              transition={{
                opacity: {
                  duration: 2,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
            />
            {/* Orange/pink gradient blob */}
            <motion.div
              className='absolute -bottom-2 left-1/2 -translate-x-1/2 w-[40px] h-[30px]'
              style={{
                background:
                  'radial-gradient(ellipse at center, #FF6200 0%, #AA00FF 60%, transparent 100%)',
                filter: 'blur(15px)',
                opacity: 0.6
              }}
              animate={{
                opacity: [0.4, 0.7, 0.4],
                scale: [0.9, 1.1, 0.9]
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: 'easeInOut'
              }}
            />
          </motion.div>

          {/* Progress text - fade out when image loads */}
          <motion.span
            className='relative text-white/70 text-xs font-medium z-10'
            animate={{ opacity: isCompleted && imageLoaded ? 0 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {progress}%
          </motion.span>

          {/* Cover image - fades in when loaded */}
          {isCompleted && track?.coverUrl && (
            <motion.div
              className='absolute inset-0'
              initial={{ opacity: 0 }}
              animate={{ opacity: imageLoaded ? 1 : 0 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
            >
              <Image
                src={track.coverUrl}
                alt={track.title || 'Cover'}
                width={60}
                height={60}
                className='w-full h-full object-cover'
                onLoad={() => setImageLoaded(true)}
              />
              {/* Play button overlay on hover */}
              <div
                className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity'
                style={{ opacity: isHovered ? '1' : 0 }}
              >
                <Play className='w-6 h-6 text-white fill-white' />
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Text content */}
      <motion.div
        className='relative flex-1 min-w-0 overflow-hidden'
        animate={{ flex: isCompleted && isHovered ? '0 1 auto' : '1 1 0%' }}
        transition={{ duration: 0.2 }}
      >
        <p className='text-primary-5000 text-base font-normal truncate mb-1'>
          {isCompleted && track?.title ? track.title : prompt || 'Untitled'}
        </p>
        <p className='text-primary-1100 text-sm font-normal truncate'>
          {isCompleted
            ? prompt || 'No description'
            : getProgressMessage(progress)}
        </p>
      </motion.div>

      {/* Version badge - always visible when not completed */}
      {!isCompleted && (
        <div className='relative px-3 h-[26px] flex items-center rounded-[10px] border border-primary-800 flex-shrink-0'>
          <span className='text-xs font-medium text-primary-1200'>
            v{trackIndex}
          </span>
        </div>
      )}

      {/* Action buttons - visible on hover when completed */}
      {isCompleted && (
        <motion.div
          initial={{ opacity: 0, width: 0 }}
          animate={{
            opacity: isHovered ? 1 : 0,
            width: isHovered ? 'auto' : 0
          }}
          transition={{ duration: 0.2 }}
          className='flex items-center gap-4 overflow-hidden flex-shrink-0 ml-auto'
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='flex items-center justify-center'
          >
            <ThumbsUp
              className='text-white hover:text-white transition-colors'
              size='24px'
            />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='flex items-center justify-center'
          >
            <ThumbsDown
              className='text-primary-800 hover:text-white transition-colors'
              size='24px'
            />
          </button>
          <div className='px-3 h-[26px] flex items-center rounded-[10px] border border-primary-800 hover:bg-background-hover-light'>
            <span className='text-xs font-medium text-primary-1200'>
              v{trackIndex}
            </span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
            }}
            className='flex items-center justify-center'
          >
            <Ellipsis
              className='text-primary-800 hover:text-white transition-colors'
              size='24px'
            />
          </button>
        </motion.div>
      )}
    </motion.div>
  );
}
