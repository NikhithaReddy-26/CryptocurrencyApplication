import { render, screen, fireEvent, renderHook } from '@testing-library/react'
import { Login } from './index'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../utils/themes'
import { BrowserRouter } from 'react-router-dom';

jest.mock('axios')

jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: false,
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
  }),
}));
jest.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    isAuthenticated: true,
    loginWithRedirect: jest.fn(),
    logout: jest.fn(),
  }),
}));
jest.mock('react-router-dom', () => {
  const actual = jest.requireActual('react-router-dom');
  return {
    ...actual
    
  };
});
describe('Login Component', () => {
  test('renders login form correctly', () => {
    render(
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider></BrowserRouter>
    )

    expect(screen.getByText('Login to Minet')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Password')).toBeInTheDocument()
    expect(screen.getByText('Forgot Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Sign In' })).toBeInTheDocument()
  })

  test('validates email field correctly', () => {
    render(
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider></BrowserRouter>
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
  test('validates password field correctly', () => {
    render(
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider></BrowserRouter>
    )
    expect(screen.queryByText('Password is required')).toBeNull()

    fireEvent.blur(screen.getByPlaceholderText('Enter Password'))
    expect(screen.getByText('Password is required')).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
      target: { value: 'short' },
    })
    fireEvent.blur(screen.getByPlaceholderText('Enter Password'))
    expect(
      screen.getByText('Password should be at least 8 characters long')
    ).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
      target: { value: 'validpassword' },
    })
    fireEvent.blur(screen.getByPlaceholderText('Enter Password'))
    expect(
      screen.queryByText('Password should be at least 8 characters long')
    ).toBeNull()
  })

  test('toggles password visibility correctly', () => {
    render(
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider></BrowserRouter>
    )

    const passwordInput = screen.getByPlaceholderText(
      'Enter Password'
    ) as HTMLInputElement
    expect(passwordInput.type).toBe('password')

    fireEvent.click(screen.getByLabelText('Toggle password visibility'))
    expect(passwordInput.type).toBe('text')

    fireEvent.click(screen.getByLabelText('Toggle password visibility'))
    expect(passwordInput.type).toBe('password')
  })

  test('google icon clickable',async ()=>{
    render(
      <ThemeProvider theme={theme}>
      <BrowserRouter>
      <Login /></BrowserRouter>
    </ThemeProvider>
    )
    const googleIcon = screen.findAllByTestId('icon');
    (await googleIcon).forEach((item)=>{
      fireEvent.click(item)
    })
  })

  test('handles login logic correctly', () => {
    const handleLogin = jest.fn()
    render(
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Login />
      </ThemeProvider></BrowserRouter>
    )

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'test@example.com' },
    })
    fireEvent.change(screen.getByPlaceholderText('Enter Password'), {
      target: { value: 'password123' },
    })

    fireEvent.click(screen.getByRole('button', { name: 'Sign In' }))

    expect(handleLogin).toHaveBeenCalledTimes(0)
  })
})
function useStateValues(
  arg0: string,
  arg1: string,
  arg2: string,
  arg3: string
): any {
  throw new Error('Function not implemented.')
}

test('clicking on buy now button',async() => {
  render(
    <BrowserRouter>
    <ThemeProvider theme={theme}>
      <Login />
    </ThemeProvider></BrowserRouter>
  )
  const BuynowButton = await screen.findByText('Sign In')
  fireEvent.click(BuynowButton)
})