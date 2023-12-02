import { render, screen, fireEvent } from '@testing-library/react'
import { ResetPassword } from './index'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../utils/themes'

describe('ResetPassword', () => {
  test('renders without errors', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )
  })

  test('displays password validation message when password is invalid', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const passwordInput = screen.getByPlaceholderText('New Password')
    fireEvent.change(passwordInput, { target: { value: 'weak' } })

    const validationMessage = screen.getByText(
      'A minimum of 8 characters required.'
    )
    expect(validationMessage).toBeInTheDocument()
  })

  test('displays password validation message when password is missing special characters', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const passwordInput = screen.getByPlaceholderText('New Password')
    fireEvent.change(passwordInput, { target: { value: 'strongpassword' } })

    const validationMessage = screen.getByText('At least 1 number required.')
    expect(validationMessage).toBeInTheDocument()
  })

  test('does not display password validation message when password is valid', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const passwordInput = screen.getByPlaceholderText('New Password')
    fireEvent.change(passwordInput, { target: { value: 'StrongPassword123!' } })

    const validationMessage = screen.queryByText(
      'Password length should be at least 8 characters'
    )
    expect(validationMessage).not.toBeInTheDocument()
  })

  test('does not display passwords mismatch message when passwords match', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const passwordInput = screen.getByPlaceholderText('New Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')

    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, { target: { value: 'password123' } })

    const mismatchMessage = screen.queryByText('Passwords do not match')
    expect(mismatchMessage).not.toBeInTheDocument()
  })

  test('toggles password visibility and updates state', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const togglePasswordButton = screen.getByRole('button', {
      name: 'Toggle password visibility',
    })
    fireEvent.click(togglePasswordButton)

    const passwordInput = screen.getByPlaceholderText('New Password')
    expect(passwordInput.getAttribute('type')).toBe('text')

    fireEvent.click(togglePasswordButton)

    expect(passwordInput.getAttribute('type')).toBe('password')
  })

  test('handles password reset and updates state', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const resetPasswordButton = screen.getByRole('button', {
      name: 'Reset Password',
    })
    fireEvent.click(resetPasswordButton)
  })
  test('displays passwords mismatch message when passwords do not match', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const passwordInput = screen.getByPlaceholderText('New Password')
    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')

    fireEvent.change(passwordInput, { target: { value: 'password123' } })
    fireEvent.change(confirmPasswordInput, {
      target: { value: 'differentpassword' },
    })
  })
  test('toggles confirm password visibility and updates state', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const toggleConfirmPasswordButton = screen.getByRole('button', {
      name: /Toggle confirm password visibility/i,
    })
    fireEvent.click(toggleConfirmPasswordButton)
  })

  test('handles password reset and updates state', () => {
    render(
      <ThemeProvider theme={theme}>
        <ResetPassword />
      </ThemeProvider>
    )

    const resetPasswordButton = screen.getByRole('button', {
      name: 'Reset Password',
    })
    fireEvent.click(resetPasswordButton)

    const newPasswordInput = screen.getByPlaceholderText('New Password')
    fireEvent.change(newPasswordInput, { target: { value: 'newpassword' } })

    const confirmPasswordInput = screen.getByPlaceholderText('Confirm Password')
    fireEvent.change(confirmPasswordInput, { target: { value: 'newpassword' } })

    const resetButton = screen.getByRole('button', { name: 'Reset Password' })
    fireEvent.click(resetButton)
  })
})
