import { ExternalLink } from 'lucide-react';

import Image from 'next/image';

import { client } from '@/lib/microcms';
import { PORTFOLIO_TEXTS } from '@/lib/constants/texts';

import NoPortfolio from './no-portfolio';

export async function Portfolio() {
  // ポートフォリオの一覧を取得する
  const portfolioItems = await client
    .getList({
      endpoint: 'portfolios',
    })
    .then(res => res.contents)
    .catch(err => {
      console.error(err);
      return [];
    });

  return (
    <section id='portfolio' className='relative py-20 overflow-hidden'>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple opacity-0'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple opacity-0 [animation-delay:2s]'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple opacity-0 [animation-delay:4s]'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center mb-2'>{PORTFOLIO_TEXTS.TITLE}</h2>
        <p className='text-muted-foreground text-center mb-12'>
          {PORTFOLIO_TEXTS.SUBTITLE}
        </p>
        <div
          className={`grid gap-8 ${portfolioItems.length == 0 ? 'grid-cols-1' : 'md:grid-cols-2 lg:grid-cols-3'}`}
        >
          {portfolioItems.length == 0 ? (
            <NoPortfolio />
          ) : (
            portfolioItems.map((item, index) => (
              <div key={index} className='group'>
                <div className='relative overflow-hidden rounded-lg shadow-lg'>
                  <div className='relative w-full h-[250px] overflow-hidden'>
                    <Image
                      src={item.thumbnail.url}
                      alt={item.title}
                      width={400}
                      height={300}
                      className='w-full h-full object-cover transition-transform duration-500 group-hover:scale-120'
                    />
                    <div className='absolute top-4 right-4 transform -translate-y-12 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100'>
                      <ExternalLink className='w-6 h-6 text-white hover:text-pink-400 transition-colors duration-300' />
                    </div>
                  </div>
                  <div className='absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity'>
                    <div className='text-center text-white'>
                      <h3 className='text-xl font-semibold mb-2'>
                        {item.title}
                      </h3>
                      <p className='text-sm'>{item.category}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
