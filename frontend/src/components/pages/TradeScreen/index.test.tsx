import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import TradeScreen from './index'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'

const mockConsoleError = jest.spyOn(console, 'log')
mockConsoleError.mockImplementation(() => {})

jest.mock('axios');

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
];

const mockWatchlistData = [
  { watchlistId: 1, userId: 1, cryptocurrencyId: 3 },
  { watchlistId: 13, userId: 1, cryptocurrencyId: 2},
];

const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockReturnValue(mockedAxios);
mockedAxios.get.mockResolvedValue({ data: mockCryptoData });
mockedAxios.get.mockResolvedValueOnce({ data: mockWatchlistData });

test('renders WalletScreen component', async () => {
    render(
      <MemoryRouter>
        <TradeScreen />
      </MemoryRouter>
    )
  })

test('renders tab1 correctly', () => {
  render(
    <MemoryRouter>
      <TradeScreen />
    </MemoryRouter>
  )
  const myComponentElement = screen.getByTestId('tab1')
  expect(myComponentElement).toBeInTheDocument()
  fireEvent.click(myComponentElement)
})

test('renders MyComponent correctly', async () => {
  render(
    <MemoryRouter>
      <TradeScreen />
    </MemoryRouter>
  )
  const myComponentElement = screen.getByTestId('tab2')
  expect(myComponentElement).toBeInTheDocument()
  fireEvent.click(myComponentElement)
})

test('clicking watchlisted icon', async () => {
  render(
    <MemoryRouter>
      <TradeScreen />
    </MemoryRouter>
  )
  const tabClick = await screen.findByTestId('tab1')
  fireEvent.click(tabClick)
  const WatchList = await screen.findAllByTestId('trade-card-icon')
  WatchList.forEach((item) => {
    fireEvent.click(item)
  })
})


test('clicking watchlisted icon', async () => {
  render(
    <MemoryRouter>
      <TradeScreen />
    </MemoryRouter>
  )
  const tabClick = await screen.findByTestId('tab1')
  fireEvent.click(tabClick)
  const WatchList = await screen.findAllByTestId('trade-card')
  WatchList.forEach((item) => {
    fireEvent.click(item)
  })
})

