'use client';

import {
  ArrowRight,
  Code,
  Layout,
  ShoppingCart,
  Smartphone,
  Wrench,
} from 'lucide-react';

const services = [
  {
    icon: (
      <Layout className='w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-500' />
    ),
    title: 'Web Design',
    description:
      'We create stunning websites with intuitive interfaces that engage and delight users with purposeful user experiences.',
  },
  {
    icon: (
      <Code className='w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-500' />
    ),
    title: 'Web Development',
    description:
      'We develop high-performance web applications using modern technologies to ensure reliability, security, and scalability.',
  },
  {
    icon: (
      <Smartphone className='w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-500' />
    ),
    title: 'Responsive Design',
    description:
      'We ensure responsive web design that functions beautifully across all devices and screen sizes.',
  },
  {
    icon: (
      <ArrowRight className='w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-500' />
    ),
    title: 'SEO Optimization',
    description:
      'We optimize your business visibility through expert digital optimization strategies and analytics.',
  },
  {
    icon: (
      <ShoppingCart className='w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-500' />
    ),
    title: 'E-Commerce Development',
    description:
      'We build secure and user-friendly e-commerce sites that provide seamless shopping experiences.',
  },
  {
    icon: (
      <Wrench className='w-6 h-6 text-pink-500 group-hover:text-white transition-colors duration-500' />
    ),
    title: 'Maintenance & Support',
    description:
      'We support continuous improvement and stable operation of your websites through expert maintenance.',
  },
];

export function Services() {
  return (
    <section id='services' className='relative py-20 bg-muted overflow-hidden'>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple [animation-delay:2s]'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple [animation-delay:4s]'></div>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <h2 className='text-3xl font-bold text-center mb-2'>Our Services</h2>
        <p className='text-muted-foreground text-center mb-12'>
          We provide refined web solutions tailored to your specific needs,
          ensuring your digital presence stands out from the competition.
        </p>
        <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-8'>
          {services.map((service, index) => (
            <div key={index} className='pt-2 pb-1 px-1 group'>
              <div
                className="relative overflow-hidden bg-card p-6 rounded-lg transform transition-all duration-300
                  hover:-translate-y-2 hover:shadow-xl border hover:border-pink-400
                  before:content-[''] before:absolute before:w-[150px] before:h-[150px]
                  before:bg-[radial-gradient(circle_at_top_right,theme(colors.pink.400/10),transparent_70%)]
                  before:opacity-0 before:top-0 before:right-0
                  before:rounded-bl-[150px] before:transition-all before:duration-500
                  hover:before:opacity-100"
              >
                <div
                  className='w-16 h-16 bg-pink-100 dark:bg-pink-900 rounded-full flex items-center justify-center mb-4 
                  [transform-style:preserve-3d] group-hover:[transform:rotateY(180deg)] transition-all duration-500
                  group-hover:bg-pink-400 dark:group-hover:bg-pink-600'
                >
                  <div className=''>{service.icon}</div>
                </div>
                <h3 className='text-xl font-semibold mb-3'>{service.title}</h3>
                <p className='text-muted-foreground'>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
