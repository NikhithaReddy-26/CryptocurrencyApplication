import React from 'react'
import { render, screen } from '@testing-library/react'
import RecentTransactions from '.'
import axios from 'axios'

jest.mock('axios')

const mockConsoleLog = jest.spyOn(console, 'error')
mockConsoleLog.mockImplementation(() => {})

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
];


const mockedAxios = axios as jest.Mocked<typeof axios>;
mockedAxios.create.mockReturnValue(mockedAxios);
mockedAxios.get.mockResolvedValueOnce({ data: mockTransactionData });


describe('RecentTransactions', () => {
  it('renders the header with "Recent transaction" and "View All" text', () => {
    const { getByText } = render(<RecentTransactions />)
    const headerText = getByText('Recent transactions')
    const viewAllText = getByText('View All')

    expect(headerText).toBeInTheDocument()
    expect(viewAllText).toBeInTheDocument()
  })


})
