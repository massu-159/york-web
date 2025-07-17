import { fireEvent, render, screen } from '@testing-library/react';

import { Button } from '../button';

describe('Button', () => {
  it('renders button with default variant', () => {
    render(<Button>Test Button</Button>);

    const button = screen.getByRole('button', { name: 'Test Button' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('bg-primary');
  });

  it('renders button with destructive variant', () => {
    render(<Button variant='destructive'>Delete</Button>);

    const button = screen.getByRole('button', { name: 'Delete' });
    expect(button).toHaveClass('bg-destructive');
  });

  it('renders button with outline variant', () => {
    render(<Button variant='outline'>Outline</Button>);

    const button = screen.getByRole('button', { name: 'Outline' });
    expect(button).toHaveClass('border-input');
  });

  it('renders button with secondary variant', () => {
    render(<Button variant='secondary'>Secondary</Button>);

    const button = screen.getByRole('button', { name: 'Secondary' });
    expect(button).toHaveClass('bg-secondary');
  });

  it('renders button with ghost variant', () => {
    render(<Button variant='ghost'>Ghost</Button>);

    const button = screen.getByRole('button', { name: 'Ghost' });
    expect(button).toHaveClass('hover:bg-accent');
  });

  it('renders button with link variant', () => {
    render(<Button variant='link'>Link</Button>);

    const button = screen.getByRole('button', { name: 'Link' });
    expect(button).toHaveClass('text-primary');
  });

  it('renders button with small size', () => {
    render(<Button size='sm'>Small</Button>);

    const button = screen.getByRole('button', { name: 'Small' });
    expect(button).toHaveClass('h-9');
  });

  it('renders button with large size', () => {
    render(<Button size='lg'>Large</Button>);

    const button = screen.getByRole('button', { name: 'Large' });
    expect(button).toHaveClass('h-11');
  });

  it('renders button with icon size', () => {
    render(<Button size='icon'>🏠</Button>);

    const button = screen.getByRole('button', { name: '🏠' });
    expect(button).toHaveClass('h-10', 'w-10');
  });

  it('handles disabled state', () => {
    render(<Button disabled>Disabled</Button>);

    const button = screen.getByRole('button', { name: 'Disabled' });
    expect(button).toBeDisabled();
    expect(button).toHaveClass('disabled:pointer-events-none');
  });

  it('handles click events', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);

    const button = screen.getByRole('button', { name: 'Click Me' });
    fireEvent.click(button);

    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies custom className', () => {
    render(<Button className='custom-class'>Custom</Button>);

    const button = screen.getByRole('button', { name: 'Custom' });
    expect(button).toHaveClass('custom-class');
  });
});
