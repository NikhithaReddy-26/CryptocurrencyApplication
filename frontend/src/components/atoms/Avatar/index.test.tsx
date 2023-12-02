import React from 'react'
import { render, screen } from '@testing-library/react'
import MyAvatar from '.'
import '@testing-library/jest-dom'

describe('MyAvatar', () => {
  test('renders with default props', () => {
    render(<MyAvatar alt="Avatar not found" />)
    const avatar = screen.getByAltText('Avatar not found')
    expect(avatar).toBeInTheDocument()
  })
})
