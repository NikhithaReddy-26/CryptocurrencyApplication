import { Box, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import Icon from '../../atoms/Icons'
import Images from '../../atoms/Image'
import Graph from '../../atoms/Graph'
import CustomChip from '../../atoms/Chip'
import theme from '../../../utils/themes'
import UpArrow from '../../../../public/assets/icons/UpArrowGreen.svg'
import DownArrow from '../../../../public/assets/icons/DownArrowRed.svg'

export interface GraphArrayProps {
  data: Array<{
    x: number | string | Date
    y: number | string | Date
  }>
}

interface WatchListProps {
  CoinChangePercentage: string
  WatchListIcon: string
  CoinName: string
  CoinValue: string
  data: any
  sx?: React.CSSProperties
  onClick?:() => void
}

const StyledBox = styled(Box)({
  maxHeight: '130px',
  border: `1px solid ${theme.palette.gray[100]}`,
  backgroundColor: 'white',
  padding: '24px',
  boxSizing: 'border-box',
  display: 'flex',
  alignItems: 'center',
})

const WatchList = ({
  CoinChangePercentage,
  data,
  WatchListIcon,
  CoinName,
  CoinValue,
  onClick
}: WatchListProps) => {
  const findColor = (val: string) => {
    const redColor = `${theme.palette.semantic.error[500]}`
    const greenColor = `${theme.palette.semantic.success[500]}`
    const colorIs = val.includes('-') ? redColor : greenColor
    return colorIs
  }

  const findIconArrow = (val: string) => {
    const upArrow: any = UpArrow
    const downArrow: any = DownArrow
    const arrow: any = val.includes('-') ? downArrow : upArrow
    return arrow
  }

  return (
    <StyledBox data-testid="watchlist" onClick={onClick}>
      <Stack direction="column" spacing={1}>
        <Stack direction="row" spacing={1}>
          <Images src={WatchListIcon} />
          <Stack direction="column" spacing={1}>
            <Typography variant="b1" color={theme.palette.text.primary}>
              {CoinName}
            </Typography>
            <Typography variant="b1" color={theme.palette.text.primary}>
              {CoinValue}
            </Typography>
          </Stack>
        </Stack>
        <Stack alignSelf="center">
          <CustomChip
            label="24h"
            variant="filled"
            style={{
              backgroundColor: `${theme.palette.grey[50]}`,
            }}
          />
        </Stack>
      </Stack>
      <Stack direction="column" width={'100%'}>
        <Stack direction="row" alignSelf="flex-end">
          <Icon
            src={findIconArrow(CoinChangePercentage)}
            style={{ marginRight: '8px' }}
          />
          <Typography
            variant="overline"
            color={findColor(CoinChangePercentage)}
          >
            {CoinChangePercentage}
          </Typography>
        </Stack>
        <Box height="70px" width="inherit">
          <Graph
            data={data}
            showYGridLines={false}
            showXAxis={false}
            showLegends={false}
            margins={{
              top: 10,
              right: 0,
              bottom: 0,
              left: 0,
            }}
          />
        </Box>
      </Stack>
    </StyledBox>
  )
}

export default WatchList
