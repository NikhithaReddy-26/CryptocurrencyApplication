import { render, screen } from '@testing-library/react'
import { Footer } from './index'

describe('Footer', () => {
  it('renders Footer component', () => {
    render(<Footer />)

    expect(screen.getByText('Dashboard')).toBeInTheDocument()
    expect(screen.getByText('Careers')).toBeInTheDocument()
  })
})