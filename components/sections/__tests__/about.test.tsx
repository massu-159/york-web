import { render, screen } from '@testing-library/react';
import { About } from '../about';

// Mock Next.js Image component
jest.mock('next/image', () => {
  return function MockImage({ src, alt, ...props }: any) {
    return <img src={src} alt={alt} {...props} />;
  };
});

describe('About', () => {
  it('renders the about section', () => {
    render(<About />);
    
    const section = screen.getByRole('region');
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute('id', 'about');
  });

  it('renders the section heading and description', () => {
    render(<About />);
    
    const categoryLabel = screen.getByText('About Our Studio');
    expect(categoryLabel).toBeInTheDocument();
    expect(categoryLabel).toHaveClass('text-pink-500');
    
    const heading = screen.getByRole('heading', { name: 'We Create Digital Experiences' });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass('text-3xl', 'font-bold');
    
    const description = screen.getByText(/Founded in 2015, York.web has been/);
    expect(description).toBeInTheDocument();
  });

  it('renders the about image', () => {
    render(<About />);
    
    const aboutImage = screen.getByAltText('About us');
    expect(aboutImage).toBeInTheDocument();
    expect(aboutImage).toHaveAttribute('src', 'https://images.unsplash.com/photo-1600880292203-757bb62b4baf?auto=format&fit=crop&w=800&q=80');
  });

  it('renders statistics cards', () => {
    render(<About />);
    
    const happyClientsCard = screen.getByText('250+');
    expect(happyClientsCard).toBeInTheDocument();
    expect(happyClientsCard).toHaveClass('text-3xl', 'font-bold', 'text-pink-500');
    expect(screen.getByText('Happy Clients')).toBeInTheDocument();
    
    const projectsCard = screen.getByText('120+');
    expect(projectsCard).toBeInTheDocument();
    expect(projectsCard).toHaveClass('text-3xl', 'font-bold', 'text-pink-500');
    expect(screen.getByText('Projects')).toBeInTheDocument();
    
    const experienceCard = screen.getByText('8');
    expect(experienceCard).toBeInTheDocument();
    expect(experienceCard).toHaveClass('text-3xl', 'font-bold', 'text-pink-500');
    expect(screen.getByText('Years Experience')).toBeInTheDocument();
  });

  it('applies correct styling classes', () => {
    render(<About />);
    
    const section = screen.getByRole('region');
    expect(section).toHaveClass('relative', 'py-20', 'bg-muted', 'overflow-hidden');
  });

  it('has proper grid layout', () => {
    render(<About />);
    
    const gridContainer = screen.getByRole('region').querySelector('.grid.md\\:grid-cols-2');
    expect(gridContainer).toBeInTheDocument();
    expect(gridContainer).toHaveClass('gap-12', 'items-center');
  });

  it('renders animated background elements', () => {
    render(<About />);
    
    const section = screen.getByRole('region');
    const backgroundElements = section.querySelectorAll('.animate-ripple');
    expect(backgroundElements).toHaveLength(3);
    
    backgroundElements.forEach((element, index) => {
      expect(element).toHaveClass('absolute', 'w-96', 'h-96', 'bg-pink-500/10', 'rounded-full');
      if (index === 1) {
        expect(element).toHaveClass('[animation-delay:2s]');
      } else if (index === 2) {
        expect(element).toHaveClass('[animation-delay:4s]');
      }
    });
  });

  it('has hover effects on statistics cards', () => {
    render(<About />);
    
    const statsCards = screen.getByRole('region').querySelectorAll('.hover\\:translate-y-2');
    expect(statsCards).toHaveLength(3);
    
    statsCards.forEach(card => {
      expect(card).toHaveClass('transition-all', 'duration-300', 'hover:translate-y-2', 'shadow-lg', 'shadow-pink-500/20', 'hover:shadow-none');
    });
  });

  it('has proper image container styling', () => {
    render(<About />);
    
    const imageContainer = screen.getByAltText('About us').parentElement;
    expect(imageContainer).toHaveClass('relative', 'h-[400px]');
    
    const image = screen.getByAltText('About us');
    expect(image).toHaveClass('object-cover', 'rounded-lg');
  });

  it('renders statistics in proper grid layout', () => {
    render(<About />);
    
    const statsContainer = screen.getByText('250+').closest('.grid');
    expect(statsContainer).toHaveClass('grid-cols-3', 'gap-8', 'text-center');
  });
});