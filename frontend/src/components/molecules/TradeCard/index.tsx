import { Box, Stack, Typography, styled } from '@mui/material'
import React, { useRef } from 'react'
import Images from '../../atoms/Image'
import theme from '../../../utils/themes'
import Icon from '../../atoms/Icons'
import CheckedStar from './../../../../public/assets/icons/Property 1=icons, Property 2=star-fill.svg'
import UnCheckedStar from './../../../../public/assets/icons/Property 1=icons, Property 2=star-line.svg'

const StyledBox = styled(Box)({
  width: '100%',
  border: `1px solid ${theme.palette.gray[100]}`,
  backgroundColor: `${theme.palette.gray.white}`,
  borderRadius: '4px',
  padding: '16px 24px 16px 24px',
})

interface TradeCardProps {
  onClick?: () => void
  coinName: string
  coinSrc: string
  coinCaption: string
  coinPrice: number
  coinChange?: string
  coinMarketCap: string
  coinisWatchListed?: boolean
  boxClick?: () => void
}

const TradeCardContainer = styled(Stack)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const EachElement = styled(Box)({
  width: '20%',
})

const TradeCard: React.FC<TradeCardProps> = ({
  coinName,
  coinSrc,
  coinCaption,
  coinPrice,
  coinChange,
  coinMarketCap,
  coinisWatchListed,
  onClick,
  boxClick,
}) => {
  const isPositiveChange = coinChange?.includes('+')
  const changeColor = isPositiveChange ? 'green' : 'red'

  const isClickedRef = useRef(false)

  const handleClick = () => {
    isClickedRef.current = true
    onClick?.()
  }

  const handleBoxClick = () => {
    if (!isClickedRef.current) {
      boxClick?.()
    }
    isClickedRef.current = false
  }

  return (
    <StyledBox data-testid="trade-card" onClick={handleBoxClick}>
      <TradeCardContainer>
        <EachElement>
          <Stack direction="row" spacing={1}>
            <Images src={coinSrc} />
            <Stack direction="column" spacing={1}>
              <Typography variant="b1" color={theme.palette.text.highemp}>
                {coinName}
              </Typography>
              <Typography variant="overline">{coinCaption}</Typography>
            </Stack>
          </Stack>
        </EachElement>
        <EachElement paddingLeft='1.75%'>
          <Typography variant="b2">{coinPrice}</Typography>
        </EachElement>
        <EachElement paddingLeft="3%">
          <Typography variant="b2" color={changeColor}>
            {coinChange}
          </Typography>
        </EachElement>
        <EachElement paddingLeft="5.75%">
          <Typography variant="b2">{coinMarketCap}</Typography>
        </EachElement>
        <EachElement paddingLeft="12.25%">
          <Icon
            data-testid="trade-card-icon"
            src={coinisWatchListed ? CheckedStar : UnCheckedStar}
            onClick={handleClick}
          />
        </EachElement>
      </TradeCardContainer>
    </StyledBox>
  )
}

export default TradeCard
