import React, { useEffect, useState } from 'react'
import { CRYPTOS, graphData } from '../../../utils/constants'
import { Box, Divider, Grid, Stack, Typography } from '@mui/material'
import WatchList from '../WatchList'
import { API_BASE_URL, LoggedUserId, fetchCoinData ,authDashboard} from '../../../services/api/api'
import theme from '../../../utils/themes'
import styled from '@emotion/styled'
import Icon from '../../atoms/Icons'
import RightArrow from '../../../../public/assets/icons/Right-ArrowBlue.svg'
import Pencil from '../../../../public/assets/icons/Pencil.svg'
import List from '../../../../public/assets/icons/list.svg'
import Component from '../../../../public/assets/icons/components-menu.svg'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { coinData } from '../MyPortFolioCardsList'

export interface WatchlistApi {
  watchlistId?: number
  userId: number
  cryptocurrencyId: number
}

const StyledBox = styled(Box)`
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 328px;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #b4b4cf;
    border-radius: 5px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`
const HeaderBox = styled(Box)`
  width: 100%;
  padding: 15px 10px;
  display: flex;
  justify-content: space-between;
`
const LeftBox = styled(Box)`
  display: flex;
  width: 25%;
  justify-content: space-around;
  align-items: center;
`
const RightBox = styled(Box)`
  display: flex;
  width: 20%;
  justify-content: space-between;
  align-items: center;
`
const InnerLeftBox = styled(Box)`
  display: flex;
  align-items: center;
`

const WatchListGraph = () => {
  const [coinDataList, setCoinDataList] = useState<coinData[]>([])
  const [watchlist, setWatchlist] = useState<WatchlistApi[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCryptoAndWatchlistData = async () => {
      const cryptoResponse = await fetchCoinData()
      if (Array.isArray(cryptoResponse)) {
        const cryptoData = cryptoResponse
        const watchlistResponse = await authDashboard.get(
          `${API_BASE_URL}/watchlist/user/8`
        )
        const watchlistData = watchlistResponse.data
        const watchlistIds = watchlistData.map(
          (watchlistItem: WatchlistApi) => watchlistItem.cryptocurrencyId
        )
        setWatchlist(watchlistIds)
        const watchlistedCryptocurrencies = cryptoData.filter(
          (crypto: coinData) => watchlistIds.includes(crypto.cryptoId)
        )
        setCoinDataList(watchlistedCryptocurrencies)
      }
    }
    fetchCryptoAndWatchlistData()
  }, [watchlist])


  function findSrc(coinLabel: string): string {
    const coin = CRYPTOS.find((crypto) => crypto.symbol === coinLabel)
    return coin?.icon
  }

  function finGraphData(coin: coinData): any {
    const { unitChange, cryptoLabel } = coin
    const colorIs = unitChange?.includes('-')
      ? theme.palette.semantic.error[500]
      : theme.palette.semantic.success[500]
    graphData[cryptoLabel][0].color = colorIs
    return graphData[cryptoLabel]
  }

  const navigateToDetailsScreen = (coinName: string) => {
    navigate('/details/Overview', {
      state: {
        coinName,
      },
    })
  }
  return (
    <StyledBox>
      <HeaderBox>
        <LeftBox>
          <Typography
            children="Watchlist"
            variant="subtitle1"
            color={`${theme.palette.text.highemp}`}
          />
          <Divider
            orientation="vertical"
            color={`${theme.palette.gray[100]}`}
          />
          <Stack direction={'row'} spacing={1} alignItems={'center'}>
            <Link to="/trade/all" style={{ textDecoration: 'none' }}>
              <Typography
                children="Discover Assets"
                variant="c1"
                color={`${theme.palette.primary[500]}`}
              />
            </Link>
            <Icon src={RightArrow} />
          </Stack>
        </LeftBox>
        <RightBox>
          <InnerLeftBox>
            <Link to="/trade/watchlist" style={{ textDecoration: 'none' }}>
              <Typography
                children="View Watchlist"
                variant="c1"
                color={`${theme.palette.primary[500]}`}
                textTransform="none"
              />
              <Icon src={Pencil} style={{ marginLeft: '10px' }} />
            </Link>
          </InnerLeftBox>
          <Divider
            orientation="vertical"
            color={`${theme.palette.gray[100]}`}
          />
          <Stack direction={'row'} spacing={1}>
            <Icon src={Component} />
            <Icon src={List} />
          </Stack>
        </RightBox>
      </HeaderBox>
      <Grid container spacing={2}>
        {coinDataList.map((coin: any) => (
          <Grid item xs={6} key={coin.cryptoId}>
            <WatchList
            data-test="watchlist"
              CoinChangePercentage={coin.unitChange}
              WatchListIcon={findSrc(coin.cryptoLabel)}
              CoinName={coin.cryptoName}
              CoinValue={coin.currentPrice}
              data={finGraphData(coin)}
              onClick={() => navigateToDetailsScreen(coin.cryptoName)}
            />
          </Grid>
        ))}
      </Grid>
    </StyledBox>
  )
}

export default WatchListGraph
