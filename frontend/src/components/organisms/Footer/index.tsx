import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import theme from '../../../utils/themes/index'
import CustomButton from '../../atoms/Button'
import { Dropdown } from '../../molecules/Dropdown'
import { FooterContent } from '../../../utils/constants'

export const Footer = () => {
  return (
    <StyledBox>
      <Stack direction="row" spacing={3}>
        <Typography variant={'b2'} color={theme.palette.primary[500]}>
          {FooterContent.Dashboard}
        </Typography>
        <Typography variant={'b2'} color={theme.palette.primary[500]}>
          {FooterContent.Careers}
        </Typography>
        <Typography variant={'b2'} color={theme.palette.primary[500]}>
          {FooterContent.Legal}
        </Typography>
        <Typography variant={'b2'} color={theme.palette.text.highemp}>
          {FooterContent.Copyright}
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3}>
        <Dropdown
          text={FooterContent.Dropdowntext}
          width={'12.26%'}
          variant={'b2'}
          height={'42px'}
        />
        <CustomButton variant="outlined" children={FooterContent.ButtonText} />
      </Stack>
    </StyledBox>
  )
}

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  height: '5%',
  padding: '1% 1% 1% 1%',
  flexGrow: 1,
  justifyContent: 'space-between',
  borderTop: `1px solid ${theme.palette.gray[100]}`
}) 