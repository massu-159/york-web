'use client';

import { ExternalLink } from 'lucide-react';

import Image from 'next/image';

const portfolioItems = [
  {
    image:
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80',
    title: 'ABC Corporation',
    category: 'Web Development',
  },
  {
    image:
      'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&w=800&q=80',
    title: 'PayPal Clone',
    category: 'E-Commerce',
  },
  {
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    title: 'Future Bank',
    category: 'Financial Services',
  },
  {
    image:
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    title: 'Future Academy',
    category: 'Education Platform',
  },
  {
    image:
      'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=800&q=80',
    title: 'Health Clinic',
    category: 'Healthcare',
  },
  {
    image:
      'https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80',
    title: 'Smart Home Real Estate',
    category: 'Real Estate',
  },
];

export function Portfolio() {
  return (
    <section id='portfolio' className='relative py-20 overflow-hidden'>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple opacity-0'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple opacity-0 [animation-delay:2s]'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -right-60 animate-ripple opacity-0 [animation-delay:4s]'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center mb-2'>Our Portfolio</h2>
        <p className='text-muted-foreground text-center mb-12'>
          Showcasing our groundbreaking for clients across various industries,
          delivering exceptional digital solutions.
        </p>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {portfolioItems.map((item, index) => (
            <div key={index} className='group'>
              <div className='relative overflow-hidden rounded-lg shadow-lg'>
                <div className='relative w-full h-[250px] overflow-hidden'>
                  <Image
                    src={item.image}
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
                    <h3 className='text-xl font-semibold mb-2'>{item.title}</h3>
                    <p className='text-sm'>{item.category}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
