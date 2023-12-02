import { LoginTemplate } from '../../templates/LoginTemplate'
import loginImage from '../../../../public/assets/images/loginImage.png'
import {
  Box,
  Divider,
  FormControl,
  InputAdornment,
  Stack,
  Typography,
} from '@mui/material'
import { useAuth0 } from '@auth0/auth0-react'
import theme from '../../../utils/themes'
import { CustomTextField } from '../../atoms/Inputfield'
import CustomButton from '../../atoms/Button'
import { styled } from '@mui/system'
import google from '../../../../public/assets/images/google.svg'
import facebook from '../../../../public/assets/images/stripe.svg'
import microsoft from '../../../../public/assets/images/xero.svg'
import { ChangeEvent, useEffect, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import Icon from '../../atoms/Icons'
import { LoginScreenDetails,accessToken } from '../../../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import { getAllUsers } from '../../../services/api/api'

const StyledButton = styled(CustomButton)(({ theme, disabled }) => ({
  width: '512px',
  height: '42px',
  borderRadius: '4px',
  backgroundColor: theme.palette.primary[500],
  textTransform: 'none',
  color: theme.palette.gray.white,
  '&:hover': {
    backgroundColor: theme.palette.primary[500],
  },
}))

const StyledBox = styled(Box)({
  padding: '20px 40px',
  backgroundColor: theme.palette.primary[100],
  width: '157.33px',
  height: '96px',
  borderRadius: '12px',
  border: '1px solid',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  gap: '8px',
  borderColor: theme.palette.gray[100],
})
const StyledTypoStack = styled(Stack)({
  spacing: 2,
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: 'inherit',
})
const StyledIconStack = styled(Stack)({
  spacing: 4,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
})
const StyledDivider = styled(Divider)({
  margin: '0 50px',
})
const StyledDividerBox = styled(Box)({
  width: '100%',
  mt: 1,
})

const Wrapper = styled(Box)({
  width: '75%',
  gap: '32px',
  padding: '0 32px 0 32px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
})

const OuterWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

const StyledImage = styled('img')({
  width: '100%',
  height: '99%',
})

const StyledTypography = styled(Typography)({
  marginBottom: '10px',
})

const StyledFormControl = styled(FormControl)({
  marginBottom: '20px',
})

const StyledCustomTextField = styled(CustomTextField)({
  marginBottom: '10px',
})

const StyledEndAdornment = styled(InputAdornment)({
  cursor: 'pointer',
})

const SocialIconsWrapper = styled(Stack)({
  flexDirection: 'row',
  spacing: 4,
  alignItems: 'flex-start',
  justifyContent: 'flex-start',
})

const StyledSocialBox = styled(StyledBox)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

const SocialLabel = styled(Typography)({
  cursor: 'pointer',
})

const socialIcons = [
  {
    src: google,
    alt: LoginScreenDetails.google,
    label: LoginScreenDetails.google,
  },
  {
    src: facebook,
    alt: LoginScreenDetails.facebook,
    label: LoginScreenDetails.facebook,
  },
  {
    src: microsoft,
    alt: LoginScreenDetails.microsoft,
    label: LoginScreenDetails.microsoft,
  },
]

export const Login = () => {
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const [userData, setUserData] = useState<any>(null)
  const navigate = useNavigate()

  const validateEmail = () => {
    if (!email) {
      setEmailError(LoginScreenDetails.isNotEntered)
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError(LoginScreenDetails.EnteredValueIsIncorrect)
    } else {
      setEmailError(LoginScreenDetails.isCorrect)
    }
  }

  const validatePassword = () => {
    if (!password) {
      setPasswordError(LoginScreenDetails.isPasswordEntered)
    } else if (password.length < 8) {
      setPasswordError(LoginScreenDetails.isPasswordAccepted)
    } else {
      setPasswordError(LoginScreenDetails.isCorrect)
    }
  }

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value)
  }

  const handlePasswordChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setPassword(event.target.value)
  }

  const togglePasswordVisibility = () => {
    setShowPassword((prevShowPassword) => !prevShowPassword)
  }
  const { loginWithRedirect } = useAuth0()
  const handleGoogleLogin = () => {
    loginWithRedirect()
  }

  useEffect(() => {
    const fetchUsersData = async() => {
    const fetchedUsers = await getAllUsers()
    setUserData(fetchedUsers)
    }
    fetchUsersData()
  },[])

  const handleLogin = async() => {
    const matchedUser = userData?.find(
      (user: any) => user.email === email
    )

    if (matchedUser) {
      navigate('/dashboard')
    } else {
      setPasswordError('Invalid email or password')
    }
  }

  return (
    <LoginTemplate
      leftbar={<StyledImage src={loginImage} />}
      rightbar={
        <OuterWrapper>
          <Wrapper>
            <Stack spacing={'40px'}>
              <Box>
                <StyledTypography
                  children={LoginScreenDetails.heading}
                  variant="h4"
                  color={theme.palette.text.highemp}
                />
              </Box>
              <StyledFormControl>
                <Typography
                  children={LoginScreenDetails.emailLabel}
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
                <StyledCustomTextField
                  type={LoginScreenDetails.emailType}
                  placeholder={LoginScreenDetails.emailPlaceholder}
                  variant="outlined"
                  size="medium"
                  value={email}
                  onChange={handleEmailChange}
                  onBlur={validateEmail}
                />
                {emailError && (
                  <Typography
                    children={emailError}
                    variant="b2"
                    color={theme.palette.error.main}
                  />
                )}
              </StyledFormControl>
              <StyledFormControl>
                <Typography
                  children={LoginScreenDetails.passwordLabel}
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
                <StyledCustomTextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder={LoginScreenDetails.passwordPlaceholder}
                  variant="outlined"
                  size="medium"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={validatePassword}
                  inputProps={{
                    endAdornment: (
                      <StyledEndAdornment
                        position="end"
                        onClick={togglePasswordVisibility}
                        aria-label={LoginScreenDetails.ariaId}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </StyledEndAdornment>
                    ),
                  }}
                />
                {passwordError && (
                  <Typography
                    children={passwordError}
                    variant="b2"
                    color={theme.palette.error.main}
                  />
                )}
              </StyledFormControl>
              <Link to="/forgotpassword" style={{ textDecoration: 'none' }}>
                <Typography
                  children={LoginScreenDetails.ForgotPasswordLabel}
                  variant="b2"
                  color={theme.palette.primary[500]}
                  style={{ cursor: 'pointer' }}
                />
              </Link>
              <StyledButton
                typoVariant={'b1'}
                children={LoginScreenDetails.signIn}
                variant="contained"
                onClick={handleLogin}
              />
            </Stack>
            <StyledDividerBox>
              <StyledDivider
                children={
                  <Typography
                    children="Or"
                    variant="b2"
                    color={theme.palette.text.medemp}
                  />
                }
              />
            </StyledDividerBox>
            <SocialIconsWrapper>
              <StyledIconStack direction="row" spacing={2}>
                {socialIcons.map((item) => (
                  <StyledSocialBox key={item.alt} onClick={handleGoogleLogin}>
                    <Icon src={item.src} alt={item.alt} />
                    <SocialLabel
                      children={item.label}
                      variant="b1"
                      color={theme.palette.text.medemp}
                    />
                  </StyledSocialBox>
                ))}
              </StyledIconStack>
            </SocialIconsWrapper>
            <StyledTypoStack direction={'row'}>
              <Typography
                children={LoginScreenDetails.noAccount}
                variant="b1"
                color={theme.palette.text.medemp}
              />
              <Link to="/signup" style={{ textDecoration: 'none' }}>
                <Typography
                  children={LoginScreenDetails.signUp}
                  variant="b1"
                  color={theme.palette.primary[500]}
                  style={{ cursor: 'pointer' }}
                />
              </Link>
            </StyledTypoStack>
          </Wrapper>
        </OuterWrapper>
      }
    />
  )
}
