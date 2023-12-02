import { render } from '@testing-library/react'
import Balance from '.'

test('rendering Balance component correctly', () => {
  const { getByText } = render(
    <Balance
      heading1={'USD Coin'}
      description={'US Coin'}
      balanceAmount={'$34,000'}
    />
  )
  const headingElement = getByText(/USD Coin/i)
  const descriptionElement = getByText(/US Coin/i)
  const balanceAmountElement = getByText(/\$34,000/i)
  expect(headingElement).toBeInTheDocument()
  expect(descriptionElement).toBeInTheDocument()
  expect(balanceAmountElement).toBeInTheDocument()
})
