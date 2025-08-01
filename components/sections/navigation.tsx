import Link from 'next/link';

export function Navigation() {
  const navItems = [
    { href: '#', label: 'Home', ariaLabel: 'ホームセクションへ移動' },
    {
      href: '#services',
      label: 'Services',
      ariaLabel: 'サービスセクションへ移動',
    },
    {
      href: '#portfolio',
      label: 'Portfolio',
      ariaLabel: 'ポートフォリオセクションへ移動',
    },
    { href: '#about', label: 'About', ariaLabel: '会社概要セクションへ移動' },
    {
      href: '#contact',
      label: 'Contact',
      ariaLabel: 'お問い合わせセクションへ移動',
    },
  ];

  return (
    <nav
      className='fixed top-0 w-full bg-background/80 backdrop-blur-sm z-50 border-b'
      role='navigation'
      aria-label='メインナビゲーション'
    >
      <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
        <div className='flex justify-between items-center h-16'>
          <div className='flex items-center'>
            <Link
              href='#'
              className='text-xl font-semibold'
              aria-label='ホームページへ戻る'
            >
              York.<span className='text-pink-500'>web</span>
            </Link>
          </div>
          <div className='hidden md:flex items-center space-x-8'>
            {navItems.map((item, index) => (
              <Link
                key={item.href}
                href={item.href}
                className='text-foreground hover:text-foreground/80 rounded-md px-2 py-1'
                aria-label={item.ariaLabel}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
}
