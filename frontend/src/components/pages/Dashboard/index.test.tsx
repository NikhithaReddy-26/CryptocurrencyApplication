

import { render, waitFor, screen, fireEvent } from '@testing-library/react'
import DashboardPage from '.'
import '@testing-library/jest-dom/extend-expect'
import axios from 'axios'
import { MemoryRouter } from 'react-router-dom'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

jest.mock('axios')

describe('DashBoard Page', () => {
  const coinsData = [
    {
      id: 1,
      Name: 'Bitcoin',
      src: 'Bitcoin',
      Label: 'BTC',
      Change: '+1.06%',
      Price: [3406069.54, 350000.23],
    },
  ]

  beforeAll(() => {
    ;(axios.get as jest.Mock).mockResolvedValue({ data: { Coins: coinsData } })
  })

  test('should render DashBoard Page', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )
  })

  test('Clicking on chips', () => {
    render(
      <MemoryRouter>
        <DashboardPage />
      </MemoryRouter>
    )
    const SelectedChips = screen.getAllByTestId('ChipsClick')
    SelectedChips.forEach((item) => {
      fireEvent.click(item)
    })
  })
})