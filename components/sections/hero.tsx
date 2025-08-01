'use client';

import { useEffect, useState } from 'react';

import Image from 'next/image';

import { LoadingFallback } from '@/components/ui/loading-fallback';

export function Hero() {
  const [RippleComponent, setRippleComponent] =
    useState<React.ComponentType | null>(null);
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
              3Dエフェクトの読み込みに失敗しました
            </p>
            <button
              onClick={() => window.location.reload()}
              className='text-sm text-pink-600 hover:text-pink-700 underline'
            >
              再読み込み
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
