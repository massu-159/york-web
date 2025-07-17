import { render, screen } from '@testing-library/react';

import { Footer } from '../footer';

describe('Footer', () => {
  it('renders the footer component', () => {
    render(<Footer />);

    expect(screen.getByText('York.')).toBeInTheDocument();
    expect(screen.getByText('web')).toBeInTheDocument();
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

  it('renders copyright information', () => {
    render(<Footer />);

    expect(
      screen.getByText(/© 2024 York\.web All Rights Reserved\./),
    ).toBeInTheDocument();
  });
});
