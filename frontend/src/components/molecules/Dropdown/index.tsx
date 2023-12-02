import { Box, Typography } from '@mui/material'
import Icon from '../../atoms/Icons'
import downarrow from '../../../../public/assets/icons/chevron-down.svg'
import { styled } from '@mui/system'
import theme from '../../../utils/themes/index'

export interface DropdownProps {
  text: string
  height?: string
  width?: string
  variant: 'b1' | 'b2'
}

export const Dropdown = (props: DropdownProps) => {
  const { text, height, width, variant } = props

  return (
    <StyledBox variant={variant} height={height} width={width}>
      <StyledTypography variant={variant} color={theme.palette.gray[500]}>
        {text}
      </StyledTypography>
      <StyledIcon src={downarrow} />
    </StyledBox>
  )
}

const StyledBox = styled(Box)<{ variant: 'b1' | 'b2' }>(
  ({ theme, variant }) => ({
    display: 'flex',
    alignItems: 'center',
    height: variant === 'b2' ? '2.625rem' : '2.5rem',
    width: variant === 'b2' ? '10.625rem' : 'fit-content',
    padding: '0.25rem',
    borderRadius: '4px',
    border: `1px solid #E8E8F7`,
    justifyContent: variant === 'b2' ? 'space-between' : 'center',
    backgroundColor:'white',
  })
)

const StyledTypography = styled(Typography)({
  margin: '0 0 0 0.5rem',
  height: '1.375rem',
  whiteSpace: 'nowrap',
  overflow: 'hidden',
  textOverflow: 'ellipsis',
})

const StyledIcon = styled(Icon)({
  width: '2rem',
  height: '2rem',
  cursor: 'pointer',
})
