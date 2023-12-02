import { Button, ButtonProps, Typography } from '@mui/material'
import { styled } from '@mui/material/styles'

const StyledButton = styled(Button)({
  textTransform: 'none',
  borderRadius: '4px',
})

interface IButtonProps extends ButtonProps {
  typoVariant?: any
}

const CustomButton = ({ children, typoVariant, ...rest }: IButtonProps) => {
  return (
    <StyledButton data-testid="Button" {...rest}>
      <Typography variant={typoVariant}>{children}</Typography>
    </StyledButton>
  )
}

export default CustomButton
