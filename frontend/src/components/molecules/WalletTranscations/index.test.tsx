import React from 'react'
import { render } from '@testing-library/react'
import { TransactionCard } from '.'

describe('TransactionCard', () => {
  const mockProps = {
    month: 'Feb',
    day: 25,
    currencyName: 'Bitcoin',
    imgSource: 'image-url',
    from: 'Jane Cooper',
    status: 'Purchased',
    currencyValue: '+ 0.0010 BTC',
    convertedAmount: '+$1800',
  }

  it('should render without errors', () => {
    render(<TransactionCard {...mockProps} />)
  })

  it('should render all provided props', () => {
    const { getByText, getByAltText } = render(
      <TransactionCard {...mockProps} />
    )

    expect(getByText('Feb')).toBeInTheDocument()
    expect(getByText(/25/)).toBeInTheDocument()
    expect(getByText('Bitcoin')).toBeInTheDocument()
    expect(getByText(/Jane.*Cooper/)).toBeInTheDocument()
    expect(getByText('Purchased')).toBeInTheDocument()
    expect(getByText('+ 0.0010 BTC')).toBeInTheDocument()
    expect(getByText('+$1800')).toBeInTheDocument()
    expect(getByAltText('Transaction status Image')).toBeInTheDocument()
  })

  it('should gracefully handle missing optional props', () => {
    const { getByText } = render(<TransactionCard status="Purchased" />)

    expect(getByText('Purchased')).toBeInTheDocument()
    expect(() => getByText('Feb')).toThrow()
    expect(() => getByText('25')).toThrow()
    expect(() => getByText('Bitcoin')).toThrow()
    expect(() => getByText('Jane Cooper')).toThrow()
    expect(() => getByText('+ 0.0010 BTC')).toThrow()
    expect(() => getByText('+$1800')).toThrow()
  })
})
