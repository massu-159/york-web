import type { Metadata } from 'next';
import { Inter } from 'next/font/google';

import './global.css';
import { ReactNode } from 'react';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'York.web - Creative Web Solutions',
  description:
    'We create exceptional digital experiences through innovative web design and development solutions.',
};

export default function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <html lang='ja' className='scroll-smooth'>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
