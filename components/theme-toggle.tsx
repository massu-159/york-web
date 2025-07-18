'use client';

import { Moon, Sun } from 'lucide-react';

import * as React from 'react';

import { useTheme } from 'next-themes';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className='relative p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2'
      aria-label={
        theme === 'dark' ? 'ライトモードに切り替え' : 'ダークモードに切り替え'
      }
      title='テーマを切り替える'
    >
      <div className='relative w-5 h-5'>
        <Sun className='absolute h-5 w-5 rotate-0 scale-100 transition-transform duration-200 dark:-rotate-90 dark:scale-0' />
        <Moon className='absolute h-5 w-5 rotate-90 scale-0 transition-transform duration-200 dark:rotate-0 dark:scale-100' />
      </div>
      <span className='sr-only'>Toggle theme</span>
    </button>
  );
}
