import { render, screen } from '@testing-library/react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '../card';

describe('Card Components', () => {
  describe('Card', () => {
    it('renders card component', () => {
      render(<Card data-testid="card">Card content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toBeInTheDocument();
      expect(card).toHaveClass('rounded-lg', 'border', 'bg-card', 'text-card-foreground', 'shadow-sm');
      expect(card).toHaveTextContent('Card content');
    });

    it('applies custom className', () => {
      render(<Card className="custom-class" data-testid="card">Content</Card>);
      
      const card = screen.getByTestId('card');
      expect(card).toHaveClass('custom-class');
    });

    it('forwards ref correctly', () => {
      const ref = { current: null };
      render(<Card ref={ref} data-testid="card">Content</Card>);
      
      expect(ref.current).toBeTruthy();
    });
  });

  describe('CardHeader', () => {
    it('renders card header component', () => {
      render(<CardHeader data-testid="card-header">Header content</CardHeader>);
      
      const header = screen.getByTestId('card-header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveClass('flex', 'flex-col', 'space-y-1.5', 'p-6');
      expect(header).toHaveTextContent('Header content');
    });

    it('applies custom className', () => {
      render(<CardHeader className="custom-header" data-testid="card-header">Content</CardHeader>);
      
      const header = screen.getByTestId('card-header');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('CardTitle', () => {
    it('renders card title as h3 element', () => {
      render(<CardTitle>Card Title</CardTitle>);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toBeInTheDocument();
      expect(title).toHaveClass('text-2xl', 'font-semibold', 'leading-none', 'tracking-tight');
      expect(title).toHaveTextContent('Card Title');
    });

    it('applies custom className', () => {
      render(<CardTitle className="custom-title">Title</CardTitle>);
      
      const title = screen.getByRole('heading', { level: 3 });
      expect(title).toHaveClass('custom-title');
    });
  });

  describe('CardDescription', () => {
    it('renders card description as paragraph', () => {
      render(<CardDescription>Card description text</CardDescription>);
      
      const description = screen.getByText('Card description text');
      expect(description).toBeInTheDocument();
      expect(description.tagName).toBe('P');
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
    });

    it('applies custom className', () => {
      render(<CardDescription className="custom-desc">Description</CardDescription>);
      
      const description = screen.getByText('Description');
      expect(description).toHaveClass('custom-desc');
    });
  });

  describe('CardContent', () => {
    it('renders card content component', () => {
      render(<CardContent data-testid="card-content">Content here</CardContent>);
      
      const content = screen.getByTestId('card-content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveClass('p-6', 'pt-0');
      expect(content).toHaveTextContent('Content here');
    });

    it('applies custom className', () => {
      render(<CardContent className="custom-content" data-testid="card-content">Content</CardContent>);
      
      const content = screen.getByTestId('card-content');
      expect(content).toHaveClass('custom-content');
    });
  });

  describe('CardFooter', () => {
    it('renders card footer component', () => {
      render(<CardFooter data-testid="card-footer">Footer content</CardFooter>);
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveClass('flex', 'items-center', 'p-6', 'pt-0');
      expect(footer).toHaveTextContent('Footer content');
    });

    it('applies custom className', () => {
      render(<CardFooter className="custom-footer" data-testid="card-footer">Footer</CardFooter>);
      
      const footer = screen.getByTestId('card-footer');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Card Component Integration', () => {
    it('renders complete card structure', () => {
      render(
        <Card data-testid="complete-card">
          <CardHeader>
            <CardTitle>Test Card</CardTitle>
            <CardDescription>This is a test card</CardDescription>
          </CardHeader>
          <CardContent>
            <p>This is the card content</p>
          </CardContent>
          <CardFooter>
            <button>Action</button>
          </CardFooter>
        </Card>
      );

      const card = screen.getByTestId('complete-card');
      expect(card).toBeInTheDocument();
      
      const title = screen.getByRole('heading', { name: 'Test Card' });
      expect(title).toBeInTheDocument();
      
      const description = screen.getByText('This is a test card');
      expect(description).toBeInTheDocument();
      
      const content = screen.getByText('This is the card content');
      expect(content).toBeInTheDocument();
      
      const action = screen.getByRole('button', { name: 'Action' });
      expect(action).toBeInTheDocument();
    });
  });
});