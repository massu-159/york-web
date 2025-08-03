import { render, screen } from '@testing-library/react';
import { LoadingFallback } from '../loading-fallback';

describe('LoadingFallback', () => {
  it('renders loading fallback component', () => {
    const { container } = render(<LoadingFallback />);
    
    const loadingContainer = container.firstChild;
    expect(loadingContainer).toBeInTheDocument();
    expect(loadingContainer).toHaveClass('w-full', 'h-full', 'relative');
  });

  it('has proper container structure', () => {
    const { container } = render(<LoadingFallback />);
    
    const outerContainer = container.firstChild;
    expect(outerContainer).toHaveClass('w-full', 'h-full', 'relative');
    
    const innerContainer = outerContainer?.firstChild;
    expect(innerContainer).toHaveClass('absolute', 'inset-0', 'flex', 'items-center', 'justify-center');
  });

  it('renders three animated ripple elements', () => {
    const { container } = render(<LoadingFallback />);
    
    const rippleElements = container.querySelectorAll('.animate-ripple');
    expect(rippleElements).toHaveLength(3);
  });

  it('applies correct styling to ripple elements', () => {
    const { container } = render(<LoadingFallback />);
    
    const rippleElements = container.querySelectorAll('.animate-ripple');
    
    rippleElements.forEach((element, index) => {
      expect(element).toHaveClass(
        'absolute',
        'w-24',
        'h-24',
        'bg-pink-500/10',
        'rounded-full',
        'top-1/2',
        'left-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'animate-ripple',
        'opacity-0'
      );
    });
  });

  it('applies animation delays correctly', () => {
    const { container } = render(<LoadingFallback />);
    
    const rippleElements = container.querySelectorAll('.animate-ripple');
    
    // First element should not have animation delay
    expect(rippleElements[0]).not.toHaveClass('[animation-delay:2s]');
    expect(rippleElements[0]).not.toHaveClass('[animation-delay:4s]');
    
    // Second element should have 2s delay
    expect(rippleElements[1]).toHaveClass('[animation-delay:2s]');
    
    // Third element should have 4s delay
    expect(rippleElements[2]).toHaveClass('[animation-delay:4s]');
  });

  it('has accessible loading indication', () => {
    const { container } = render(<LoadingFallback />);
    
    // The component should be visible and indicate loading state
    const loadingContainer = container.firstChild;
    expect(loadingContainer).toBeVisible();
  });

  it('centers content properly', () => {
    const { container } = render(<LoadingFallback />);
    
    const centeringContainer = container.querySelector('.flex.items-center.justify-center');
    expect(centeringContainer).toBeInTheDocument();
    expect(centeringContainer).toHaveClass('absolute', 'inset-0');
  });

  it('uses consistent pink theme', () => {
    const { container } = render(<LoadingFallback />);
    
    const rippleElements = container.querySelectorAll('.bg-pink-500\\/10');
    expect(rippleElements).toHaveLength(3);
  });

  it('maintains proper positioning', () => {
    const { container } = render(<LoadingFallback />);
    
    const rippleElements = container.querySelectorAll('.animate-ripple');
    
    rippleElements.forEach(element => {
      expect(element).toHaveClass('top-1/2', 'left-1/2', '-translate-x-1/2', '-translate-y-1/2');
    });
  });
});