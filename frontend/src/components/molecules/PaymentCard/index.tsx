import UsdCoin from '../../../../public/assets/icons/Property 1=icons, Property 2=rupee1.svg'
import { Box, Stack, Typography, styled } from '@mui/material'
import Icon from '../../atoms/Icons'
import theme from '../../../utils/themes'


interface PaymentCardProps {
    title?: string
    heading1?: string
    description?: string
    otherText?: string
    balanceAmount?: string
    sx?:any
  }

const SBox = styled(Box)({
  width: '63vw',
  height: '11.8vh',
  minWidth:'710px',
  minHeight:'166px',
  padding: '1.6%',
  border: `0.0625rem solid #E8E8F7`,
  borderRadius: '0.25rem',
  boxSizing:'border-box',
  flexGrow:'1',
  backgroundColor:`${theme.palette.gray.white}`,
  
})

const StyledBox = styled(Box)({
  width: '100%',
  height: '48%',
  minWidth:'662px',
  minHeight:'80px',
  padding: '2.2%',
  border: `0.0625rem solid #E8E8F7`,
  borderRadius: '0.25rem',
  boxSizing:'border-box',
  marginTop:'16px'

})

const StyledTypography1 = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
})


const PaymentCard: React.FC<PaymentCardProps> = ({
  title,
  heading1,
  description,
  otherText,
  balanceAmount,
}) => {
  return (
    <SBox>
      <Typography variant={'b1'} color={theme.palette.text.highemp}>
        {title}
      </Typography>
      <StyledBox>
        <Stack direction="row" justifyContent="space-between">
          <Stack direction="row" spacing={1} alignItems="center">
            <Icon src={UsdCoin} />
            <Stack direction="column" spacing={1} alignContent={'center'}>
              <Typography variant={'c1'} color={theme.palette.text.highemp}>
                {heading1}
              </Typography>
              <Typography variant="c1" color={theme.palette.text.medemp}>
                {description}
                {balanceAmount}
              </Typography>
            </Stack>
          </Stack>
          <StyledTypography1 variant={'c1'} color={theme.palette.text.medemp}>
            {otherText}
          </StyledTypography1>
        </Stack>
      </StyledBox>
    </SBox>
  )
}

export default PaymentCard
