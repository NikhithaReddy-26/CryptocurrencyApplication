import { render, screen } from '@testing-library/react'
import axios from 'axios'
import { WalletCashScreen } from '.'
import { MemoryRouter } from 'react-router-dom'

jest.mock('axios')

describe('WalletCashScreen', () => {
  const mockTransactionData = [
    {
      transactionId: 1,
      walletId: 1,
      transactionPrice: 3012000.0,
      cryptoPrice: 0.001,
      date: '2023-07-26T18:30:00.000+00:00',
      fromUser: 'Badgley',
      transactionType: 'Purchased',
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

  const mockAccountBalanceData = {
    account_balance: 10000,
  }

  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.create.mockReturnValue(mockedAxios)
  mockedAxios.get.mockResolvedValue({ data: mockTransactionData })
  mockedAxios.get.mockResolvedValue({ data: mockAccountBalanceData })

  test('renders WalletCashScreen without errors', () => {
    render(
      <MemoryRouter>
        <WalletCashScreen />
      </MemoryRouter>
    )
  })

  test('displays account balance', async () => {
    render(
      <MemoryRouter>
        <WalletCashScreen />
      </MemoryRouter>
    )
  })
})
