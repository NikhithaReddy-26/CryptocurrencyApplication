import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom'
import TradeCard from './'

describe('TradeCard', () => {
  const mockProps = {
    coinName: 'Bitcoin',
    coinSrc: '/path/to/image',
    coinCaption: 'BTC',
    coinPrice: 10000,
    coinMarketCap: '$2000T',
    coinisWatchListed: false,
    onClick: jest.fn(),
    boxClick: jest.fn(),
  }

  const mockPropsWithTrue = {
    coinName: 'Bitcoin',
    coinSrc: 'path/to/bitcoin-image.png',
    coinCaption: 'Digital Currency',
    coinPrice: 47000,
    coinChange: '+2.5%',
    coinMarketCap: '$900B',
    coinisWatchListed: true,
    onClick: jest.fn(),
    boxClick: jest.fn(),
  }

  it('displays positive change with green color', () => {
    const propsWithPositiveChange = { ...mockProps, coinChange: '+5.0%' }
    render(<TradeCard {...propsWithPositiveChange} />)
    const changeText = screen.getByText('+5.0%')
    expect(changeText).toHaveStyle('color: green')
  })

  it('displays negative change with red color', () => {
    const propsWithNegativeChange = { ...mockProps, coinChange: '-3.2%' }
    render(<TradeCard {...propsWithNegativeChange} />)
    const changeText = screen.getByText('-3.2%')
    expect(changeText).toHaveStyle('color: red')
  })

  it('calls boxClick when the card is clicked', () => {
    render(<TradeCard {...mockProps} />)
    fireEvent.click(screen.getByTestId('trade-card'))
    expect(mockProps.boxClick).toHaveBeenCalledTimes(1)
  })

  it('calls onClick when star icon is clicked', () => {
    const { getByTestId } = render(<TradeCard {...mockPropsWithTrue} />)
    const tradeCard = getByTestId('trade-card')
    const iconComponent = getByTestId('trade-card-icon')

    fireEvent.click(iconComponent)
  })
})
