import { render, screen, fireEvent } from '@testing-library/react'
import { ForgotPassword } from './index'
import { ThemeProvider } from '@mui/material'
import theme from '../../../utils/themes'
import { MemoryRouter } from 'react-router-dom'

describe('ForgotPassword component', () => {
  test('enables button when email is valid', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForgotPassword />
        </ThemeProvider>
      </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const sendResetLinkButton = screen.getByText('Send Reset Link')

    fireEvent.change(emailInput, {
      target: { value: 'validemail@example.com' },
    })

    expect(sendResetLinkButton).not.toBeDisabled()
  })

  test('does not display error message for valid email', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForgotPassword />
        </ThemeProvider>
      </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const sendResetLinkButton = screen.getByText('Send Reset Link')

    fireEvent.change(emailInput, {
      target: { value: 'validemail@example.com' },
    })

    fireEvent.click(sendResetLinkButton)

    const emailError = screen.queryByText('Email is required')
    expect(emailError).toBeNull()
  })

  test('validates email on blur', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForgotPassword />
        </ThemeProvider>
      </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText(
      'you@company.com'
    ) as HTMLInputElement

    fireEvent.blur(emailInput)

    const emailError = screen.queryByText('Email is required')
    expect(emailError).toBeTruthy()
  })
  test('validates email field correctly', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForgotPassword />
        </ThemeProvider>
      </MemoryRouter>
    )

    expect(screen.queryByText('Email is required')).toBeNull()

    fireEvent.blur(screen.getByPlaceholderText('you@company.com'))
    expect(screen.getByText('Email is required')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'invalidemail' },
    })
    fireEvent.blur(screen.getByPlaceholderText('you@company.com'))
    expect(screen.getByText('Email is invalid')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'validemail@example.com' },
    })
    fireEvent.blur(screen.getByPlaceholderText('you@company.com'))
    expect(screen.queryByText('Email is invalid')).toBeNull()
  })
  test('updates code state on code change', () => {
    render(
      <MemoryRouter>
        <ThemeProvider theme={theme}>
          <ForgotPassword />
        </ThemeProvider>
      </MemoryRouter>
    )

    const emailInput = screen.getByPlaceholderText('you@company.com')
    const sendResetLinkButton = screen.getByText('Send Reset Link')

    fireEvent.change(emailInput, {
      target: { value: 'validemail@example.com' },
    })

    expect(sendResetLinkButton).not.toBeDisabled()

    fireEvent.click(sendResetLinkButton)

    const codeInput = screen.getByPlaceholderText(
      '8 digits code'
    ) as HTMLInputElement
    expect(codeInput).toBeInTheDocument()

    fireEvent.change(codeInput, { target: { value: '12345678' } })
    expect(codeInput.value).toBe('12345678')
  })
})
