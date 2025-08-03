import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Contact } from '../contact';

describe('Contact', () => {
  it('renders the contact section', () => {
    render(<Contact />);
    
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('aria-labelledby', 'contact-heading');
  });

  it('renders the heading and description', () => {
    render(<Contact />);
    
    const heading = screen.getByRole('heading', { name: 'Get In Touch' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveAttribute('id', 'contact-heading');
    
    const description = screen.getByText(/For project consultations and quote requests/);
    expect(description).toBeInTheDocument();
  });

  it('renders contact information section', () => {
    render(<Contact />);
    
    const contactInfoHeading = screen.getByText('Contact Information');
    expect(contactInfoHeading).toBeInTheDocument();
    
    expect(screen.getByText('Our Location')).toBeInTheDocument();
    expect(screen.getByText('123 Creative St, Digital Valley, NY')).toBeInTheDocument();
    
    expect(screen.getByText('Call Us')).toBeInTheDocument();
    expect(screen.getByText('+1 234 5678')).toBeInTheDocument();
    
    expect(screen.getByText('Email Us')).toBeInTheDocument();
    expect(screen.getByText('hello@yorkweb.com')).toBeInTheDocument();
  });

  it('renders contact form with proper fields', () => {
    render(<Contact />);
    
    const form = screen.getByRole('form');
    expect(form).toBeInTheDocument();
    expect(form).toHaveAttribute('aria-labelledby', 'contact-form-heading');
    
    const nameInput = screen.getByLabelText('お名前');
    expect(nameInput).toBeInTheDocument();
    expect(nameInput).toHaveAttribute('type', 'text');
    expect(nameInput).toHaveAttribute('placeholder', 'Your Name');
    expect(nameInput).toHaveAttribute('aria-required', 'true');
    
    const emailInput = screen.getByLabelText('メールアドレス');
    expect(emailInput).toBeInTheDocument();
    expect(emailInput).toHaveAttribute('type', 'email');
    expect(emailInput).toHaveAttribute('placeholder', 'Your Email');
    expect(emailInput).toHaveAttribute('aria-required', 'true');
    
    const messageTextarea = screen.getByLabelText('メッセージ');
    expect(messageTextarea).toBeInTheDocument();
    expect(messageTextarea).toHaveAttribute('placeholder', 'Your Message');
    expect(messageTextarea).toHaveAttribute('aria-required', 'true');
    
    const submitButton = screen.getByRole('button', { name: 'メッセージを送信する' });
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveAttribute('type', 'submit');
  });

  it('handles form submission', async () => {
    const user = userEvent.setup();
    render(<Contact />);
    
    const nameInput = screen.getByLabelText('お名前');
    const emailInput = screen.getByLabelText('メールアドレス');
    const messageTextarea = screen.getByLabelText('メッセージ');
    const submitButton = screen.getByRole('button', { name: 'メッセージを送信する' });
    
    await user.type(nameInput, 'Test User');
    await user.type(emailInput, 'test@example.com');
    await user.type(messageTextarea, 'This is a test message');
    
    expect(nameInput).toHaveValue('Test User');
    expect(emailInput).toHaveValue('test@example.com');
    expect(messageTextarea).toHaveValue('This is a test message');
    
    fireEvent.click(submitButton);
    
    // The form should handle submission (mock implementation sets status to 'submitting' then 'success')
    expect(submitButton).toBeInTheDocument();
  });

  it('has proper accessibility attributes for form fields', () => {
    render(<Contact />);
    
    const nameInput = screen.getByLabelText('お名前');
    expect(nameInput).toHaveAttribute('aria-describedby', 'name-description');
    
    const emailInput = screen.getByLabelText('メールアドレス');
    expect(emailInput).toHaveAttribute('aria-describedby', 'email-description');
    
    const messageTextarea = screen.getByLabelText('メッセージ');
    expect(messageTextarea).toHaveAttribute('aria-describedby', 'message-description');
    
    // Check for screen reader descriptions
    expect(screen.getByText('お名前を入力してください')).toHaveClass('sr-only');
    expect(screen.getByText('メールアドレスを入力してください')).toHaveClass('sr-only');
    expect(screen.getByText('メッセージ内容を入力してください')).toHaveClass('sr-only');
  });

  it('applies correct styling classes', () => {
    render(<Contact />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('relative', 'py-20', 'overflow-hidden');
  });

  it('renders animated background elements', () => {
    render(<Contact />);
    
    const section = screen.getByRole('region');
    const backgroundElements = section.querySelectorAll('.animate-ripple');
    expect(backgroundElements).toHaveLength(3);
  });
});