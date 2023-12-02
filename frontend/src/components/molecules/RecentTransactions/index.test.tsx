import { render } from '@testing-library/react'
import Transactions from '.'
import walletSuccess from '../../../assets/icons/walletSuccess.svg'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../utils/themes'

describe('Transactions Component', () => {
  it('renders in purchased mode', () => {
    const props = {
      month: 'June',
      date: 23,
      icon: walletSuccess,
      coinName: 'Bitcoin BTC',
      coinPrice: 0.001,
      dollarPrice: 34000.0,
      mode: 'purchased',
      purchased: true,
    }

    const { getByText } = render(
      <ThemeProvider theme={theme}>
        <Transactions {...props} />
      </ThemeProvider>
    )

    expect(getByText('June 23')).toBeInTheDocument()
    expect(getByText('Bitcoin BTC')).toBeInTheDocument()
  })

  it('renders in sold mode', () => {
    const props = {
      month: 'June',
      date: 14,
      icon: walletSuccess,
      coinName: 'Bitcoin BTC',
      coinPrice: 0.023451,
      dollarPrice: 34000.0,
      mode: 'sold',
      purchased: false,
    }

    const { getByText } = render(   <ThemeProvider theme={theme}>
      <Transactions {...props} />
    </ThemeProvider>)

    expect(getByText('June 14')).toBeInTheDocument()
    expect(getByText('Bitcoin BTC')).toBeInTheDocument()
  })
})
