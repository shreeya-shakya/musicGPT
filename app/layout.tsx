import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'MusicGPT - AI Music Generation',
  description: 'Create amazing music with AI-powered generation'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <head>
        <link rel='icon' href='/images/musicgpt.webp' />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
