'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Check } from 'lucide-react';
import clsx from 'clsx';

const languages = [
  { code: 'EN', name: 'EN' },
  { code: 'DE', name: 'DE' },
  { code: 'FR', name: 'FR' }
];

export default function LanguageSelector() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState('EN');
  const [openUpwards, setOpenUpwards] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (isOpen && buttonRef.current) {
      const buttonRect = buttonRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - buttonRect.bottom;
      const dropdownHeight = 150;

      setOpenUpwards(
        spaceBelow < dropdownHeight && buttonRect.top > dropdownHeight
      );
    }
  }, [isOpen]);

  const handleLanguageSelect = (code: string) => {
    setSelectedLanguage(code);
    setIsOpen(false);
  };

  return (
    <div className='relative'>
      <motion.button
        ref={buttonRef}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={clsx(
          'flex items-center gap-0.5 transition-all',
          'hover:text-white hover:opacity-100 opacity-50 text-xs text-white leading-[146%]'
        )}
      >
        <span className='text-xs text-white leading-[146%]'>
          {selectedLanguage}
        </span>
        <ChevronDown
          className={clsx(
            'w-3 h-3 text-text-secondary transition-transform',
            isOpen && 'rotate-180'
          )}
        />
      </motion.button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className='fixed inset-0 z-40'
            />

            {/* Dropdown */}
            <motion.div
              initial={{ opacity: 0, y: openUpwards ? 10 : -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: openUpwards ? 10 : -10, scale: 0.95 }}
              transition={{ duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
              className={clsx(
                'absolute left-0 w-20 bg-background-card border border-border rounded-lg shadow-2xl overflow-hidden',
                openUpwards ? 'bottom-full mb-2' : 'top-full mt-2'
              )}
            >
              {languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => handleLanguageSelect(language.code)}
                  className={clsx(
                    'w-full px-3 py-2 text-left text-sm flex items-center justify-between transition-colors',
                    selectedLanguage === language.code
                      ? 'bg-background-hover-light text-white'
                      : 'text-text-secondary hover:bg-background-hover-light hover:text-white'
                  )}
                >
                  <span>{language.name}</span>
                  {selectedLanguage === language.code && (
                    <Check className='w-3 h-3 text-primary' />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
