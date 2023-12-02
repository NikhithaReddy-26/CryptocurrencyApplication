import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import TimePeriodTabs from '.'
import theme from '../../../utils/themes'

describe('TimePeriodTabs', () => {
  const tabs = [
    { label: '1H' },
    { label: '24H' },
    { label: '1W' },
    { label: '1M' },
    { label: '1Y' },
    { label: 'ALL' },
  ]

  test('renders the correct number of tabs', () => {
    const { getAllByRole } = render(
      <TimePeriodTabs value={0} tabs={tabs} handleChange={() => {}} />
    )
    const tabElements = getAllByRole('tab')
    expect(tabElements.length).toBe(tabs.length)
  })

  test('calls handleChange when a tab is clicked', () => {
    const handleChange = jest.fn()
    const { getAllByRole } = render(
      <TimePeriodTabs value={0} tabs={tabs} handleChange={handleChange} />
    )
    const tabElements = getAllByRole('tab')
    fireEvent.click(tabElements[1])
    expect(handleChange).toHaveBeenCalledTimes(1)
    expect(handleChange).toHaveBeenCalledWith(expect.anything(), 1)
  })
  test('renders the value', () => {
    const handleChange = jest.fn()
    render(
      <TimePeriodTabs value={0} handleChange={handleChange} />
    )
  })
})
