import Link from 'next/link';

export function Footer() {
  return (
    <footer className='bg-muted py-8'>
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex flex-col md:flex-row justify-between items-center'>
          <div className='text-xl font-semibold mb-4 md:mb-0'>
            York.<span className='text-pink-500'>web</span>
          </div>
          <div className='flex space-x-8'>
            <Link href='#' className='text-foreground hover:text-foreground/80'>
              Home
            </Link>
            <Link
              href='#services'
              className='text-foreground hover:text-foreground/80'
            >
              Services
            </Link>
            <Link
              href='#portfolio'
              className='text-foreground hover:text-foreground/80'
            >
              Portfolio
            </Link>
            <Link
              href='#about'
              className='text-foreground hover:text-foreground/80'
            >
              About
            </Link>
            <Link
              href='#contact'
              className='text-foreground hover:text-foreground/80'
            >
              Contact
            </Link>
          </div>
        </div>
        <div className='text-center text-muted-foreground mt-8'>
          © 2024 York.web All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
