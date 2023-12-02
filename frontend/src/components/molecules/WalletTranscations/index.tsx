import React from 'react'
import { Box, Stack, Typography } from '@mui/material'
import theme from '../../../utils/themes'
import CustomChip from '../../atoms/Chip'
import styled from '@emotion/styled'

interface TransactionCardProps {
  month?: string
  day?: number
  status: string
  currencyName?: string
  from?: string
  currencyValue?: string
  convertedAmount?: string
  imgSource?: string
}

const StyledTypographyC2 = styled(Typography)`
  color: ${theme.palette.text.medemp};
`
const StyledTypography = styled(Typography)`
  color: ${theme.palette.text.highemp};
`

const StyledCustomChip = styled(CustomChip)`
  background-color: ${theme.palette.gray[50]};
`
export const TransactionCard = (props: TransactionCardProps) => {
  return (
    <Box bgcolor='white'padding='0 24px 0 0'>   
    <Stack
      direction={'row'}
      justifyContent={'space-between'}
      alignItems={'flex'} 
      minWidth={'83vw'}
    >
      <Stack direction={'row'} gap={theme.spacing(3)}>
      <Stack direction={'row'} gap={theme.spacing(2)} alignItems="center"> 
        <Stack direction={'column'}>
          <StyledTypographyC2 variant={'c2'}>
            {props.month}
          </StyledTypographyC2>

          <StyledTypography variant={'subtitle2'}>
            {props.day}
          </StyledTypography>
        </Stack>

        <img src={props.imgSource} alt="Transaction status Image" />
      </Stack>
      
      <Stack direction={'column'} >
        <StyledTypography variant={'b1'}>
          {props.currencyName}
        </StyledTypography>
        <Stack direction={'row'} alignItems={'center'} gap={theme.spacing(2)}>
          <StyledTypography variant={'c2'}>
            from {props.from}
          </StyledTypography>
          <StyledCustomChip label={props.status} variant={'filled'} />
        </Stack>
      </Stack>
      </Stack>
      <Stack direction={'column'} alignItems={'flex-end'}>
        <StyledTypography variant={'b1'}>
          {props.currencyValue}
        </StyledTypography>
        <StyledTypographyC2 variant={'c2'}>
          {props.convertedAmount}
        </StyledTypographyC2>
      </Stack>
    </Stack>
  </Box>
  );
};
