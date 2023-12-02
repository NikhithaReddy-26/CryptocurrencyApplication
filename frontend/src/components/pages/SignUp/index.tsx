import { LoginTemplate } from '../../templates/LoginTemplate'
import signupImage from '../../../../public/assets/images/bitcoinWallet-signup.png'
import {
  Box,
  Divider,
  FormControl,
  Stack,
  Typography,
  IconButton,
  InputAdornment,
} from '@mui/material'
import theme from '../../../utils/themes'
import { CustomTextField } from '../../atoms/Inputfield'
import CustomButton from '../../atoms/Button'
import { styled } from '@mui/system'
import google from '../../../../public/assets/images/google.svg'
import facebook from '../../../../public/assets/images/stripe.svg'
import microsoft from '../../../../public/assets/images/xero.svg'
import { ChangeEvent, useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import {
  LoginScreenDetails,
  SignupScreenDetails,
} from '../../../utils/constants'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'
import { API_BASE_URL } from '../../../services/api/api'

const StyledButton = styled(CustomButton)(({ theme, disabled }) => ({
  minWidth: '512px',
  height: '42px',
  borderRadius: '4px',
  backgroundColor: disabled ? theme.palette.primary[300] : theme.palette[500],
  textTransform: 'none',
  color: theme.palette.gray.white,
  '&:hover': {
    backgroundColor: '#0052FF',
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
  cursor: 'pointer',
})

const Wrapper = styled(Box)({
  width: '75%',
  height: '500px',
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

const StyledFormControl = styled(FormControl)({
  height: '64px',
  width: '100%',
  margin: '8px 0',
})
export const Signup = () => {
  const [fullName, setFullName] = useState<string>('')
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [password, setPassword] = useState<string>('')
  const [passwordError, setPasswordError] = useState<string>('')
  const [showPassword, setShowPassword] = useState<boolean>(false)
  const navigate = useNavigate();

  const validateEmail = () => {
    if (!email) {
      setEmailError(SignupScreenDetails.emailIsRequired)
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) {
      setEmailError(SignupScreenDetails.emailIsInvalid)
    } else {
      setEmailError('')
    }
  }

  const validatePassword = () => {
    if (!password) {
      setPasswordError(SignupScreenDetails.passwordIsRequired)
    } else if (password.length < 8) {
      setPasswordError(SignupScreenDetails.passwordLengthRequirement)
    } else {
      setPasswordError('')
    }
  }

  const handleFullNameChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFullName(event.target.value)
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
    setShowPassword(!showPassword)
  }
  const { loginWithRedirect } = useAuth0()
  const handleGoogleSignup = () => {
    loginWithRedirect()
  }
  const isButtonDisabled =
    !fullName || !email || !password || !!emailError || !!passwordError

  const handleSignUp = async () => {
      await axios.post(`${API_BASE_URL}/users/register`, {
        name: fullName,
        email,
        password,
        account_balance: 10000
      })
      navigate("/")
  }

  return (
    <LoginTemplate
      leftbar={<img src={signupImage} width={'100%'} height={'99%'} />}
      rightbar={
        <OuterWrapper>
          <Wrapper>
            <Stack spacing={'50px'}>
              <Box>
                <Typography
                  children={SignupScreenDetails.heading}
                  variant="h4"
                  color={theme.palette.text.highemp}
                />
              </Box>
              <StyledFormControl>
                <Typography
                  children={SignupScreenDetails.fullNameLabel}
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
                <CustomTextField
                  type="text"
                  placeholder="Enter your name"
                  variant="outlined"
                  size="medium"
                  value={fullName}
                  onChange={handleFullNameChange}
                />
              </StyledFormControl>
              <StyledFormControl>
                <Typography
                  children={SignupScreenDetails.emailLabel}
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
                <CustomTextField
                  type={LoginScreenDetails.emailType}
                  placeholder="you@company.com"
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
                  children={SignupScreenDetails.createPasswordLabel}
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
                <CustomTextField
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Create Password"
                  variant="outlined"
                  size="medium"
                  value={password}
                  onChange={handlePasswordChange}
                  onBlur={validatePassword}
                  inputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          onClick={togglePasswordVisibility}
                          edge="end"
                          data-testid={SignupScreenDetails.ariaid}
                        >
                          {showPassword ? <Visibility /> : <VisibilityOff />}
                        </IconButton>
                      </InputAdornment>
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
              <Typography
                children={SignupScreenDetails.passwordRequirements}
                variant="b2"
                color={theme.palette.text.medemp}
                style={{ cursor: 'pointer' }}
              />
                <StyledButton
                  children="Sign Up"
                  disabled={isButtonDisabled}
                  variant="contained"
                  onClick={handleSignUp}
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
            <StyledIconStack direction={'row'} spacing={2}>
              <StyledBox onClick={handleGoogleSignup}>
                <img src={google} alt={SignupScreenDetails.google} />
                <Typography
                  children={SignupScreenDetails.google}
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
              </StyledBox>
              <StyledBox onClick={handleGoogleSignup}>
                <img src={facebook} alt={SignupScreenDetails.facebook} />
                <Typography
                  children={SignupScreenDetails.facebook}
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
              </StyledBox>
              <StyledBox onClick={handleGoogleSignup}>
                <img src={microsoft} alt={SignupScreenDetails.microsoft} />
                <Typography
                  children={SignupScreenDetails.microsoft}
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
              </StyledBox>
            </StyledIconStack>
            <StyledTypoStack direction={'row'}>
              <Typography
                children={SignupScreenDetails.alreadyHaveAccount}
                variant="b1"
                color={theme.palette.text.medemp}
              />
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography
                  children={SignupScreenDetails.login}
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
