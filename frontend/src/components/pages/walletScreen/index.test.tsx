import React from 'react'
import { act, fireEvent, render, screen } from '@testing-library/react'
import axios from 'axios'
import WalletScreen from './index'
import '@testing-library/jest-dom/extend-expect'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../utils/themes'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))
jest.mock('axios')

const mockConsoleError = jest.spyOn(console, 'log')
mockConsoleError.mockImplementation(() => {})

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))
jest.mock('axios')

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

const mockTransactionData = [
  {
    transactionId: 1,
    walletId: 1,
    transactionPrice: 3012000.0,
    cryptoPrice: 0.001,
    date: '2023-07-26T18:30:00.000+00:00',
    fromUser: 'Badgley',
    transactionType: 'Sold',
  },
  {
    transactionId: 2,
    walletId: 1,
    transactionPrice: 3512.0,
    cryptoPrice: 0.023,
    date: '2023-07-25T18:30:00.000+00:00',
    fromUser: 'Jane Cooper',
    transactionType: 'Purchased',
  },
  {
    transactionId: 3,
    walletId: 2,
    transactionPrice: 1200.0,
    cryptoPrice: 0.32345,
    date: '2023-07-26T18:30:00.000+00:00',
    fromUser: 'Badgley',
    transactionType: 'Purchased',
  },
]

const mockWatchlistData = [
  { watchlistId: 1, userId: 1, cryptocurrencyId: 3 },
  { watchlistId: 13, userId: 1, cryptocurrencyId: 2 },
]

const mockedAxios = axios as jest.Mocked<typeof axios>
mockedAxios.create.mockReturnValue(mockedAxios)
mockedAxios.get.mockResolvedValue({ data: mockCryptoData })
mockedAxios.get.mockResolvedValueOnce({ data: mockWatchlistData })
mockedAxios.get.mockResolvedValueOnce({ data: mockTransactionData })

test('renders WalletScreen component', async () => {
  await act(async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <WalletScreen />
        </MemoryRouter>
      </ThemeProvider>
    )
  })
})

test('renders WalletScreen component', async () => {
  await act(async () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <WalletScreen />
        </MemoryRouter>
      </ThemeProvider>
    )
  })
  const sidebarClick = await screen.findAllByTestId('Button')
  sidebarClick.forEach((item) => {
    fireEvent.click(item)
  })
})

describe('WalletScreen', () => {
  it('should update the value when a tab is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <WalletScreen />
        </MemoryRouter>
      </ThemeProvider>
    )

    const tabLabel = 'Overview'
    const tab = screen.getByText(tabLabel)
    fireEvent.click(tab)

    expect(tab).toBeInTheDocument()
  })

  it('should update the value when a tab is clicked', () => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter>
          <WalletScreen />
        </MemoryRouter>
      </ThemeProvider>
    )

    const tabLabel = 'Wallet'
    const tab = screen.getByText(tabLabel)
    fireEvent.click(tab)

    expect(tab).toBeInTheDocument()
  })
})

describe('WalletScreen', () => {
  const renderWalletScreen = (coinName:string) => {
    render(
      <ThemeProvider theme={theme}>
        <MemoryRouter initialEntries={[{ pathname: '/', state: { coinName } }]}>
          <WalletScreen />
        </MemoryRouter>
      </ThemeProvider>
    );
  };

  it('renders WalletScreen component with Bitcoin', async () => {
    await act(async () => {
      renderWalletScreen('Bitcoin');
    });
  });

  it('renders WalletScreen component with Ethereum', async () => {
    await act(async () => {
      renderWalletScreen('Ethereum');
    });
  });
});