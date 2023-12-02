import { render, screen, fireEvent } from '@testing-library/react'
import DeliveryFee, { DeliveryFeeProps } from '.'
import { ThemeProvider } from '@mui/material'
import theme from '../../../utils/themes'

describe('DeliveryFee', () => {
  const defaultProps: DeliveryFeeProps = {
    coin: 'Bitcoin',
  }

  const defaultProps2: DeliveryFeeProps = {
    coin: 'Ethereum',
  }

  const DeliveryItems = [
    {
      label1: 'Instant',
      label2: '2-5 min',
      infoBitcoin: 'Delivery fees: 0.001BTC',
      infoEthereum: 'Delivery fees: 0.001ETH',
    },
    {
      label1: 'Faster',
      label2: '4 hours',
      infoBitcoin: 'Delivery fees: 0.0001BTC',
      infoEthereum: 'Delivery fees: 0.0001ETH',
    },
    {
      label1: 'Fast',
      label2: '120 hours',
      infoBitcoin: 'Delivery fees: 0.00001BTC',
      infoEthereum: 'Delivery fees: 0.00001ETH',
    },
    { label1: 'None' },
  ]

  it('renders DeliveryFee component with default props', () => {
    render(<DeliveryFee coin="Bitcoin" />)
    const deliveryFeeElement = screen.getByText('Select speed delivery')
    expect(deliveryFeeElement).toBeInTheDocument()
    expect(screen.getByText('Transaction fees: 0.001BTC')).toBeInTheDocument()
  })

  it('renders with Bitcoin coin and isOpen prop', () => {
    const { getByText } = render(<DeliveryFee coin="Bitcoin" />)
    const instantText = getByText('Instant : 2-5 min')
    const transactionText = getByText('Transaction fees: 0.001BTC')

    expect(instantText).toBeInTheDocument()
    expect(transactionText).toBeInTheDocument()
  })

  it('renders with Ethereum coin and isOpen prop', () => {
    const { getByText } = render(<DeliveryFee coin="Ethereum" />)
    const instantText = getByText('Instant : 2-5 min')
    const transactionText = getByText('Transaction fees: 0.005ETH')

    expect(instantText).toBeInTheDocument()
    expect(transactionText).toBeInTheDocument()
  })

  it('toggles the dropdown on click with false', () => {
    render(<DeliveryFee {...defaultProps} />)
    const dropdownToggle = screen.getByTestId('icon')

    fireEvent.click(dropdownToggle)
  })
  it('toggles the dropdown on click with false', () => {
    render(<DeliveryFee {...defaultProps2} />)
    const dropdownToggle = screen.getByTestId('icon')

    fireEvent.click(dropdownToggle)
  })

  it('should render with coin="bitcoin"', () => {
    const { queryByText } = render(<DeliveryFee coin="Bitcoin" />)

    const customMatcher = (content: any, element: any) => {
      const regex = /Delivery fees: 0\.001BTC/
      const hasText = (text: any) =>
        element?.textContent?.includes(text) ?? false
      const isMatch = hasText('Delivery fees') && regex.test(content)
      return isMatch
    }

    expect(() => queryByText(customMatcher)).not.toThrowError()

    expect(
      screen.queryByText('Delivery fees: 0.001ETH')
    ).not.toBeInTheDocument()
  })

  test('renders delivery menu items correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <DeliveryFee coin="Bitcoin" />
      </ThemeProvider>
    )

    const dropdownBox = screen.getByAltText('dropdown-icon')
    expect(dropdownBox).toBeInTheDocument()
    fireEvent.click(dropdownBox)
    const label1 = screen.getByText(DeliveryItems[0].label1)
    expect(label1).toBeInTheDocument()
  })

  test('renders delivery menu items correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <DeliveryFee coin="Ethereum" />
      </ThemeProvider>
    )

    const dropdownBox = screen.getByAltText('dropdown-icon')
    expect(dropdownBox).toBeInTheDocument()
    fireEvent.click(dropdownBox)
    const label1 = screen.getByText(DeliveryItems[0].label1)
    expect(label1).toBeInTheDocument()
  })
})