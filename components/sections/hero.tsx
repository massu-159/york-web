'use client';

import Image from 'next/image';
import { Suspense } from 'react';

import Ripple from '@/components/ripple/ripple';
import { LoadingFallback } from '@/components/ui/loading-fallback';

export function Hero() {
  return (
    <section
      className='relative min-h-screen py-20 flex items-center px-4'
      role='banner'
      aria-label='メインビジュアル'
    >
      <div className='absolute inset-0 z-10'>
        <Image
          src='/images/hero-bg.jpg'
          alt='Hero background'
          fill
          className='w-full h-full object-cover md:hidden'
          priority
          style={{
            transform: 'translateZ(0)',
            backfaceVisibility: 'hidden',
            perspective: '1000px',
            willChange: 'transform',
          }}
        />
        <div className='absolute inset-0 hidden md:block h-full'>
          <Suspense fallback={<LoadingFallback />}>
            <Ripple />
          </Suspense>
        </div>
      </div>
      <div className='relative z-20 max-w-3xl mx-auto'>
        <h2 className='text-2xl mb-4' aria-level={2}>
          Creative Web Solutions
        </h2>
        <h1
          className='text-5xl font-bold pb-2 mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 text-transparent bg-clip-text'
          aria-level={1}
        >
          Bringing Your Vision to Life
        </h1>
        <p className='text-muted-foreground mb-8 max-w-2xl'>
          We support your business growth with cutting-edge technology and
          creative design that transforms your ideas into exceptional digital
          experiences.
        </p>
        <button
          className='bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-300 focus:ring-offset-2'
          aria-label='サービスを始める'
          type='button'
        >
          GET STARTED
        </button>
      </div>
    </section>
  );
}
