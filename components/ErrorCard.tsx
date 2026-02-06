'use client';

import { motion } from 'framer-motion';
import { TriangleAlert } from 'lucide-react';

interface ErrorCardProps {
  error: string;
  onClick?: () => void;
}

export default function ErrorCard({ error, onClick }: ErrorCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      className='p-4 bg-error-bg rounded-xl'
    >
      <div className='flex items-start gap-3'>
        <TriangleAlert
          className='text-error flex-shrink-0 mt-0.5'
          size='20px'
        />
        <div className='flex-1 text-sm font-normal'>
          <p className='text-error mb-[6px]'>{error}</p>
          <p className='text-primary-1200'>
            4.9K users in the queue.{' '}
            <button
              onClick={onClick}
              className='underline decoration-solid underline-offset-[25%] decoration-skip-ink-auto hover:text-white transition-colors'
            >
              Retry
            </button>
          </p>
        </div>
      </div>
    </motion.div>
  );
}
