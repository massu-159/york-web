import { render, screen } from '@testing-library/react';
import { useForm } from 'react-hook-form';
import * as React from 'react';
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from '../form';
import { useEffect } from 'react';

// Test component that uses the form components
function TestFormComponent() {
  const form = useForm({
    defaultValues: {
      username: '',
    },
  });

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Username</FormLabel>
              <FormControl>
                <input placeholder="Enter username" {...field} />
              </FormControl>
              <FormDescription>
                This is your public display name.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

// Test component with form errors
function TestFormWithError() {
  const form = useForm({
    defaultValues: {
      email: '',
    },
  });

  // Use useEffect to set error after component mounts to avoid infinite re-renders
  useEffect(() => {
    form.setError('email', {
      type: 'manual',
      message: 'Email is required',
    });
  }, [form]);

  return (
    <Form {...form}>
      <form>
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <input type="email" placeholder="Enter email" {...field} />
              </FormControl>
              <FormDescription>
                We'll never share your email.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );
}

describe('Form Components', () => {
  describe('Form Integration', () => {
    it('renders complete form structure', () => {
      render(<TestFormComponent />);

      const label = screen.getByText('Username');
      expect(label).toBeInTheDocument();

      const input = screen.getByPlaceholderText('Enter username');
      expect(input).toBeInTheDocument();

      const description = screen.getByText('This is your public display name.');
      expect(description).toBeInTheDocument();
    });

    it('displays form validation errors', () => {
      render(<TestFormWithError />);

      const errorMessage = screen.getByText('Email is required');
      expect(errorMessage).toBeInTheDocument();
      expect(errorMessage).toHaveClass('text-sm', 'font-medium', 'text-destructive');
    });

    it('applies error styling to label when field has error', () => {
      render(<TestFormWithError />);

      const label = screen.getByText('Email');
      expect(label).toHaveClass('text-destructive');
    });
  });

  describe('FormItem', () => {
    it('renders form item with proper spacing', () => {
      render(
        <FormItem data-testid="form-item">
          <div>Form item content</div>
        </FormItem>
      );

      const formItem = screen.getByTestId('form-item');
      expect(formItem).toBeInTheDocument();
      expect(formItem).toHaveClass('space-y-2');
    });

    it('applies custom className', () => {
      render(
        <FormItem className="custom-item" data-testid="form-item">
          <div>Content</div>
        </FormItem>
      );

      const formItem = screen.getByTestId('form-item');
      expect(formItem).toHaveClass('custom-item');
    });
  });

  describe('FormDescription', () => {
    it('renders form description with proper styling', () => {
      const form = useForm();
      
      render(
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormDescription>
                  This is a description
                </FormDescription>
              </FormItem>
            )}
          />
        </Form>
      );

      const description = screen.getByText('This is a description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveClass('text-sm', 'text-muted-foreground');
      expect(description.tagName).toBe('P');
    });
  });

  describe('FormMessage', () => {
    it('renders nothing when no error or children', () => {
      const form = useForm();
      
      const { container } = render(
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormMessage />
              </FormItem>
            )}
          />
        </Form>
      );

      // FormMessage should render nothing when no error
      const messageElements = container.querySelectorAll('p');
      const errorMessage = Array.from(messageElements).find(el => 
        el.className.includes('text-destructive')
      );
      expect(errorMessage).toBeUndefined();
    });

    it('renders custom children when provided', () => {
      const form = useForm();
      
      render(
        <Form {...form}>
          <FormField
            control={form.control}
            name="test"
            render={() => (
              <FormItem>
                <FormMessage>Custom message</FormMessage>
              </FormItem>
            )}
          />
        </Form>
      );

      const message = screen.getByText('Custom message');
      expect(message).toBeInTheDocument();
      expect(message).toHaveClass('text-sm', 'font-medium', 'text-destructive');
    });
  });

  describe('FormControl', () => {
    it('applies proper accessibility attributes', () => {
      render(<TestFormComponent />);

      const input = screen.getByPlaceholderText('Enter username');
      expect(input).toHaveAttribute('aria-describedby');
      expect(input).toHaveAttribute('aria-invalid', 'false');
    });

    it('updates aria-invalid when field has error', () => {
      render(<TestFormWithError />);

      const input = screen.getByPlaceholderText('Enter email');
      expect(input).toHaveAttribute('aria-invalid', 'true');
    });
  });
});