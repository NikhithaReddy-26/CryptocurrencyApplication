
import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Sidebar from '.'
import { MemoryRouter } from 'react-router-dom'

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    logout: jest.fn(),
  }),
}))

describe('Sidebar', () => {
  const mockDashboardClick = jest.fn()
  const mockLogoutClick = jest.fn()

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should call the onDashboardClick callback when the dashboard icon is clicked', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Sidebar onDashboardClick={mockDashboardClick} />
      </MemoryRouter>
    )

    const dashboardIcon = getByLabelText('Dashboard')

    fireEvent.click(dashboardIcon)

    expect(mockDashboardClick).toHaveBeenCalled()
  })

  it('should call the onLogoutClick callback when the logout icon is clicked', () => {
    const { getByLabelText } = render(
      <MemoryRouter>
        <Sidebar onDashboardClick={mockDashboardClick} />
      </MemoryRouter>
    )

    const logoutIcon = getByLabelText('Logout')

    fireEvent.click(logoutIcon)
  })
})