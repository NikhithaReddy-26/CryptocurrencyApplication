import React from 'react'
import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import WatchListGraph from './index'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

const mockCryptoData = [
  {
    cryptoId: 1,
    apiId: 'bitcoin',
    cryptoName: 'Bitcoin',
    cryptoLabel: 'BTC',
    marketCapital: 5.6151227951049805,
    circulatingSupply: 1.9449268579483032,
    currentPrice: 29052.0,
    unitChange: '-0.015%',
    volume: 4.999,
  },
  {
    cryptoId: 2,
    apiId: 'ethereum',
    cryptoName: 'Ethereum',
    cryptoLabel: 'ETH',
    marketCapital: 2.2040700912475586,
    circulatingSupply: 1.2015999555587769,
    currentPrice: 1833.800048828125,
    unitChange: '-0.231%',
    volume: 2.93,
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


const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.create.mockReturnValue(mockedAxios)
mockedAxios.get.mockResolvedValue({ data: mockCryptoData })
mockedAxios.get.mockResolvedValue({ data: mockData2 })
mockedAxios.get.mockResolvedValue({ data: mockData })



describe('WatchListGraph', () => {
  test('renders correctly', async () => {
    render(
      <MemoryRouter>
        <WatchListGraph />
      </MemoryRouter>
    )
    const portfolioHeading = await screen.findByText('Watchlist')
    expect(portfolioHeading).toBeInTheDocument()
  })
  it('should render watchlist items', async () => {
    render(
      <MemoryRouter>
        <WatchListGraph />
      </MemoryRouter>
    )
  })
})
