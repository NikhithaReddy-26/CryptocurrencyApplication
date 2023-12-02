import { render, screen } from '@testing-library/react'
import PaymentCard from './index'

describe('PaymentCard', () => {
  test('renders title', () => {
    render(<PaymentCard title="Test Title" />)
    expect(screen.getByText('Test Title')).toBeInTheDocument()
  })

  test('renders heading1 and description', () => {
    render(
      <PaymentCard
        heading1="Heading"
        description="Description"
        balanceAmount="10"
      />
    )
    expect(screen.getByText('Heading')).toBeInTheDocument()
    expect(screen.getByText('Description10')).toBeInTheDocument()
  })

  test('renders otherText', () => {
    render(<PaymentCard otherText="Other Text" />)
    expect(screen.getByText('Other Text')).toBeInTheDocument()
  })

  test('renders null values gracefully', () => {
    render(<PaymentCard />)
    expect(screen.queryByText('Test Title')).toBeNull()
    expect(screen.queryByText('Heading')).toBeNull()
    expect(screen.queryByText('Description10')).toBeNull()
    expect(screen.queryByText('Other Text')).toBeNull()
  })
})
