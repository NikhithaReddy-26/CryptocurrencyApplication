import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Header from './'

describe('Header', () => {
  const mockProps = {
    headerName: 'Trade',
    onBuyClick: jest.fn(),
    onSellClick: jest.fn(),
  }

  afterEach(() => {
    jest.clearAllMocks()
  })


  it('calls onBuyClick when Buy button is clicked', () => {
    const { getByText } = render(<Header {...mockProps} />)
    const buyButton = getByText('BUY')

    fireEvent.click(buyButton)

    expect(mockProps.onBuyClick).toHaveBeenCalled()
  })

  it('calls onSellClick when Sell button is clicked', () => {
    const { getByText } = render(<Header {...mockProps} />)
    const sellButton = getByText('SELL')

    fireEvent.click(sellButton)

    expect(mockProps.onSellClick).toHaveBeenCalled()
  })

  it('does not render Buy and Sell buttons when headerName is "Checkout"', () => {
    const checkoutProps = {
      ...mockProps,
      headerName: 'Checkout',
    }
    const { queryByText } = render(<Header {...checkoutProps} />)
    const buyButton = queryByText('BUY')
    const sellButton = queryByText('SELL')

    expect(buyButton).toBeNull()
    expect(sellButton).toBeNull()
  })
})
