import { render, screen } from '@testing-library/react'
import { Navigation } from '../navigation'

jest.mock('../../theme-toggle', () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>
}))

jest.mock('next/image', () => ({
  __esModule: true,
  default: ({ src, alt, ...props }: any) => (
    <img src={src} alt={alt} {...props} />
  )
}))

describe('Navigation', () => {
  it('renders the navigation component', () => {
    render(<Navigation />)
    
    expect(screen.getByText('York.')).toBeInTheDocument()
    expect(screen.getByText('web')).toBeInTheDocument()
    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument()
  })

  it('renders the brand text', () => {
    render(<Navigation />)
    
    expect(screen.getByText('York.')).toBeInTheDocument()
    expect(screen.getByText('web')).toBeInTheDocument()
  })

  it('renders navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Home')).toBeInTheDocument()
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Portfolio')).toBeInTheDocument()
    expect(screen.getByText('Contact')).toBeInTheDocument()
  })

  it('has correct href attributes for navigation links', () => {
    render(<Navigation />)
    
    expect(screen.getByText('Home').closest('a')).toHaveAttribute('href', '#')
    expect(screen.getByText('About').closest('a')).toHaveAttribute('href', '#about')
    expect(screen.getByText('Services').closest('a')).toHaveAttribute('href', '#services')
    expect(screen.getByText('Portfolio').closest('a')).toHaveAttribute('href', '#portfolio')
    expect(screen.getByText('Contact').closest('a')).toHaveAttribute('href', '#contact')
  })
})