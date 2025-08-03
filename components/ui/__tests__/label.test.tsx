import { render, screen } from '@testing-library/react';
import { Label } from '../label';

describe('Label', () => {
  it('renders label component', () => {
    render(<Label>Test Label</Label>);
    
    const label = screen.getByText('Test Label');
    expect(label).toBeInTheDocument();
    expect(label.tagName).toBe('LABEL');
  });

  it('applies default styling classes', () => {
    render(<Label>Styled Label</Label>);
    
    const label = screen.getByText('Styled Label');
    expect(label).toHaveClass('text-sm', 'font-medium', 'leading-none', 'peer-disabled:cursor-not-allowed', 'peer-disabled:opacity-70');
  });

  it('applies custom className', () => {
    render(<Label className="custom-label">Custom Label</Label>);
    
    const label = screen.getByText('Custom Label');
    expect(label).toHaveClass('custom-label');
    // Should still have default classes
    expect(label).toHaveClass('text-sm', 'font-medium');
  });

  it('forwards ref correctly', () => {
    const ref = { current: null };
    render(<Label ref={ref}>Ref Label</Label>);
    
    expect(ref.current).toBeTruthy();
  });

  it('handles htmlFor attribute', () => {
    render(<Label htmlFor="test-input">Input Label</Label>);
    
    const label = screen.getByText('Input Label');
    expect(label).toHaveAttribute('for', 'test-input');
  });

  it('supports accessibility attributes', () => {
    render(
      <Label 
        htmlFor="email-input" 
        aria-describedby="email-description"
      >
        Email Address
      </Label>
    );
    
    const label = screen.getByText('Email Address');
    expect(label).toHaveAttribute('for', 'email-input');
    expect(label).toHaveAttribute('aria-describedby', 'email-description');
  });

  it('handles custom props', () => {
    render(
      <Label 
        data-testid="custom-label"
        title="Label tooltip"
      >
        Custom Props Label
      </Label>
    );
    
    const label = screen.getByTestId('custom-label');
    expect(label).toHaveAttribute('title', 'Label tooltip');
    expect(label).toHaveTextContent('Custom Props Label');
  });

  it('works with form controls', () => {
    render(
      <div>
        <Label htmlFor="username">Username</Label>
        <input id="username" type="text" />
      </div>
    );
    
    const label = screen.getByText('Username');
    const input = screen.getByRole('textbox');
    
    expect(label).toHaveAttribute('for', 'username');
    expect(input).toHaveAttribute('id', 'username');
  });

  it('maintains displayName from Radix primitive', () => {
    expect(Label.displayName).toBeDefined();
  });
});