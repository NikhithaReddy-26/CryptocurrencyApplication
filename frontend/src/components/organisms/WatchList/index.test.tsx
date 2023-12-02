import React from 'react'
import { render } from '@testing-library/react'
import WatchList from './index'
import '@testing-library/jest-dom/extend-expect'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

describe('WatchList', () => {
  const mockData = [
    {
      id: 1,
      color: 'red',
      data: [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 },
      ],
    },
  ]

  const mockData2 = [
    {
      id: 1,
      color: 'green',
      data: [
        { x: 1, y: 10 },
        { x: 2, y: 20 },
        { x: 3, y: 30 },
      ],
    },
  ]

  it('renders without errors', () => {
    render(
      <WatchList
        CoinChangePercentage="-2.5%"
        WatchListIcon="watchlist-icon.png"
        CoinName="Bitcoin"
        CoinValue="$50,000"
        data={mockData}
      />
    )
  })

  it('displays the correct coin name and value', () => {
    const { getByText } = render(
      <WatchList
        CoinChangePercentage="-2.5%"
        WatchListIcon="watchlist-icon.png"
        CoinName="Bitcoin"
        CoinValue="$50,000"
        data={mockData}
      />
    )

    expect(getByText('Bitcoin')).toBeInTheDocument()
    expect(getByText('$50,000')).toBeInTheDocument()
  })

  it('displays the correct coin change percentage and color', () => {
    const { getByText } = render(
      <WatchList
        CoinChangePercentage="-2.5%"
        WatchListIcon="watchlist-icon.png"
        CoinName="Bitcoin"
        CoinValue="$50,000"
        data={mockData}
      />
    )

    const coinChangePercentage = getByText('-2.5%')
    expect(coinChangePercentage).toBeInTheDocument()
  })
  it('displays the correct coin change percentage and color', () => {
    const { getByText } = render(
      <WatchList
        CoinChangePercentage="+2.5%"
        WatchListIcon="watchlist-icon.png"
        CoinName="Bitcoin"
        CoinValue="$50,000"
        data={mockData2}
      />
    )

    const coinChangePercentage = getByText('+2.5%')
    expect(coinChangePercentage).toBeInTheDocument()
  })
})
