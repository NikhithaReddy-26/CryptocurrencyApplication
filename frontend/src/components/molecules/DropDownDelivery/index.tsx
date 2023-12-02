
import React from 'react'
import { Box, IconButton, Stack, Typography, styled } from '@mui/material'
import ExpandMoreIcon from '../../../../public/assets/icons/chevron-down.svg'
import TruckIcon from '../../../../public/assets/icons/delivery.svg'
import Icon from '../../atoms/Icons'
import theme from '../../../utils/themes'
import { DeliveryMessage } from '../../../utils/constants'

const StyledBox = styled(Box)({
  width: '60vw',
  height: '3%',
  padding: '1%',
  border: `1px solid ${theme.palette.gray[100]}`,
  borderRadius: '0.25rem',
  backgroundColor:`${theme.palette.gray.white}`,
})

interface DropDownBoxProps {
  coin: string
  onClick?: () => void
  isOpen?: boolean
}

const DropDownBox: React.FC<DropDownBoxProps> = ({ coin, onClick, isOpen }) => {
  return (
    <StyledBox>
      <Stack direction="row" justifyContent="space-between">
        <Stack direction="row" spacing={1} alignItems="center">
          <Icon src={TruckIcon} />
          <Stack direction="column" spacing={1}>
            <Typography variant="b1">{DeliveryMessage.DeliveryTime}</Typography>
            <Typography variant="c2" display="inline">
              {coin === 'Bitcoin'
                ? `${DeliveryMessage.BitcoinDeliveryFee}`
                : `${DeliveryMessage.EthereumDeliveryFee}`}
            </Typography>
          </Stack>
        </Stack>
        <IconButton
          onClick={onClick}
          aria-expanded={isOpen}
          datatest-id="dropDown-icon"
        >
          <img
            src={ExpandMoreIcon}
            alt="dropdown-icon"
            style={{
              transform: `rotate(${isOpen ? '180deg' : '0deg'})`,
              transition: 'transform 0.3s ease-in-out',
            }}
          />
        </IconButton>
      </Stack>
    </StyledBox>
  )
}

export default DropDownBox