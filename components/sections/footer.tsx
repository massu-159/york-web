import Link from 'next/link';
import { NAVIGATION_TEXTS, FOOTER_TEXTS } from '@/lib/constants/texts';

export function Footer() {
  return (
    <footer className='bg-muted py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-xl font-semibold mb-4 md:mb-0'>
            York.<span className='text-pink-500'>web</span>
          </div>
          <div className='space-x-8 hidden md:flex'>
            <Link href='#' className='text-foreground hover:text-foreground/80'>
              {NAVIGATION_TEXTS.HOME}
            </Link>
            <Link
              href='#services'
              className='text-foreground hover:text-foreground/80'
            >
              {NAVIGATION_TEXTS.SERVICES}
            </Link>
            <Link
              href='#portfolio'
              className='text-foreground hover:text-foreground/80'
            >
              {NAVIGATION_TEXTS.PORTFOLIO}
            </Link>
            <Link
              href='#about'
              className='text-foreground hover:text-foreground/80'
            >
              {NAVIGATION_TEXTS.ABOUT}
            </Link>
            <Link
              href='#contact'
              className='text-foreground hover:text-foreground/80'
            >
              {NAVIGATION_TEXTS.CONTACT}
            </Link>
          </div>
        </div>
        <div className='text-center text-muted-foreground mt-8'>
          {FOOTER_TEXTS.COPYRIGHT}
        </div>
      </div>
    </footer>
  );
}
