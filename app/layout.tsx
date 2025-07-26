import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './global.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'York.web - Creative Web Solutions',
  description:
    'We create exceptional digital experiences through innovative web design and development solutions.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='ja' className='scroll-smooth'>
      <body className={inter.className}>
        <a href='#main-content' className='skip-link'>
          メインコンテンツへスキップ
        </a>
        <div id='main-content' role='main'>
          {children}
        </div>
        <div
          aria-live='polite'
          aria-atomic='true'
          className='sr-only'
          id='announcements'
        ></div>
      </body>
    </html>
  );
}
