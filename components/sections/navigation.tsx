'use client';

import Link from 'next/link';
import { Menu } from 'lucide-react';

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
  SheetClose,
} from '@/components/ui/sheet';

export function Navigation() {
  const navItems = [
    { href: '#', label: 'Home', ariaLabel: 'ホームセクションへ移動' },
    {
      href: '#services',
      label: 'Services',
      ariaLabel: 'サービスセクションへ移動',
    },
    {
      href: '#portfolio',
      label: 'Portfolio',
      ariaLabel: 'ポートフォリオセクションへ移動',
    },
    { href: '#about', label: 'About', ariaLabel: '会社概要セクションへ移動' },
    {
      href: '#contact',
      label: 'Contact',
      ariaLabel: 'お問い合わせセクションへ移動',
    },
  ];

  return (
    <nav
      className='fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b'
      role='navigation'
      aria-label='メインナビゲーション'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link
              href='#'
              className='text-xl font-semibold'
              aria-label='ホームページへ戻る'
            >
              York.<span className='text-pink-500'>web</span>
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-foreground hover:text-foreground/80 rounded-md px-2 py-1'
                aria-label={item.ariaLabel}
              >
                {item.label}
              </Link>
            ))}
          </div>
          
          {/* Mobile Navigation */}
          <div className='md:hidden'>
            <Sheet>
              <SheetTrigger asChild>
                <button
                  className='inline-flex items-center justify-center p-2 rounded-md text-foreground hover:text-foreground/80 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
                  aria-label='メニューを開く'
                  type='button'
                >
                  <Menu className='h-6 w-6' />
                </button>
              </SheetTrigger>
              <SheetContent side='right' className='w-[300px]'>
                <SheetHeader>
                  <SheetTitle className='text-left'>
                    York.<span className='text-pink-500'>web</span>
                  </SheetTitle>
                </SheetHeader>
                <nav className='flex flex-col space-y-4 mt-8'>
                  {navItems.map((item) => (
                    <SheetClose asChild key={item.href}>
                      <Link
                        href={item.href}
                        className='text-foreground hover:text-pink-500 text-lg py-2 px-4 rounded-md transition-colors'
                        aria-label={item.ariaLabel}
                      >
                        {item.label}
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
