import Image from 'next/image';
import { ABOUT_TEXTS } from '@/lib/constants/texts';

export function About() {
  return (
    <section id='about' className='relative py-20 bg-muted overflow-hidden'>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple opacity-0'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple opacity-0 [animation-delay:2s]'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple opacity-0 [animation-delay:4s]'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='grid md:grid-cols-2 gap-12 items-center'>
          <div className='relative h-[400px]'>
            <Image
              src='https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80'
              alt='About us'
              fill
              className='object-cover rounded-lg'
            />
          </div>
          <div>
            <span className='text-pink-500'>{ABOUT_TEXTS.SECTION_LABEL}</span>
            <h2 className='text-3xl font-bold mt-2 mb-6'>
              {ABOUT_TEXTS.TITLE}
            </h2>
            <p className='text-muted-foreground mb-6'>
              {ABOUT_TEXTS.DESCRIPTION}
            </p>
            <div className='grid grid-cols-2 md:grid-cols-3 gap-8 text-center'>
              <div className='p-4 rounded-lg transition-all duration-300 hover:translate-y-2 shadow-lg shadow-pink-500/20 hover:shadow-none'>
                <p className='text-muted-foreground'>{ABOUT_TEXTS.INFO_LABEL.COMPANY}</p>
                <h3 className='font-bold'>York.<span className='text-pink-500'>web</span></h3>
              </div>
              <div className='p-4 rounded-lg transition-all duration-300 hover:translate-y-2 shadow-lg shadow-pink-500/20 hover:shadow-none'>
                <p className='text-muted-foreground'>{ABOUT_TEXTS.INFO_LABEL.NAME}</p>
                <h3>{ABOUT_TEXTS.INFO_VALUE.NAME}</h3>
              </div>
              <div className='p-4 rounded-lg transition-all duration-300 hover:translate-y-2 shadow-lg shadow-pink-500/20 hover:shadow-none col-span-2 md:col-span-1'>
                <p className='text-muted-foreground'>{ABOUT_TEXTS.INFO_LABEL.BUSINESS}</p>
                <h3 className=''>{ABOUT_TEXTS.INFO_VALUE.BUSINESS}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
