'use client';

import { useState, useCallback } from 'react';
import { useGenerationStore } from '@/store/generationStore';
import { useWebSocket } from '@/hooks/useWebSocket';
import { Generation } from '@/types/generation';
import Sidebar from '@/components/Sidebar';
import PromptBox from '@/components/PromptBox';
import RecentGenerations from '@/components/RecentGenerations';
import ProfilePopup from '@/components/ProfilePopup';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Create() {
  const [isGenerating, setIsGenerating] = useState(false);
  const addGeneration = useGenerationStore((state) => state.addGeneration);

  // Initialize WebSocket connection
  useWebSocket();

  const handlePromptSubmit = useCallback(
    async (prompt: string) => {
      setIsGenerating(true);

      try {
        const response = await fetch('/api/generate', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ prompt })
        });

        if (!response.ok) {
          throw new Error('Failed to start generation');
        }

        const data = await response.json();

        const newGeneration: Generation = {
          id: data.id,
          prompt: data.prompt,
          status: 'generating',
          progress: 0,
          createdAt: new Date(data.createdAt)
        };

        addGeneration(newGeneration);
      } catch (error) {
        console.error('Generation error:', error);
        alert('Failed to start generation. Please try again.');
      } finally {
        setIsGenerating(false);
      }
    },
    [addGeneration]
  );

  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className='relative flex-1 ml-[200px]'>
        {/* Header */}
        <div className='fixed top-0 right-0 z-50'>
          <div className='relative'>
            <div className='absolute top-4 right-4'>
              <ProfilePopup />
            </div>
          </div>
        </div>

        {/* Content */}
        <div className='absolute w-full top-[100px] xl:top-[150px] 2xl:top-[254px] z-10'>
          <div className='py-[20px] max-w-[800px] mx-auto px-5 md:px-5 xl:px-0 w-full lg:w-[800px]'>
            {/* Hero Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className='text-center'
            >
              <h1 className='text-[24px] sm:text-[28px] md:text-[32px] leading-[150%] font-semibold text-primary-5000 mb-[10px]'>
                What Song to Create?
              </h1>
            </motion.div>

            {/* Prompt Box */}
            <PromptBox
              onSubmit={handlePromptSubmit}
              isGenerating={isGenerating}
            />

            {/* Footer Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className='text-center pt-[20px] flex items-center justify-center gap-3 text-xs font-normal leading-[146%] text-text-alpha-50'
            >
              <span>MusicGPT v6 Pro - Our latest AI audio model</span>{' '}
              <Link
                href='/'
                className='hover:text-text-primary transition-colors underline decoration-solid underline-offset-[25%] decoration-skip-ink-auto'
              >
                Example prompts
              </Link>
            </motion.div>

            {/* Recent Generations */}
            <RecentGenerations />
          </div>
        </div>
      </main>
    </div>
  );
}
