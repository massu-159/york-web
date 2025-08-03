import { render, screen } from '@testing-library/react';
import { Footer } from '../footer';

describe('Footer', () => {
  it('renders the footer component', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
  });

  it('renders the logo with proper branding', () => {
    render(<Footer />);

    expect(screen.getByText('York.')).toBeInTheDocument();
    expect(screen.getByText('web')).toBeInTheDocument();
    
    const logoContainer = screen.getByText('York.').parentElement;
    expect(logoContainer).toHaveClass('text-xl', 'font-semibold');
  });

  it('renders navigation links', () => {
    render(<Footer />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByText('Services')).toBeInTheDocument();
    expect(screen.getByText('Portfolio')).toBeInTheDocument();
    expect(screen.getByText('Contact')).toBeInTheDocument();
  });

  it('has correct href attributes for navigation links', () => {
    render(<Footer />);

    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#');
    expect(screen.getByText('About').closest('a')).toHaveAttribute(
      'href',
      '#about',
    );
    expect(screen.getByText('Services').closest('a')).toHaveAttribute(
      'href',
      '#services',
    );
    expect(screen.getByText('Portfolio').closest('a')).toHaveAttribute(
      'href',
      '#portfolio',
    );
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute(
      'href',
      '#contact',
    );
  });

  it('applies hover effects to navigation links', () => {
    render(<Footer />);

    const homeLink = screen.getByText('Home');
    expect(homeLink).toHaveClass('text-foreground', 'hover:text-foreground/80');
  });

  it('renders copyright information', () => {
    render(<Footer />);

    expect(
      screen.getByText(/© 2024 York\.web All Rights Reserved\./),
    ).toBeInTheDocument();
  });

  it('has proper footer layout structure', () => {
    render(<Footer />);

    const footer = screen.getByRole('contentinfo');
    expect(footer).toHaveClass('bg-muted', 'py-8');

    const container = footer.querySelector('.max-w-7xl');
    expect(container).toBeInTheDocument();
    expect(container).toHaveClass('mx-auto', 'px-4', 'sm:px-6', 'lg:px-8');
  });

  it('has responsive design classes', () => {
    render(<Footer />);

    const flexContainer = screen.getByRole('contentinfo').querySelector('.flex');
    expect(flexContainer).toHaveClass('flex-col', 'md:flex-row', 'justify-between', 'items-center');

    const navigationContainer = screen.getByText('Home').parentElement;
    expect(navigationContainer).toHaveClass('space-x-8', 'hidden', 'md:flex');
  });

  it('has proper copyright styling', () => {
    render(<Footer />);

    const copyright = screen.getByText(/© 2024 York\.web All Rights Reserved\./);
    expect(copyright).toHaveClass('text-center', 'text-muted-foreground', 'mt-8');
  });

  it('renders logo with pink accent', () => {
    render(<Footer />);

    const webSpan = screen.getByText('web');
    expect(webSpan).toHaveClass('text-pink-500');
  });
});