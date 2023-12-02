import { Box, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import MyAvatar from '../../atoms/Avatar'
import Icon from '../../atoms/Icons'
import Dropdown from '../../../../public/assets/icons/chevron-down.svg'
import theme from '../../../utils/themes'
import CustomButton from '../../atoms/Button'
import { HeaderButtons } from '../../../utils/constants' 

interface Headerprops {
  headerName: string
  onBuyClick?: () => void
  onSellClick?: () => void
}

const StyledBox = styled(Box)({
  padding: '20px 24px 20px 24px',
  border: `0px solid ${theme.palette.gray.white}`,
  borderBottom: `1px solid ${theme.palette.gray[100]}`
})

const Header = ({ headerName, onBuyClick, onSellClick }: Headerprops) => {
  const isCheckout = headerName === 'Checkout'

  return (
    <StyledBox>
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h6" color={theme.palette.text.highemp} paddingLeft={'32px'}>
          {headerName}
        </Typography>
        <Stack direction="row" spacing={4}>
          {!isCheckout && (
            <Stack direction="row" spacing={1}>
              <CustomButton
                onClick={onSellClick}
                children={HeaderButtons.SellButton}
                variant="contained"
                typoVariant="button"
                style={{
                  backgroundColor: theme.palette.semantic.warning[300],
                  padding: '0px 16px 0px 16px',
                  width: '7.5rem',
                }}
              />
              <CustomButton
                onClick={onBuyClick}
                children={HeaderButtons.BuyButton}
                variant="contained"
                typoVariant="button"
                style={{
                  backgroundColor: theme.palette.primary[500],
                  padding: '0px 16px 0px 16px',
                  width: '7.5rem',
                }}
              />
            </Stack>
          )}
          <Stack direction="row">
            <MyAvatar alt="Profile" />
            <Icon src={Dropdown} />
          </Stack>
        </Stack>
      </Stack>
    </StyledBox>
  )
}

export default Header
