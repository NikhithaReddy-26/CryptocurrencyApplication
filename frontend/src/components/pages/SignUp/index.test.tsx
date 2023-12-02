import {
  render,
  screen,
  fireEvent,
  act,
} from '@testing-library/react'
import { Signup } from './index'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../utils/themes'
import { SignupScreenDetails } from '../../../utils/constants'
import { BrowserRouter } from 'react-router-dom';
import { Auth0Provider } from '@auth0/auth0-react'
import axios from 'axios'
import MockAdapter from 'axios-mock-adapter';


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



describe('Signup Component', () => {

  test('renders signup form correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
          <Signup />
        </BrowserRouter>
      </ThemeProvider>
    );

    expect(screen.getByText('Signup to Minet')).toBeInTheDocument();
    expect(screen.getByText('Full Name')).toBeInTheDocument();
    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('Create Password')).toBeInTheDocument();
    expect(screen.getByText('Sign Up')).toBeInTheDocument();
  });

  test('renders signup form correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Signup /></BrowserRouter>
      </ThemeProvider>
    )


    expect(screen.getByText('Signup to Minet')).toBeInTheDocument()
    expect(screen.getByText('Full Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
    expect(screen.getByText('Create Password')).toBeInTheDocument()
    expect(screen.getByText('Sign Up')).toBeInTheDocument()
  })

  test('validates email field correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Signup /></BrowserRouter>
      </ThemeProvider>
    )

    expect(screen.queryByText(SignupScreenDetails.emailIsRequired)).toBeNull()

    fireEvent.blur(screen.getByPlaceholderText('you@company.com'))
    expect(
      screen.getByText(SignupScreenDetails.emailIsRequired)
    ).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'invalidemail' },
    })
    fireEvent.blur(screen.getByPlaceholderText('you@company.com'))
    expect(
      screen.getByText(SignupScreenDetails.emailIsInvalid)
    ).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
      target: { value: 'validemail@example.com' },
    })
    fireEvent.blur(screen.getByPlaceholderText('you@company.com'))
    expect(screen.queryByText(SignupScreenDetails.emailIsInvalid)).toBeNull()
  })

  test('validates password field correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Signup /></BrowserRouter>
      </ThemeProvider>
    )

    expect(
      screen.queryByText(SignupScreenDetails.passwordIsRequired)
    ).toBeNull()

    fireEvent.blur(screen.getByPlaceholderText('Create Password'))
    expect(
      screen.getByText(SignupScreenDetails.passwordIsRequired)
    ).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Create Password'), {
      target: { value: 'short' },
    })
    fireEvent.blur(screen.getByPlaceholderText('Create Password'))
    expect(
      screen.getByText(SignupScreenDetails.passwordLengthRequirement)
    ).toBeInTheDocument()

    fireEvent.change(screen.getByPlaceholderText('Create Password'), {
      target: { value: 'validpassword' },
    })
    fireEvent.blur(screen.getByPlaceholderText('Create Password'))
    expect(
      screen.queryByText(SignupScreenDetails.passwordLengthRequirement)
    ).toBeNull()
  })
  test('handles full name change correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Signup /></BrowserRouter>
      </ThemeProvider>
    )


    const fullNameInput = screen.getByPlaceholderText(
      'Enter your name'
    ) as HTMLInputElement
    fireEvent.change(fullNameInput, { target: { value: 'John Doe' } })

    expect(fullNameInput.value).toBe('John Doe')
  })
  test('determines button disabled state correctly', () => {
    render(
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Signup />
      </ThemeProvider></BrowserRouter>
    )

    act(() => {
      fireEvent.change(screen.getByPlaceholderText('Enter your name'), {
        target: { value: 'John Doe' },
      })

      fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
        target: { value: 'test@example.com' },
      })

      fireEvent.change(screen.getByPlaceholderText('Create Password'), {
        target: { value: 'password123' },
      })
    })

    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeEnabled()

    act(() => {
      fireEvent.change(screen.getByPlaceholderText('you@company.com'), {
        target: { value: '' },
      })
    })

    expect(screen.getByRole('button', { name: 'Sign Up' })).toBeDisabled()
  })
test('google icon clickable',async ()=>{
  render(
    <ThemeProvider theme={theme}>
    <BrowserRouter>
    <Signup /></BrowserRouter>
  </ThemeProvider>
  )
  const googleIcon = screen.findByText('Google');
  fireEvent.click(await googleIcon)
})
  test('toggles password visibility correctly', () => {
    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Signup /></BrowserRouter>
      </ThemeProvider>
    )

    const passwordInput = screen.getByPlaceholderText(
      'Create Password'
    ) as HTMLInputElement
    const visibilityToggle = screen.getByTestId('password-visibility-toggle')

    expect(passwordInput.type).toBe('password')

    fireEvent.click(visibilityToggle)

    expect(passwordInput.type).toBe('text')

    fireEvent.click(visibilityToggle)

    expect(passwordInput.type).toBe('password')
  })
})
function mockUseAuth0() {
  throw new Error('Function not implemented.')
}

describe('Signup', () => {
  const mockAxios = new MockAdapter(axios);

  it('should call axios.post when Sign Up button is clicked', async () => {
    mockAxios.onPost('http://localhost:8001/users').reply(200, {});

    render(
      <ThemeProvider theme={theme}>
        <BrowserRouter>
        <Signup /></BrowserRouter>
      </ThemeProvider>
    );
    fireEvent.change(screen.getByPlaceholderText('Enter your name'), { target: { value: 'John Doe' } });
    fireEvent.change(screen.getByPlaceholderText('you@company.com'), { target: { value: 'johndoe@example.com' } });
    fireEvent.change(screen.getByPlaceholderText('Create Password'), { target: { value: 'password' } });
    fireEvent.click(screen.getByText('Sign Up'));
    await new Promise(resolve => setTimeout(resolve, 100));
  });
});