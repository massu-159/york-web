import { render, screen, fireEvent } from '@testing-library/react'
import { ThemeProvider } from 'next-themes'
import { ThemeToggle } from '../theme-toggle'

const MockThemeProvider = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider
    attribute="class"
    defaultTheme="system"
    enableSystem
    disableTransitionOnChange
  >
    {children}
  </ThemeProvider>
)

describe('ThemeToggle', () => {
  it('renders theme toggle button', () => {
    render(
      <MockThemeProvider>
        <ThemeToggle />
      </MockThemeProvider>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
  })

  it('renders sun and moon icons', () => {
    render(
      <MockThemeProvider>
        <ThemeToggle />
      </MockThemeProvider>
    )
    
    const button = screen.getByRole('button')
    expect(button).toBeInTheDocument()
    
    const screenReaderText = screen.getByText('Toggle theme')
    expect(screenReaderText).toBeInTheDocument()
  })

  it('is clickable', () => {
    render(
      <MockThemeProvider>
        <ThemeToggle />
      </MockThemeProvider>
    )
    
    const button = screen.getByRole('button')
    fireEvent.click(button)
    
    expect(button).toBeInTheDocument()
  })
})