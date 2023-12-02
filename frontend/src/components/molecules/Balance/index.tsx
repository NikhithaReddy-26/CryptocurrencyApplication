import { Typography, Stack, styled, Box } from '@mui/material'
import React from 'react'
import theme from '../../../utils/themes'
import Icon from '../../atoms/Icons'
import UsdCoin from '../../../../public/assets/images/rupee.svg'

interface Balance {
  heading1: string
  description: string
  balanceAmount: string | undefined
}

const StyledBox = styled(Box)({
  width: 'auto',
  padding: '2.2%',
  borderRadius: '0.25rem',
  boxSizing: 'border-box',
  marginTop: '16px',
  backgroundColor: `${theme.palette.gray.white}`
})

const StyledTypography1 = styled(Typography)({
  display: 'flex',
  alignItems: 'center',
})

const Balance = ({
  heading1,
  description,
  balanceAmount,
}: Balance) => {
  return (
    <StyledBox>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center">
          <Icon src={UsdCoin} />
          <Stack direction="column" spacing={1} alignContent={'center'}>
            <Typography variant={'b1'} color={theme.palette.text.highemp}>
              {heading1}
            </Typography>
            <Typography variant="c2" color={theme.palette.text.medemp}>
              {description}
            </Typography>
          </Stack>
        </Stack>
        <StyledTypography1 variant={'b1'} color={theme.palette.text.highemp}>
          {balanceAmount}
        </StyledTypography1>
      </Stack>
    </StyledBox>
  )
}

export default Balance