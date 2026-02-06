'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  User,
  ChevronDown,
  Clock,
  Music,
  Loader2,
  Settings,
  Info,
  ChevronRight
} from 'lucide-react';
import { useGenerationStore } from '@/store/generationStore';
import ErrorCard from './ErrorCard';
import GeneratingCard from './GeneratingCard';

export default function ProfilePopup() {
  const [isOpen, setIsOpen] = useState(false);
  const popupRef = useRef<HTMLDivElement>(null);
  const generations = useGenerationStore((state) => state.generations);
  const recentGenerations = generations.slice(0, 5);
  const newestCompletedId = useGenerationStore(
    (state) => state.newestCompletedId
  );

  // Handle click outside to close popup
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        popupRef.current &&
        !popupRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      // Use setTimeout to avoid immediately closing on the same click that opened it
      setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside);
      }, 0);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className='relative' ref={popupRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className='relative w-[40px] h-[40px] rounded-full transition-all'
        style={{
          border: '2px solid transparent',
          background:
            'linear-gradient(rgb(10 12 13), rgb(10 12 13)) padding-box, linear-gradient( 314.53deg, #C800FF 17.23%, #FF2C9B 38.51%, #FF7B00 66.07%, #FF8504 78.98%, #FFD363 87% ) border-box'
        }}
      >
        <span className='uppercase text-2xl font-medium text-white'>J</span>

        {/* Generation Count Badge - Top Right */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{
            scale: 1,
            boxShadow: [
              '0 0 0 1px rgba(34, 197, 94, 0.3), 0 0 0 2px rgba(34, 197, 94, 0.15)',
              '0 0 0 2px rgba(34, 197, 94, 0.4), 0 0 0 4px rgba(34, 197, 94, 0.2)',
              '0 0 0 1px rgba(34, 197, 94, 0.3), 0 0 0 2px rgba(34, 197, 94, 0.15)'
            ]
          }}
          transition={{
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }
          }}
          className='absolute -top-1 -right-2 min-w-[16px] h-4 px-1.5 bg-green-500 rounded-full flex items-center justify-center'
        >
          <span className='font-semibold text-[10px] text-text-primary-100'>
            {generations.length}
          </span>
        </motion.div>
      </button>

      <AnimatePresence mode='wait'>
        {isOpen ? (
          <motion.div
            key='popup'
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95, pointerEvents: 'none' }}
            transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
            className='absolute top-full right-0 mt-2 w-[400px] bg-background-card border-2 border-border rounded-[20px] shadow-2xl z-[70] overflow-hidden px-4 py-5'
          >
            <div className='flex flex-col gap-5 border-b border-border pb-5'>
              <div className='flex items-center gap-3'>
                {/* Avatar */}
                <div
                  className='w-[60px] h-[60px] rounded-full text-center flex align-middle items-center justify-center flex-shrink-0'
                  style={{
                    border: '2px solid transparent',
                    background:
                      'linear-gradient(rgb(10 12 13), rgb(10 12 13)) padding-box, linear-gradient( 314.53deg, #C800FF 17.23%, #FF2C9B 38.51%, #FF7B00 66.07%, #FF8504 78.98%, #FFD363 87% ) border-box'
                  }}
                >
                  <span className='uppercase text-xl font-normal leading-[100%] text-white'>
                    J
                  </span>
                </div>
                <div className='flex flex-col gap-1 flex-1'>
                  <p className='text-primary-5000 font-medium text-base'>
                    Johnny
                  </p>
                  <p className='text-primary-1100 text-sm'>@johnny</p>
                </div>
                <div className='text-primary-1000 flex-shrink-0'>
                  <Settings size='24px' />
                </div>
              </div>

              {/* Credits Section */}
              <button className='flex items-center justify-between p-4 bg-primary-250 rounded-xl'>
                <div className='flex items-center gap-2'>
                  <span className='text-primary-5000 text-sm font-semibold'>
                    120/500 credits
                  </span>
                  <Info size='18px' className='text-primary-1000' />
                </div>
                <div className='flex items-center gap-2 text-primary-1000 hover:text-white transition-colors'>
                  <span className='text-sm font-medium'>Top Up</span>
                  <ChevronRight size='16px' />
                </div>
              </button>
            </div>

            <div className='max-h-96 min-h-[150px] overflow-y-auto flex flex-col gap-1 pt-1'>
              {recentGenerations.map((generation) => (
                <motion.div
                  key={generation.id}
                  layout
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                >
                  {generation.status === 'failed' && (
                    <ErrorCard
                      error={
                        generation.error || 'Server timeout - please try again.'
                      }
                      onClick={() => {}}
                    />
                  )}
                  {generation.status === 'completed' &&
                    generation.tracks &&
                    generation.tracks.length > 0 && (
                      <>
                        {generation.tracks.map((track, index) => {
                          const isNewestCompleted =
                            generation.id === newestCompletedId;
                          return (
                            <GeneratingCard
                              key={track.id}
                              progress={100}
                              prompt={generation.prompt}
                              trackIndex={generation.trackIndex || index + 1}
                              totalTracks={
                                generation.totalTracks ||
                                generation.tracks!.length
                              }
                              isCompleted={true}
                              track={track}
                              isNew={isNewestCompleted}
                            />
                          );
                        })}
                      </>
                    )}
                  {generation.status === 'generating' && (
                    <GeneratingCard
                      progress={generation.progress}
                      prompt={generation.prompt}
                      trackIndex={generation.trackIndex}
                      totalTracks={generation.totalTracks}
                      isCompleted={false}
                    />
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}
