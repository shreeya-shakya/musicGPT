'use client';
import { User, Heart, Plus, Command, Search } from 'lucide-react';
import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Image from 'next/image';
import LanguageSelector from './LanguageSelector';

const navItems = [
  { icon: 'home', label: 'Home', href: '/' },
  { icon: 'create', label: 'Create', href: '/create' },
  { icon: 'explore', label: 'Explore', href: '/explore' }
];

const libraryItems = [
  { icon: User, label: 'Profile', href: '/profile' },
  { icon: Heart, label: 'Liked', href: '/liked' },
  { icon: Plus, label: 'New playlist', href: '/new-playlist' }
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className='fixed left-0 top-0 bottom-0 w-[200px] bg-white/[0.03] border-r border-border/50 p-4 flex flex-col gap-8'>
      {/* Logo */}
      <Link href='/' className='flex items-center gap-[10px] group'>
        <div className='w-8 h-8 flex items-center justify-center'>
          <Image
            src='/images/musicgpt.webp'
            alt='MusicGPT Logo'
            width={32}
            height={32}
          />
        </div>
        <span className='text-lg font-medium text-text-primary'>MusicGPT</span>
      </Link>

      {/* Search */}
      <div>
        <button className='w-full h-[37px] md:w-[168px] flex items-center gap-2 px-4 rounded-[30px] text-text-secondary border border-1 border-background-hover-light hover:border-transparent hover:bg-background-hover-light transition-colors'>
          <Search size='20px' color='white' />
          <span className='text-sm font-medium text-white'>Search</span>
          <kbd className='ml-auto text-base text-text-muted flex w-10 items-center justify-end'>
            <Command size='14px' className='mr-0.5' />K
          </kbd>
        </button>
      </div>

      {/* Navigation */}
      <nav className='flex-1 space-y-1'>
        <div className='flex flex-col gap-8'>
          {/* Main Nav Items */}
          <div className='flex flex-col gap-1'>
            {navItems.map((item) => {
              const isActive = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={clsx(
                    'flex items-center gap-2 px-4 h-9 rounded-full transition-all group active:scale-95 self-start',
                    isActive
                      ? 'bg-background-hover-light'
                      : 'hover:bg-white/[0.08]'
                  )}
                >
                  {/* Custom SVG Icons */}
                  {item.icon === 'home' && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M12.9823 2.76356C12.631 2.49031 12.4553 2.35368 12.2613 2.30116C12.0902 2.25482 11.9098 2.25482 11.7387 2.30116C11.5447 2.35368 11.369 2.49031 11.0177 2.76356L4.23539 8.03868C3.78202 8.39131 3.55534 8.56762 3.39203 8.78842C3.24737 8.984 3.1396 9.20434 3.07403 9.43861C3 9.70308 3 9.99026 3 10.5647V17.7996C3 18.9197 3 19.4797 3.21799 19.9076C3.40973 20.2839 3.71569 20.5899 4.09202 20.7816C4.51984 20.9996 5.0799 20.9996 6.2 20.9996H8.2C8.48003 20.9996 8.62004 20.9996 8.727 20.9451C8.82108 20.8972 8.89757 20.8207 8.9455 20.7266C9 20.6196 9 20.4796 9 20.1996V13.5996C9 13.0395 9 12.7595 9.10899 12.5456C9.20487 12.3574 9.35785 12.2045 9.54601 12.1086C9.75992 11.9996 10.0399 11.9996 10.6 11.9996H13.4C13.9601 11.9996 14.2401 11.9996 14.454 12.1086C14.6422 12.2045 14.7951 12.3574 14.891 12.5456C15 12.7595 15 13.0395 15 13.5996V20.1996C15 20.4796 15 20.6196 15.0545 20.7266C15.1024 20.8207 15.1789 20.8972 15.273 20.9451C15.38 20.9996 15.52 20.9996 15.8 20.9996H17.8C18.9201 20.9996 19.4802 20.9996 19.908 20.7816C20.2843 20.5899 20.5903 20.2839 20.782 19.9076C21 19.4797 21 18.9197 21 17.7996V10.5647C21 9.99026 21 9.70308 20.926 9.43861C20.8604 9.20434 20.7526 8.984 20.608 8.78842C20.4447 8.56762 20.218 8.39131 19.7646 8.03869L12.9823 2.76356Z'
                        fill={isActive ? 'currentColor' : 'none'}
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}

                  {item.icon === 'create' && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill='none'
                    >
                      <path
                        d='M6.50003 13.0008L7.28449 14.5697C7.54998 15.1007 7.68272 15.3662 7.86006 15.5962C8.01742 15.8004 8.20044 15.9834 8.40458 16.1408C8.63465 16.3181 8.90013 16.4509 9.43111 16.7163L11 17.5008L9.43111 18.2853C8.90013 18.5507 8.63465 18.6835 8.40458 18.8608C8.20044 19.0182 8.01742 19.2012 7.86006 19.4054C7.68272 19.6354 7.54998 19.9009 7.28449 20.4319L6.50003 22.0008L5.71557 20.4319C5.45008 19.9009 5.31734 19.6354 5.14 19.4054C4.98264 19.2012 4.79962 19.0182 4.59548 18.8608C4.36541 18.6835 4.09993 18.5507 3.56895 18.2853L2.00003 17.5008L3.56895 16.7163C4.09993 16.4509 4.36541 16.3181 4.59548 16.1408C4.79962 15.9834 4.98264 15.8004 5.14 15.5962C5.31734 15.3662 5.45008 15.1007 5.71557 14.5697L6.50003 13.0008Z'
                        fill={isActive ? 'currentColor' : 'none'}
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                      <path
                        d='M15 1.99922L16.1786 5.06364C16.4606 5.79687 16.6016 6.16348 16.8209 6.47186C17.0153 6.74517 17.254 6.98397 17.5274 7.17831C17.8357 7.39758 18.2024 7.53859 18.9356 7.8206L22 8.99922L18.9356 10.1778C18.2024 10.4598 17.8357 10.6008 17.5274 10.8201C17.254 11.0145 17.0153 11.2532 16.8209 11.5266C16.6016 11.8349 16.4606 12.2016 16.1786 12.9348L15 15.9992L13.8214 12.9348C13.5394 12.2016 13.3984 11.8349 13.1791 11.5266C12.9847 11.2532 12.746 11.0145 12.4726 10.8201C12.1643 10.6008 11.7976 10.4598 11.0644 10.1778L8.00003 8.99922L11.0644 7.8206C11.7976 7.53859 12.1643 7.39758 12.4726 7.17831C12.746 6.98397 12.9847 6.74517 13.1791 6.47186C13.3984 6.16348 13.5394 5.79687 13.8214 5.06364L15 1.99922Z'
                        fill={isActive ? 'currentColor' : 'none'}
                        stroke='white'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      />
                    </svg>
                  )}

                  {item.icon === 'explore' && (
                    <svg
                      xmlns='http://www.w3.org/2000/svg'
                      width='20'
                      height='20'
                      viewBox='0 0 24 24'
                      fill={isActive ? 'currentColor' : 'none'}
                    >
                      <path
                        d='M12 2.00274C17.5216 2.00274 21.998 6.47917 21.998 12.0008C21.998 17.5224 17.5216 21.9988 12 21.9988C6.47836 21.9988 2.00192 17.5224 2.00192 12.0008C2.00192 6.47917 6.47836 2.00274 12 2.00274ZM15.4795 7.13164L15.3037 7.17656L9.77829 9.01836C9.46419 9.12306 9.20923 9.35219 9.07028 9.64824L9.01755 9.7791L7.17575 15.3045C6.86261 16.2441 7.75664 17.1381 8.69626 16.825L14.2216 14.9832C14.5806 14.8636 14.8628 14.5814 14.9824 14.2225L16.8242 8.69707C17.1177 7.81631 16.3506 6.9756 15.4795 7.13164Z'
                        stroke='white'
                        strokeWidth='2.004'
                      />
                    </svg>
                  )}

                  <span className='text-sm font-medium z-10'>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Library Section */}
          <div className='flex flex-col gap-2'>
            <p className='px-4 text-sm leading-9 font-medium text-text-neutral'>
              Library
            </p>
            <div className='flex flex-col gap-1 space-y-1'>
              {libraryItems.map((item) => {
                const Icon = item.icon;
                const isActive = pathname === item.href;
                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={clsx(
                      'flex items-center gap-2 px-4 h-9 rounded-full transition-all group active:scale-95 self-start',
                      isActive
                        ? 'bg-background-hover-light'
                        : 'hover:bg-white/[0.08]'
                    )}
                  >
                    <Icon className='w-5 h-5' />
                    <span className='text-sm font-medium'>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        </div>
      </nav>

      {/* Footer */}
      {/* V6 Pro Card */}
      <div className='font-semibold text-xs leading-[146%] bg-gradient-to-bl from-background-gradient-left via-background-gradient-middle to-background-gradient-right rounded-2xl px-3 py-[10px]'>
        <p className='text-white mb-1'>Model v6 Pro is here!</p>
        <p className='text-white opacity-[0.64]'>
          Pushing boundaries to the world's best AI music model
        </p>
      </div>

      {/* Footer Links */}
      <div className='flex flex-wrap items-center gap-2 text-xs text-white leading-[146%]'>
        <a
          href='#'
          className='hover:text-white hover:opacity-100 opacity-50 transition-colors'
        >
          Pricing
        </a>
        <a
          href='#'
          className='hover:text-white hover:opacity-100 opacity-50 transition-colors'
        >
          Affiliate
        </a>
        <a
          href='#'
          className='hover:text-white hover:opacity-100 opacity-50  transition-colors'
        >
          API
        </a>
        <a
          href='#'
          className='hover:text-white hover:opacity-100 opacity-50  transition-colors'
        >
          About
        </a>
        <a
          href='#'
          className='hover:text-white hover:opacity-100 opacity-50  transition-colors'
        >
          Terms
        </a>
        <a
          href='#'
          className='hover:text-white hover:opacity-100 opacity-50  transition-colors'
        >
          Privacy
        </a>
        <LanguageSelector />
      </div>
    </aside>
  );
}
