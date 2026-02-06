'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Paperclip,
  Settings2,
  Music4,
  ChevronDown,
  ArrowRight,
  AudioLines,
  Plus
} from 'lucide-react';
import clsx from 'clsx';

interface PromptBoxProps {
  onSubmit: (prompt: string) => void;
  isGenerating: boolean;
}

export default function PromptBox({ onSubmit, isGenerating }: PromptBoxProps) {
  const [prompt, setPrompt] = useState('');
  const [isFirstRender, setIsFirstRender] = useState(true);

  useEffect(() => {
    setIsFirstRender(false);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (prompt.trim() && !isGenerating) {
      onSubmit(prompt.trim());
      setPrompt('');
    }
  };

  return (
    <motion.div
      initial={isFirstRender ? { scale: 0.98, opacity: 0 } : false}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className='w-full relative'
    >
      {/* Animated shadow layer */}
      <div
        className='absolute inset-0 rounded-3xl'
        style={{
          background:
            'linear-gradient(90deg, #FF7B16 0%, rgba(255, 107, 44, 0.4) 25%, rgba(255, 0, 128, 0.8) 50%, #FF7B16 75%, #FF7B16 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradient-slide 4s ease-in-out infinite',
          filter: 'blur(12px)',
          transform: 'translateY(8px)',
          zIndex: -1
        }}
      />

      {/* Border gradient layer */}
      <div
        className='w-full rounded-3xl p-[2px]'
        style={{
          background:
            'linear-gradient(90deg, #FF7B16 0%, rgba(255, 107, 44, 0.4) 25%, rgba(255, 0, 128, 0.8) 50%, #FF7B16 75%, #FF7B16 100%)',
          backgroundSize: '200% 100%',
          animation: 'gradient-slide 4s ease-in-out infinite'
        }}
      >
        <form onSubmit={handleSubmit} className='relative'>
          <motion.div
            initial={isFirstRender ? { scale: 0.98, opacity: 0 } : false}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            className={clsx(
              'relative rounded-[22px] overflow-hidden bg-primary-200'
            )}
          >
            <div className='relative p-6'>
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                disabled={isGenerating}
                placeholder='Describe your song'
                rows={1}
                className={clsx(
                  'w-full max-h-[160px] bg-transparent border-none outline-none resize-none',
                  'text-text-primary text-lg placeholder:text-text-secondary',
                  'disabled:opacity-50 disabled:cursor-not-allowed'
                )}
              />
            </div>

            <div className='relative p-3'>
              {/* Action Bar */}
              <div className='flex items-center justify-between'>
                <div className='flex items-center gap-2'>
                  <button
                    type='button'
                    disabled={isGenerating}
                    className='w-10 h-10 -rotate-45 rounded-full flex items-center justify-center text-primary-1200 transition-colors disabled:opacity-50 hover:bg-background-hover-light border border-1 border-border-primary-100'
                    title='Attach file'
                  >
                    <Paperclip size='20px' color='white' />
                  </button>

                  <button
                    type='button'
                    disabled={isGenerating}
                    className='w-10 h-10 rounded-full flex items-center justify-center text-primary-1200 transition-colors disabled:opacity-50 hover:bg-background-hover-light border border-1 border-border-primary-100'
                    title='Attach file'
                  >
                    <Settings2 size='20px' color='white' />
                  </button>

                  <button
                    type='button'
                    disabled={isGenerating}
                    className='w-10 h-10 rounded-full flex items-center justify-center text-primary-1200 transition-colors disabled:opacity-50 hover:bg-background-hover-light border border-1 border-border-primary-100'
                    title='Attach file'
                  >
                    <AudioLines size='20px' color='white' />
                  </button>

                  <button
                    type='button'
                    disabled={isGenerating}
                    className='px-4 py-2 rounded-full flex items-center gap-2 text-white transition-colors disabled:opacity-50 hover:bg-background-hover-light border border-1 border-border-primary-100'
                  >
                    <Plus size='16px' />
                    <span className='text-sm font-semibold leading-[160%] tracking-1'>
                      Lyrics
                    </span>
                  </button>
                </div>

                <div className='flex items-center gap-3'>
                  <button
                    type='button'
                    disabled={isGenerating}
                    className='px-4 py-2 rounded-full flex items-center gap-2 text-white transition-colors disabled:opacity-50 hover:bg-background-hover-light border border-1 border-border-primary-100'
                  >
                    <span className='text-sm font-semibold leading-[160%] tracking-1'>
                      Tools
                    </span>
                    <ChevronDown size='16px' />
                  </button>

                  <button
                    type='submit'
                    disabled={!prompt.trim() || isGenerating}
                    className={clsx(
                      'w-9 h-9 rounded-full flex items-center justify-center transition-all bg-primary-600',
                      prompt.trim() && !isGenerating
                        ? 'bg-white hover:scale-105'
                        : 'bg-background-hover text-text-muted cursor-not-allowed'
                    )}
                  >
                    <ArrowRight
                      size='24px'
                      strokeWidth={2.5}
                      className='text-primary-250'
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </form>
      </div>
    </motion.div>
  );
}
