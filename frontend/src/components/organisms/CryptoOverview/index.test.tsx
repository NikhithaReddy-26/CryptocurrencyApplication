import React from 'react'
import { render } from '@testing-library/react'
import CryptoOverview from '.'
import '@testing-library/jest-dom/extend-expect'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

describe('CryptoOverview', () => {
  const defaultProps = {
    coinValue: 1234.56,
    coinChangePercentage: '-1.23%',
  }

  const defaultProps2 = {
    coinValue: 1234.56,
    coinChangePercentage: '+1.23%',
  }

  it('renders the component with the correct props positive', () => {
    const { getByText, getByTestId } = render(
      <CryptoOverview {...defaultProps} />
    )
  })

  it('renders the component with the correct props negetive', () => {
    const { getByText, getByTestId } = render(
      <CryptoOverview {...defaultProps2} />
    )
  })
})
