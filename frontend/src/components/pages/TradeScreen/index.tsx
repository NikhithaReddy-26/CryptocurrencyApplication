import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Dashboard } from '../../templates/Dashboard'
import Sidebar from '../../organisms/SideBar'
import Header from '../../organisms/Header'
import { Box, Stack, Tab, Tabs, Typography, styled } from '@mui/material'
import TradeCard from '../../molecules/TradeCard'
import ColumnHeader from '../../molecules/ColumnHeader'
import { SearchFilter } from '../../molecules/SearchWithFilter'
import { Dropdown } from '../../molecules/Dropdown'
import { CRYPTOS } from '../../../utils/constants'
import { useNavigate, useParams } from 'react-router-dom'
import {
  API_BASE_URL,
  LoggedUserId,
  deleteWatchlistedData,
  fetchCoinData,
  postWatchlistedData,
  headers,
  authDashboard,
} from '../../../services/api/api'
import { coinData } from '../../organisms/MyPortFolioCardsList'
import { WatchlistApi } from '../../organisms/WatchListGraph'

const StyledBox = styled(Stack)({
  paddingLeft: '1%',
  paddingRight: '1%',
  gap: 4,
})

const StyledTab = styled(Tabs)({
  width: '69%',
  paddingLeft: '30px',
  marginBottom: '10px',
  marginTop: '10px',
})

const TradeScreen: React.FC = () => {
  const { tab } = useParams<{ tab: string }>()
  const [cryptoData, setCryptoData] = useState<coinData[]>([])
  const [cryptocurrencyData, setCryptocurrencyData] = useState<any>([])
  const [selectedTab, setSelectedTab] = useState<string | undefined>('all')
  const [searchValue, setSearchValue] = useState<string>('')
  const [watchlist, setWatchlist] = useState<number[]>([])

  useEffect(() => {
    setSelectedTab(tab)
  }, [tab])

  const navigate = useNavigate()

  useEffect(() => {
    const fetchCryptoAndWatchlistData = async () => {
      const cryptoResponse = await fetchCoinData()
      if (Array.isArray(cryptoResponse)) {
        const cryptoData = cryptoResponse
        setCryptoData(cryptoData)
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
        setCryptocurrencyData(watchlistedCryptocurrencies)
      }
    }
    fetchCryptoAndWatchlistData()
  }, [watchlist])

  const handleTabChange = (event: React.SyntheticEvent, newValue: string) => {
    setSelectedTab(newValue)
  }

  const navigateToWalletPage = (coinName: string) => {
    navigate('/details/Overview', {
      state: {
        coinName,
      },
    })
  }

  function findSrc(coinLabel: string): string {
    const coin = CRYPTOS.find((crypto) => crypto.symbol === coinLabel)
    return coin?.icon
  }

  const filterCoins = (coins: any[], searchText: string) => {
    if (!searchText) return coins

    return coins.filter((coin: any) =>
      coin.cryptoName.toLowerCase().includes(searchText.toLowerCase())
    )
  }

  const renderTradeCards = (coins: any[]) => {
    const postWatchlisted = async (cryptoId: number) => {
      await postWatchlistedData(cryptoId)
    }

    const deleteWatchlisted = async (cryptoId: number) => {
      await deleteWatchlistedData(cryptoId)
    }

    const filteredCoins = filterCoins(coins, searchValue)

    return filteredCoins?.map((coin: any) => {
      const isWatchlisted = watchlist.includes(coin.cryptoId)
      const formattedPrice = coin.currentPrice?.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD',
      })

      return (
        <Box marginBottom={'8px'} key={coin.cryptoId}>
          <TradeCard
            coinName={coin.cryptoName}
            coinSrc={findSrc(coin.cryptoLabel)}
            coinCaption={coin.cryptoLabel}
            coinPrice={formattedPrice}
            coinChange={coin.unitChange?.toLocaleString()}
            coinMarketCap={`$${coin.marketCapital}`}
            coinisWatchListed={isWatchlisted}
            onClick={
              isWatchlisted
                ? () => deleteWatchlisted(coin.cryptoId)
                : () => postWatchlisted(coin.cryptoId)
            }
            boxClick={() => navigateToWalletPage(coin.cryptoName)}
          />
        </Box>
      )
    })
  }

  return (
    <Dashboard
      sidebar={<Sidebar onDashboardClick={() => {}} />}
      navbar={<Header headerName={'Trade'} />}
      content={
        <Stack paddingLeft="1%" paddingRight="1%">
          <Stack direction={'row'} justifyContent={'space-between'}>
            <StyledTab
              value={selectedTab}
              onChange={handleTabChange}
              sx={{ borderBottom: 1, borderColor: 'divider' }}
            >
              <Tab
                data-testid="tab1"
                label={
                  <Typography variant="subtitle2" textTransform="none">
                    All Assets
                  </Typography>
                }
                value="all"
              />
              <Tab
                data-testid="tab2"
                label={
                  <Typography variant="subtitle2" textTransform="none">
                    Watchlist
                  </Typography>
                }
                value="watchlist"
              />
            </StyledTab>
            <Stack
              direction={'row'}
              spacing={3}
              alignItems="flex-end"
              marginBottom={'10px'}
            >
              <SearchFilter filterEnabled={false} onChange={setSearchValue} />
              <Dropdown text={'24h'} variant={'b1'} />
              <Dropdown text={'All assets'} variant={'b1'} />
            </Stack>
          </Stack>
          <StyledBox>
            <ColumnHeader
              name={'Name'}
              price={'Price'}
              change={'Change'}
              marketCap={'Market Cap'}
            />
            {selectedTab === 'all' && renderTradeCards(cryptoData)}
          </StyledBox>
          <StyledBox>
            {selectedTab === 'watchlist' &&
              renderTradeCards(cryptocurrencyData)}
          </StyledBox>
        </Stack>
      }
    />
  )
}

export default TradeScreen
