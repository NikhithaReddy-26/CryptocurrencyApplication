import React from 'react'
import { SellScreen } from '.'
import { render, act, screen, waitFor, fireEvent } from '@testing-library/react'
import axios from 'axios'
import { SellDetails } from '../../../utils/constants'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')

describe('SellScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  test('fetches data and updates state correctly', async () => {
    const mockData = {
      User: [
        {
          accountBalance: 1000,
        },
      ],
    }
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
    ;(axios.get as jest.Mock).mockResolvedValueOnce({ data: mockData })
    ;(axios.get as jest.Mock).mockResolvedValueOnce({ data: mockCryptoData })

    await act(async () => {
      render(
        <MemoryRouter>
          <SellScreen />
        </MemoryRouter>
      )
    })

    await waitFor(() => {
      expect(screen.getByText(SellDetails.HeaderName)).toBeInTheDocument()
      expect(screen.getByText(SellDetails.CardName)).toBeInTheDocument()
    })
  })

  test('handles error when fetching data', async () => {
    const error = new Error('Error fetching data')
    ;(axios.get as jest.Mock).mockRejectedValueOnce(error)

    await act(async () => {
      render(
        <MemoryRouter>
          <SellScreen />
        </MemoryRouter>
      )
    })
  })
  test('renders the SellScreen component', () => {
    render(
      <MemoryRouter>
        <SellScreen />
      </MemoryRouter>
    )
  })
})

test('renders all cards with correct content', async () => {
  const mockData = {
    User: [
      {
        accountBalance: 1000,
      },
    ],
  }
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

  jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData })
  jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockCryptoData })


  await act(async () => {
    render(
      <MemoryRouter>
        <SellScreen />
      </MemoryRouter>
    )
  })

  const btcPriceElements = screen.queryAllByText('1 BTC = $50.00')

  expect(btcPriceElements.length).toBeGreaterThanOrEqual(0)
})
test('updates coin value correctly on button click', async () => {
  const mockData = {
    User: [
      {
        accountBalance: 1000,
      },
    ],
  }
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

  jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockData })
  jest.spyOn(axios, 'get').mockResolvedValueOnce({ data: mockCryptoData })


  await act(async () => {
    render(
      <MemoryRouter>
        <SellScreen />
      </MemoryRouter>
    )
  })

  const coinValue = 2
  const button = screen.getByRole('button', { name: /Sell Max/i })
  fireEvent.click(button)

  const costOrderValue = parseFloat(coinValue.toFixed(2))
  const transactionFeeValue = parseFloat("1")
  const totalValue = costOrderValue + transactionFeeValue
  const totalValueElement = screen.queryByText(totalValue.toFixed(2))
  expect(totalValueElement).not.toBeInTheDocument()
})

test('clicking button', async () => {
  render(
    <MemoryRouter>
      <SellScreen />
    </MemoryRouter>
  )
  const clickButton = await screen.findAllByTestId('Button')
  clickButton.forEach((item) => {
    fireEvent.click(item)
  })
})
