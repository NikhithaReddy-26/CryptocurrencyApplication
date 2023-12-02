import { LoginTemplate } from '../../templates/LoginTemplate'
import { Box, FormControl, Stack, Typography } from '@mui/material'
import theme from '../../../utils/themes'
import { CustomTextField } from '../../atoms/Inputfield'
import CustomButton from '../../atoms/Button'
import { styled } from '@mui/system'
import { ChangeEvent, useState } from 'react'
import LoginImage from '../../../../public/assets/images/loginImage.png'
import { ForgotPasswordDetails } from '../../../utils/constants'
import { Link } from 'react-router-dom'

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
const StyledTypoStack = styled(Stack)({
  spacing: 2,
  alignItems: 'center',
  justifyContent: 'flex-start',
  width: 'inherit',
})
const OuterWrapper = styled(Box)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '100%',
})

export const ForgotPassword = () => {
  const [email, setEmail] = useState<string>('')
  const [emailError, setEmailError] = useState<string>('')
  const [code, setCode] = useState<string>('')
  const [isCodeSent, setIsCodeSent] = useState<boolean>(false)

  const validateEmail = () => {
    if (!email) {
      setEmailError('Email is required')
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      setEmailError('Email is invalid')
    } else {
      setEmailError('')
    }
  }

  const handleEmailChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setEmail(event.target.value)
  }

  const handleCodeChange = (
    event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setCode(event.target.value)
  }

  const handleSendResetLink = () => {
    // Code to send reset link..
    setIsCodeSent(true)
  }

  const isButtonDisabled = !email || Boolean(emailError)

  const handleResetPassword = () => {
    // Handle resetting password logic...
  }

  return (
    <LoginTemplate
      leftbar={<img src={LoginImage} width={'100%'} height={'99%'} />}
      rightbar={
        <OuterWrapper>
          <Wrapper>
            <Stack spacing={'50px'}>
              <Box>
                <Typography
                  children={ForgotPasswordDetails.Heading}
                  variant="h4"
                  color={theme.palette.text.highemp}
                />
              </Box>
              <StyledFormControl>
                <Typography
                  children={
                    isCodeSent
                      ? ForgotPasswordDetails.numberLabel
                      : ForgotPasswordDetails.EmailLabel
                  }
                  variant="b1"
                  color={theme.palette.text.medemp}
                />
                <CustomTextField
                  type={
                    isCodeSent
                      ? ForgotPasswordDetails.textfieldTypeNumber
                      : ForgotPasswordDetails.textfieldTypeEmail
                  }
                  placeholder={
                    isCodeSent
                      ? ForgotPasswordDetails.numberPlaceholder
                      : ForgotPasswordDetails.emailPlaceholder
                  }
                  variant="outlined"
                  size="medium"
                  value={isCodeSent ? code : email}
                  onChange={isCodeSent ? handleCodeChange : handleEmailChange}
                  onBlur={validateEmail}
                  data-testid="code-input"
                />

                {emailError && (
                  <Typography
                    children={emailError}
                    variant="b2"
                    color={theme.palette.error.main}
                  />
                )}
              </StyledFormControl>
              <StyledButton
                children={
                  isCodeSent
                    ? ForgotPasswordDetails.resetPassword
                    : ForgotPasswordDetails.resetLink
                }
                disabled={isButtonDisabled}
                variant="contained"
                onClick={isCodeSent ? handleResetPassword : handleSendResetLink}
              />
            </Stack>
            <StyledTypoStack direction={'row'}>
              <Typography
                children={ForgotPasswordDetails.topContent}
                variant="b1"
                color={theme.palette.text.medemp}
              />
              <Link to="/" style={{ textDecoration: 'none' }}>
                <Typography
                  children={ForgotPasswordDetails.bottomContent}
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
