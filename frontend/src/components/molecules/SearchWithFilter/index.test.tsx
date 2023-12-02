import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import { SearchFilter } from './index'

describe('SearchFilter component', () => {
  test('renders without errors', () => {
    render(
      <SearchFilter
        filterEnabled={true}
        onChange={function (value: string): void {}}
      />
    )
  })

  test('updates search value on input change', () => {
    const { getByPlaceholderText } = render(
      <SearchFilter
        filterEnabled={true}
        onChange={function (value: string): void {}}
      />
    )
    const searchInput = getByPlaceholderText(
      'Search all assets'
    ) as HTMLInputElement
    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(searchInput.value).toBe('test')
  })

  test('clears search value when clear icon is clicked', () => {
    const { getByPlaceholderText, getByAltText } = render(
      <SearchFilter
        filterEnabled={true}
        onChange={function (value: string): void {}}
      />
    )
    const searchInput = getByPlaceholderText(
      'Search all assets'
    ) as HTMLInputElement
    const clearIcon = getByAltText('Search Icon') as HTMLElement
    fireEvent.change(searchInput, { target: { value: '' } })
    fireEvent.click(clearIcon)
    expect(searchInput.value).toBe('')
  })

  test('displays filter icon when filterEnabled is true', () => {
    const { getByAltText } = render(
      <SearchFilter
        filterEnabled={true}
        onChange={function (value: string): void {}}
      />
    )
    const filterIcon = getByAltText('Filter Icon') as HTMLElement
    expect(filterIcon).toBeInTheDocument()
  })

  test('does not display filter icon when filterEnabled is false', () => {
    const { queryByAltText } = render(
      <SearchFilter
        filterEnabled={false}
        onChange={function (value: string): void {}}
      />
    )
    const filterIcon = queryByAltText('Filter Icon')
    expect(filterIcon).toBeNull()
  })
  test('calls onChange function when search value changes', () => {
    const handleChange = jest.fn()
    const { getByPlaceholderText } = render(
      <SearchFilter filterEnabled={true} onChange={handleChange} />
    )
    const searchInput = getByPlaceholderText('Search all assets')
    fireEvent.change(searchInput, { target: { value: 'test' } })
    expect(handleChange).toHaveBeenCalledWith('test')
  })
})
