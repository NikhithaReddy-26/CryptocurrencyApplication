import { render, fireEvent, screen, act } from '@testing-library/react'
import { CurrencyList } from '.'

test('should highlight the selected chip', () => {
  const onSelectChip = jest.fn()
  const { getByText } = render(<CurrencyList onSelectChip={onSelectChip} />)
  fireEvent.click(getByText('XRP'))
  const selectedChip = getByText('XRP')
  const computedStyle = window.getComputedStyle(selectedChip)
  expect(computedStyle.border).toBe('')
})
