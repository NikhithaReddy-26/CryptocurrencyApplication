import {
  Stack,
  Box,
  Typography,
  FormControl,
  styled,
  IconButton,
  InputAdornment,
} from '@mui/material'
import { useState } from 'react'
import theme from '../../../utils/themes'
import { CustomTextField } from '../../atoms/Inputfield'
import { LoginTemplate } from '../../templates/LoginTemplate'
import CustomButton from '../../atoms/Button'
import LoginImage from '../../../../public/assets/images/loginImage.png'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { ResetSuccessful } from '../../molecules/ResetSuccessful'
import { ResetPasswordDetails } from '../../../utils/constants'

const StyledButton = styled(CustomButton)(({ theme }) => ({
  minWidth: '512px',
  height: '42px',
  borderRadius: '4px',
  backgroundColor: theme.palette.primary[500],
  textTransform: 'none',
  color: theme.palette.gray.white,
  '&:hover': {
    backgroundColor: theme.palette.primary[500],
  },
}))

const StyledFormControl = styled(FormControl)({
  height: '64px',
  width: '100%',
  margin: '8px 0',
})

const OuterWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
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

export const ResetPassword = () => {
  const [password, setPassword] = useState<string>('')
  const [confirmPassword, setConfirmPassword] = useState<string>('')
  const [passwordsMatch, setPasswordsMatch] = useState<boolean>(false)
  const [isPasswordReset, setIsPasswordReset] = useState<boolean>(false)
  const [passwordVisible, setPasswordVisible] = useState<boolean>(false)
  const [confirmPasswordVisible, setConfirmPasswordVisible] =
    useState<boolean>(false)
  const [passwordValidationMessage, setPasswordValidationMessage] =
    useState<string>('')
  const [passwordsMatchMessage, setPasswordsMatchMessage] = useState<string>('')

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value
    setPassword(value)
    setPasswordsMatch(value === confirmPassword)

    if (value.length < 8) {
      setPasswordValidationMessage(ResetPasswordDetails.passwordlength)
    } else if (!/\d/.test(value)) {
      setPasswordValidationMessage(ResetPasswordDetails.passwordNumber)
    } else if (!/[!@#$%^&*]/.test(value)) {
      setPasswordValidationMessage(ResetPasswordDetails.message)
    } else {
      setPasswordValidationMessage('')
    }
  }

  const handleConfirmPasswordChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const value = event.target.value
    setConfirmPassword(value)
    setPasswordsMatch(value === password)

    if (value !== password) {
      setPasswordsMatchMessage(ResetPasswordDetails.PasswordsDoNotMatch)
    } else {
      setPasswordsMatchMessage('')
    }
  }

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible)
  }

  const toggleConfirmPasswordVisibility = () => {
    setConfirmPasswordVisible(!confirmPasswordVisible)
  }

  const handleResetPassword = () => {
    setIsPasswordReset(true)
  }

  const handleLogin = () => {
    // Handle login logic...
  }

  return (
    <LoginTemplate
      leftbar={<img src={LoginImage} width={'100%'} height={'99%'} />}
      rightbar={
        <OuterWrapper>
          <Wrapper>
            <Stack spacing={4}>
              {isPasswordReset ? (
                <>
                  <Stack spacing={4}>
                    <Typography variant="h4" color={theme.palette.text.highemp}>
                      {ResetPasswordDetails.ResetPasswordButton}
                    </Typography>
                    <ResetSuccessful />
                    <StyledButton
                      variant="contained"
                      onClick={handleLogin}
                      children="Login"
                    />
                  </Stack>
                </>
              ) : (
                <>
                  <Typography variant="h4" color={theme.palette.text.highemp}>
                    {ResetPasswordDetails.ResetPasswordButton}
                  </Typography>
                  <StyledFormControl>
                    <CustomTextField
                      type={passwordVisible ? 'text' : 'password'}
                      placeholder="New Password"
                      variant="outlined"
                      size="medium"
                      value={password}
                      onChange={handlePasswordChange}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={togglePasswordVisibility}
                              aria-label="Toggle password visibility"
                            >
                              {passwordVisible ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {passwordValidationMessage && (
                      <Typography
                        variant="body2"
                        color={theme.palette.error.main}
                      >
                        {passwordValidationMessage}
                      </Typography>
                    )}
                  </StyledFormControl>
                  <StyledFormControl>
                    <CustomTextField
                      type={confirmPasswordVisible ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      variant="outlined"
                      size="medium"
                      value={confirmPassword}
                      onChange={handleConfirmPasswordChange}
                      inputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={toggleConfirmPasswordVisibility}
                              aria-label="Toggle confirm password visibility"
                            >
                              {confirmPasswordVisible ? (
                                <Visibility />
                              ) : (
                                <VisibilityOff />
                              )}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                    {passwordsMatchMessage && (
                      <Typography
                        variant="body2"
                        color={theme.palette.error.main}
                      >
                        {passwordsMatchMessage}
                      </Typography>
                    )}
                  </StyledFormControl>
                  <Typography
                    children={ResetPasswordDetails.validationContent}
                    variant="c1"
                    color={theme.palette.gray[500]}
                  />
                  <StyledButton
                    variant="contained"
                    onClick={handleResetPassword}
                    disabled={!passwordsMatch}
                  >
                    {ResetPasswordDetails.ResetPasswordButton}
                  </StyledButton>
                </>
              )}
            </Stack>
          </Wrapper>
        </OuterWrapper>
      }
    />
  )
}
