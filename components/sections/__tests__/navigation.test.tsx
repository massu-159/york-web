import { render, screen, fireEvent } from '@testing-library/react';
import { Navigation } from '../navigation';

// Mock the Sheet component
jest.mock('@/components/ui/sheet', () => ({
  Sheet: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet">{children}</div>,
  SheetContent: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-content">{children}</div>,
  SheetHeader: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-header">{children}</div>,
  SheetTitle: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-title">{children}</div>,
  SheetTrigger: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-trigger">{children}</div>,
  SheetClose: ({ children }: { children: React.ReactNode }) => <div data-testid="sheet-close">{children}</div>,
}));

describe('Navigation', () => {
  it('renders the navigation component', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toBeInTheDocument();
    expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション');
  });

  it('renders the logo with correct link', () => {
    render(<Navigation />);
    
    const logo = screen.getByLabelText('ホームページへ戻る');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('href', '#');
    expect(logo).toHaveTextContent('York.web');
  });

  it('renders desktop navigation items', () => {
    render(<Navigation />);
    
    const navItems = [
      { text: 'Home', href: '#' },
      { text: 'Services', href: '#services' },
      { text: 'Portfolio', href: '#portfolio' },
      { text: 'About', href: '#about' },
      { text: 'Contact', href: '#contact' }
    ];

    navItems.forEach(item => {
      const link = screen.getByRole('link', { name: new RegExp(item.text, 'i') });
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute('href', item.href);
    });
  });

  it('renders mobile navigation trigger', () => {
    render(<Navigation />);
    
    const mobileNav = screen.getByTestId('sheet');
    expect(mobileNav).toBeInTheDocument();
  });

  it('has proper accessibility attributes', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('fixed', 'top-0', 'w-full');
    expect(nav).toHaveAttribute('aria-label', 'メインナビゲーション');
  });

  it('applies correct styling classes', () => {
    render(<Navigation />);
    
    const nav = screen.getByRole('navigation');
    expect(nav).toHaveClass('bg-background/80', 'backdrop-blur-sm', 'z-50', 'border-b');
  });

  it('renders navigation items with proper aria labels', () => {
    render(<Navigation />);
    
    const homeLink = screen.getByLabelText('ホームセクションへ移動');
    expect(homeLink).toBeInTheDocument();
    
    const servicesLink = screen.getByLabelText('サービスセクションへ移動');
    expect(servicesLink).toBeInTheDocument();
    
    const portfolioLink = screen.getByLabelText('ポートフォリオセクションへ移動');
    expect(portfolioLink).toBeInTheDocument();
    
    const aboutLink = screen.getByLabelText('会社概要セクションへ移動');
    expect(aboutLink).toBeInTheDocument();
    
    const contactLink = screen.getByLabelText('お問い合わせセクションへ移動');
    expect(contactLink).toBeInTheDocument();
  });
});