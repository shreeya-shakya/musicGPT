'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useGenerationStore } from '@/store/generationStore';
import GenerationCard from './GenerationCard';
import EmptyState from './EmptyState';

export default function RecentGenerations() {
  const generations = useGenerationStore((state) => state.generations);

  return (
    <div className='w-full mt-[100px] lg:mt-[150px] 2xl:mt-[256px]'>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className='mb-6'
      >
        <p className='text-[18px] font-semibold leading-[150%] text-primary-5000 mb-2'>
          Recent Generations
        </p>
      </motion.div>

      <AnimatePresence mode='wait'>
        {generations.length > 0 && (
          <motion.div
            key='list'
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className='grid grid-cols-1 gap-1'
          >
            <AnimatePresence>
              {generations.map((generation) => (
                <GenerationCard key={generation.id} generation={generation} />
              ))}
            </AnimatePresence>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
