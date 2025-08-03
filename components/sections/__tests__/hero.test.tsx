import { render, screen, waitFor } from '@testing-library/react';
import { Hero } from '../hero';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

// Mock the LoadingFallback component
jest.mock('@/components/ui/loading-fallback', () => ({
  LoadingFallback: () => <div data-testid="loading-fallback">Loading...</div>,
}));

// Mock the dynamic Ripple import
jest.mock('@/components/ripple/ripple', () => ({
  __esModule: true,
  default: () => <div data-testid="ripple-component">Ripple Effect</div>,
}));

describe('Hero', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the hero section', () => {
    render(<Hero />);
    
    const section = screen.getByRole('banner');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-label', 'メインビジュアル');
  });

  it('renders the main heading and subheading', () => {
    render(<Hero />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toBeInTheDocument();
    expect(mainHeading).toHaveTextContent('Bringing Your Vision to Life');
    expect(mainHeading).toHaveAttribute('aria-level', '1');
    
    const subHeading = screen.getByRole('heading', { level: 2 });
    expect(subHeading).toBeInTheDocument();
    expect(subHeading).toHaveTextContent('Creative Web Solutions');
    expect(subHeading).toHaveAttribute('aria-level', '2');
  });

  it('renders the description text', () => {
    render(<Hero />);
    
    const description = screen.getByText(/We support your business growth/);
    expect(description).toBeInTheDocument();
  });

  it('renders the CTA button', () => {
    render(<Hero />);
    
    const ctaButton = screen.getByRole('button', { name: 'サービスを始める' });
    expect(ctaButton).toBeInTheDocument();
    expect(ctaButton).toHaveAttribute('type', 'button');
    expect(ctaButton).toHaveTextContent('GET STARTED');
  });

  it('renders the hero background image', () => {
    render(<Hero />);
    
    const heroImage = screen.getByAltText('Hero background');
    expect(heroImage).toBeInTheDocument();
    expect(heroImage).toHaveAttribute('src', '/images/hero-bg.jpg');
  });

  it('shows loading fallback initially', () => {
    render(<Hero />);
    
    const loadingFallback = screen.getByTestId('loading-fallback');
    expect(loadingFallback).toBeInTheDocument();
  });

  it('loads ripple component dynamically', async () => {
    render(<Hero />);
    
    // Wait for the ripple component to load
    await waitFor(() => {
      const rippleComponent = screen.getByTestId('ripple-component');
      expect(rippleComponent).toBeInTheDocument();
    }, { timeout: 3000 });
  });

  it('handles ripple loading error gracefully', async () => {
    // Mock the import to reject
    jest.doMock('@/components/ripple/ripple', () => {
      throw new Error('Failed to load ripple');
    });

    render(<Hero />);

    // Should show error state
    await waitFor(() => {
      const errorMessage = screen.getByText('3Dエフェクトの読み込みに失敗しました');
      expect(errorMessage).toBeInTheDocument();
    }, { timeout: 3000 });

    const reloadButton = screen.getByText('再読み込み');
    expect(reloadButton).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<Hero />);
    
    const section = screen.getByRole('banner');
    expect(section).toHaveClass('relative', 'min-h-screen', 'py-20', 'flex', 'items-center', 'px-4');
  });

  it('has proper accessibility structure', () => {
    render(<Hero />);
    
    const section = screen.getByRole('banner');
    expect(section).toHaveAttribute('aria-label', 'メインビジュアル');
    
    const ctaButton = screen.getByRole('button');
    expect(ctaButton).toHaveAttribute('aria-label', 'サービスを始める');
  });

  it('renders gradient text styling', () => {
    render(<Hero />);
    
    const mainHeading = screen.getByRole('heading', { level: 1 });
    expect(mainHeading).toHaveClass('bg-gradient-to-r', 'from-pink-400', 'via-purple-400', 'to-blue-500', 'text-transparent', 'bg-clip-text');
  });

  it('shows content with proper transitions', () => {
    render(<Hero />);
    
    const contentContainer = screen.getByRole('banner').querySelector('.relative.z-20');
    expect(contentContainer).toHaveClass('transition-all', 'duration-1000');
  });
});