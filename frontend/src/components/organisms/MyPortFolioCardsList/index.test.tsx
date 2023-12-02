import { fireEvent, render, screen, waitFor } from '@testing-library/react'
import axios from 'axios'
import PortFolioCardsList from './index'
import { MemoryRouter } from 'react-router-dom'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../utils/themes'

jest.mock('axios')

describe('PortFolioCardsList', () => {
  const coinsData = [
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

  const mockedAxios = axios as jest.Mocked<typeof axios>
  mockedAxios.create.mockReturnValue(mockedAxios)
  mockedAxios.get.mockResolvedValue({ data: coinsData })

  test('renders My Portfolio heading', async () => {
    render(
      <MemoryRouter>
        <PortFolioCardsList />
      </MemoryRouter>
    )
    await waitFor(() => {
      const portfolioHeading = screen.getByText('My Portfolio')
      expect(portfolioHeading).toBeInTheDocument()
    })
  })

  test('renders PortfolioCard for each coin data', async () => {
    render(
      <MemoryRouter>
        <PortFolioCardsList />
      </MemoryRouter>
    )
  })

  test('logs error when fetching coins data fails', async () => {
    const errorMessage = 'Test error message'
    ;(axios.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage))
    const consoleSpy = jest.spyOn(console, 'log')

    render(
      <MemoryRouter>
        <PortFolioCardsList />
      </MemoryRouter>
    )

    consoleSpy.mockRestore()
  })
})
