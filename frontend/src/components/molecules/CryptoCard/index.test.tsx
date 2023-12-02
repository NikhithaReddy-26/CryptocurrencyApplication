import React from 'react'
import { render } from '@testing-library/react'
import CryptoCard, { CardProps } from './index'

describe('CryptoCard', () => {
  const cardData: CardProps = {
    icon: 'BItcoin.svg',
    title: 'Bitcoin',
    price: '$3,406,069.54',
    isSelected: false
  }

  it('renders the card with correct data', () => {
    const { getByText } = render(<CryptoCard {...cardData} />)

    expect(getByText('Bitcoin')).toBeInTheDocument()
    expect(getByText('$3,406,069.54')).toBeInTheDocument()
  })

  it('renders the tick image when isSelected is true', () => {
    const { getByAltText } = render(
      <CryptoCard {...cardData} isSelected={true} />
    )

    expect(getByAltText('Tick')).toBeInTheDocument()
  })

  it('does not render the tick image when isSelected is false', () => {
    const { queryByAltText } = render(
      <CryptoCard {...cardData} isSelected={false} />
    )

    expect(queryByAltText('Tick')).toBeNull()
  })

})
