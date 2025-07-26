import Image from 'next/image';

export function About() {
  return (
    <section id='about' className='relative py-20 bg-muted overflow-hidden'>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple [animation-delay:2s]'></div>
      <div className='absolute w-96 h-96 bg-pink-500/10 rounded-full -top-60 -left-60 animate-ripple [animation-delay:4s]'></div>
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
            <span className='text-pink-500'>About Our Studio</span>
            <h2 className='text-3xl font-bold mt-2 mb-6'>
              We Create Digital Experiences
            </h2>
            <p className='text-muted-foreground mb-6'>
              Founded in 2015, York.web has been at the forefront of web design
              innovation, helping businesses establish a strong online presence
              through creative solutions that deliver beautiful but fast-drive
              results.
            </p>
            <div className='grid grid-cols-3 gap-8 text-center'>
              <div className='p-4 rounded-lg transition-all duration-300 hover:translate-y-2 shadow-lg shadow-pink-500/20 hover:shadow-none'>
                <h3 className='text-3xl font-bold text-pink-500'>250+</h3>
                <p className='text-muted-foreground'>Happy Clients</p>
              </div>
              <div className='p-4 rounded-lg transition-all duration-300 hover:translate-y-2 shadow-lg shadow-pink-500/20 hover:shadow-none'>
                <h3 className='text-3xl font-bold text-pink-500'>120+</h3>
                <p className='text-muted-foreground'>Projects</p>
              </div>
              <div className='p-4 rounded-lg transition-all duration-300 hover:translate-y-2 shadow-lg shadow-pink-500/20 hover:shadow-none'>
                <h3 className='text-3xl font-bold text-pink-500'>8</h3>
                <p className='text-muted-foreground'>Years Experience</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
