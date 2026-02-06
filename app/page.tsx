'use client';
import Sidebar from '@/components/Sidebar';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Home() {
  return (
    <div className='min-h-screen flex'>
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <main className='relative flex-1 ml-[200px] flex items-center justify-center'>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className='text-center max-w-md px-6'
        >
          <h1 className='text-4xl font-bold text-primary-500 mb-4'>
            Welcome to MusicGPT
          </h1>
          <p className='text-lg text-text-alpha-70 mb-8'>
            Create amazing music with the power of AI. Get started by selecting{' '}
            <span className='font-semibold text-primary-500'>"Create"</span>{' '}
            from the sidebar.
          </p>
          <Link
            href='/create'
            className='inline-flex items-center gap-2 px-6 py-3 bg-primary-500 text-white font-medium rounded-lg hover:bg-primary-600 transition-colors'
          >
            Start Creating
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='20'
              height='20'
              viewBox='0 0 24 24'
              fill='none'
              stroke='currentColor'
              strokeWidth='2'
              strokeLinecap='round'
              strokeLinejoin='round'
            >
              <path d='M5 12h14' />
              <path d='m12 5 7 7-7 7' />
            </svg>
          </Link>
        </motion.div>
      </main>
    </div>
  );
}
