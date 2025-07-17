'use client';

import { About } from '@/components/sections/about';
import { Contact } from '@/components/sections/contact';
import { Footer } from '@/components/sections/footer';
import { Hero } from '@/components/sections/hero';
import { Navigation } from '@/components/sections/navigation';
import { Portfolio } from '@/components/sections/portfolio';
import { Services } from '@/components/sections/services';

export default function Home() {
  return (
    <main className='min-h-screen bg-background'>
      <Navigation />
      <Hero />
      <Services />
      <Portfolio />
      <About />
      <Contact />
      <Footer />
    </main>
  );
}
