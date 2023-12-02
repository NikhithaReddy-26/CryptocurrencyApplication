import React from 'react'
import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { PaymentSuccessfulScreen } from './index'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')

const responseDataMock = {
  id: '1',
  name: 'John Doe',
  accountBalance: 1000,
  holdings: [
    {
      coinName: 'Bitcoin',
      coinLabel: 'BTC',
      purchaseVolume: 0.5,
      Wallet: {
        Bitcoin: [
          {
            id: 1,
            Name: 'Bitcoin',
            Date: {
              Month: 'Jul',
              Day: '20',
            },
            purchasePrice: 40000,
            transactionType: 'Purchase',
            transactionExchangeValue: 0.5 * 40000,
            increasePrice: 42000,
          },
        ],
      },
    },
    {
      coinName: 'Ethereum',
      coinLabel: 'ETH',
      purchaseVolume: 5,
      Wallet: {
        Ethereum: [
          {
            id: 1,
            Name: 'Ethereum',
            Date: {
              Month: 'Jul',
              Day: '20',
            },
            purchasePrice: 3000,
            transactionType: 'Purchase',
            transactionExchangeValue: 5 * 3000,
            increasePrice: 3500,
          },
        ],
      },
    },
  ],
}

const mockedAxiosGet = axios.get as jest.MockedFunction<typeof axios.get>
const mockedAxiosPut = axios.put as jest.MockedFunction<typeof axios.put>

beforeEach(() => {
  mockedAxiosGet.mockResolvedValueOnce({ data: responseDataMock })
  mockedAxiosPut.mockResolvedValueOnce({ data: responseDataMock })
})

afterEach(() => {
  jest.clearAllMocks()
})

const renderComponent = (locationState: any) => {
  render(
    <MemoryRouter initialEntries={['/trade', { state: locationState }]}>
      <PaymentSuccessfulScreen />
    </MemoryRouter>
  )
}

test('renders loading text while fetching data', async () => {
  mockedAxiosGet.mockResolvedValueOnce({ data: null })
  const locationState = {
    defaultCoin: 'Bitcoin',
    type: 'Purchased',
    CoinValue: 20000,
  }
  renderComponent(locationState)
})

test('renders the success screen with the correct data', () => {
  mockedAxiosGet.mockResolvedValueOnce({ data: responseDataMock })

  const locationState = {
    defaultCoin: 'Bitcoin',
    type: 'Purchased',
    CoinValue: 20000,
  }
  renderComponent(locationState)
})

test('handles button click and updates the user data', async () => {
  mockedAxiosGet.mockResolvedValueOnce({ data: responseDataMock })

  const locationState = {
    defaultCoin: 'Bitcoin',
    type: 'Purchased',
    CoinValue: 20000,
  }
  renderComponent(locationState)
  const goToUSDButton = await screen.findByTestId('Page-button-click')
  fireEvent.click(goToUSDButton)
  // expect(mockedAxiosPut).toHaveBeenCalledTimes(1)
})

test('renders loading text while fetching data', async () => {
  mockedAxiosGet.mockResolvedValueOnce({ data: null })
  const locationState = {
    defaultCoin: 'Ethereum',
    type: 'Purchased',
    CoinValue: 20000,
  }
  renderComponent(locationState)
})

test('renders the success screen with the correct data', async () => {
  mockedAxiosGet.mockResolvedValueOnce({ data: responseDataMock })

  const locationState = {
    defaultCoin: 'Ethereum',
    type: 'Purchased',
    CoinValue: 20000,
  }
  renderComponent(locationState)
})

test('handles button click and updates the user data', async () => {
  mockedAxiosGet.mockResolvedValueOnce({ data: responseDataMock })

  const locationState = {
    defaultCoin: 'Ethereum',
    type: 'Purchased',
    CoinValue: 20000,
  }
  renderComponent(locationState)
  const goToUSDButton = await screen.findByTestId('Page-button-click')
  fireEvent.click(goToUSDButton)
})
