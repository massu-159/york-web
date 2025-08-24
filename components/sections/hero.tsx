'use client';

import { ComponentType, Suspense, useEffect, useState } from 'react';

import Image from 'next/image';

import { LoadingFallback } from '@/components/ui/loading-fallback';
import { HERO_TEXTS, ARIA_LABELS, ERROR_MESSAGES } from '@/lib/constants/texts';

export function Hero() {
  const [RippleComponent, setRippleComponent] =
    useState<ComponentType | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [showRipple, setShowRipple] = useState(false);

  useEffect(() => {
    const loadRipple = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const { default: Ripple } = await import('@/components/ripple/ripple');
        setRippleComponent(() => Ripple);
        // ローディング完了後、少し遅延してからフェードイン開始
        setTimeout(() => {
          setShowRipple(true);
        }, 100);
      } catch (error) {
        console.error('Failed to load Ripple component:', error);
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    loadRipple();
  }, []);

  const renderRippleContent = () => {
    if (isLoading) {
      return <LoadingFallback />;
    }

    if (hasError) {
      return (
        <div className='absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100'>
          <div className='text-center'>
            <p className='text-gray-600 mb-2'>
              {ERROR_MESSAGES.RIPPLE_LOAD_FAILED}
            </p>
            <button
              onClick={() => window.location.reload()}
              className='text-sm text-pink-600 hover:text-pink-700 underline'
            >
              {ERROR_MESSAGES.RELOAD_BUTTON}
            </button>
          </div>
        </div>
      );
    }

    return (
      RippleComponent && (
        <div
          className={`transition-opacity duration-1000 ${
            showRipple ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <RippleComponent />
        </div>
      )
    );
  };

  return (
    <section
      className='relative min-h-screen py-20 flex items-center px-4'
      role='banner'
      aria-label={ARIA_LABELS.HERO_SECTION}
    >
      <div className='absolute inset-0 z-10'>
        <Suspense fallback={<LoadingFallback />}>
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
        </Suspense>
        <div className='absolute inset-0 hidden md:block h-full'>
          {renderRippleContent()}
        </div>
      </div>
      <div
        className={`relative z-20 max-w-3xl mx-auto transition-all duration-1000 ${
          !isLoading
            ? 'opacity-100 translate-y-0 delay-300'
            : 'opacity-0 translate-y-8'
        }`}
      >
        <h2 className='text-2xl mb-4' aria-level={2}>
          {HERO_TEXTS.SUBTITLE}
        </h2>
        <h1
          className='text-5xl font-bold pb-2 mb-6 bg-gradient-to-r from-pink-400 via-purple-400 to-blue-500 text-transparent bg-clip-text'
          aria-level={1}
        >
          {HERO_TEXTS.TITLE}
        </h1>
        <p className='text-muted-foreground mb-8 max-w-2xl'>
          {HERO_TEXTS.DESCRIPTION}
        </p>
        <button
          className='bg-pink-600 text-white px-8 py-3 rounded-full hover:bg-pink-700 transition-colors'
          aria-label={ARIA_LABELS.SERVICE_START}
          type='button'
        >
          {HERO_TEXTS.CTA_BUTTON}
        </button>
      </div>
    </section>
  );
}
