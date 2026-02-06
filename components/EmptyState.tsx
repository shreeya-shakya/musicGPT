'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { Music, Sparkles } from 'lucide-react';

export default function EmptyState() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
      className='flex flex-col items-center justify-center py-20 px-6'
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.2, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        className='relative mb-6'
      >
        <div className='w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center relative'>
          <Music className='w-12 h-12 text-primary' />

          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
            className='absolute inset-0 rounded-full bg-primary/20'
          />
        </div>

        <motion.div
          animate={{
            y: [0, -10, 0],
            rotate: [0, 10, 0]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className='absolute -top-2 -right-2'
        >
          <Sparkles className='w-6 h-6 text-primary' />
        </motion.div>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className='text-2xl font-bold text-text-primary mb-2 text-center'
      >
        Start Creating Music
      </motion.h2>

      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className='text-text-secondary text-center max-w-md'
      >
        Describe the music you want to create and let AI compose it for you.
        Your generations will appear here.
      </motion.p>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className='mt-8 flex gap-4 text-sm text-text-muted'
      >
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-primary' />
          <span>AI-Powered</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-primary' />
          <span>Real-time Generation</span>
        </div>
        <div className='flex items-center gap-2'>
          <div className='w-2 h-2 rounded-full bg-primary' />
          <span>High Quality</span>
        </div>
      </motion.div>
    </motion.div>
  );
}
