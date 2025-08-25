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
import { Button } from '../ui/button';
import { NAVIGATION_TEXTS, ARIA_LABELS } from '@/lib/constants/texts';

export function Navigation() {
  const navItems = [
    { href: '#', label: NAVIGATION_TEXTS.HOME, ariaLabel: ARIA_LABELS.NAVIGATION_ITEMS.HOME },
    {
      href: '#services',
      label: NAVIGATION_TEXTS.SERVICES,
      ariaLabel: ARIA_LABELS.NAVIGATION_ITEMS.SERVICES,
    },
    {
      href: '#portfolio',
      label: NAVIGATION_TEXTS.PORTFOLIO,
      ariaLabel: ARIA_LABELS.NAVIGATION_ITEMS.PORTFOLIO,
    },
    { href: '#about', label: NAVIGATION_TEXTS.ABOUT, ariaLabel: ARIA_LABELS.NAVIGATION_ITEMS.ABOUT },
    {
      href: '#contact',
      label: NAVIGATION_TEXTS.CONTACT,
      ariaLabel: ARIA_LABELS.NAVIGATION_ITEMS.CONTACT,
    },
  ];

  return (
    <nav
      className='fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b'
      role='navigation'
      aria-label={ARIA_LABELS.MAIN_NAVIGATION}
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link
              href='#'
              className='text-xl font-semibold'
              aria-label={ARIA_LABELS.HOME_LINK}
            >
              York.<span className='text-pink-500'>web</span>
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item, index) => (
              <Link
                key={index}
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
                <Button variant="ghost">
                  <Menu className='h-6 w-6' />
                </Button>
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
