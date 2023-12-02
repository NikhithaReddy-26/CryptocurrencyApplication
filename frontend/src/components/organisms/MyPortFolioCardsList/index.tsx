import styled from '@emotion/styled'
import { Box, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../../utils/themes'
import Icon from '../../atoms/Icons'
import ListIcon from '../../../../public/assets/icons/BlueLinesDash.svg'
import ChartIcon from '../../../../public/assets/icons/chart.svg'
import { PortfolioCard } from '../../molecules/Portfoliocard'
import { fetchCoinData } from '../../../services/api/api'
import { CRYPTOS, DashBoardConstants } from '../../../utils/constants'
import { useNavigate } from 'react-router-dom'

export interface coinData {
  cryptoId?: number
  cryptoName: string
  src?: string
  cryptoLabel: string
  unitChange?: string
  marketCapital?: number
  isWatchListed?: boolean
  volume?: number
  circulatingSupply?: number
  currentPrice: number
}

const WrapperBox = styled(Box)`
  padding: 24px 15px 10px 15px;
`
const HeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
`
const IconBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const ListBox = styled(Box)`
  overflow-y: auto;
  overflow-x: hidden;
  height: 200px;

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
const PortfolioBox = styled(Box)`
  margin-top: 5px;
  padding-top: 24px;
  padding-bottom: 24px;
  border-top: 2px solid ${theme.palette.gray[100]};
  border-bottom: 2px solid ${theme.palette.gray[100]};
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  background-color: ${theme.palette.gray.white};
`

const PortFolioCardsList = () => {
  const [coinsData, setCoinsData] = useState<Array<coinData>>([])
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCoinData()
      if (Array.isArray(response)) {
        setCoinsData(response)
      }
    }
    fetchData()
  }, [])

  const navigateToWalletScreen = (coinName: string) => {
    navigate('/details/Wallet', {
      state: {
        coinName,
      },
    })
  }
  return (
    <WrapperBox>
      <HeaderBox>
        <Typography
          children={'My Portfolio'}
          variant="subtitle1"
          color={theme.palette.text.highemp}
        />
        <IconBox>
          <Icon src={ChartIcon} />
          <Icon src={ListIcon} />
        </IconBox>
      </HeaderBox>
      <ListBox>
        {coinsData?.map((coin: coinData) => {
          function findSrc(coinLabel: string): string | undefined {
            const coin = CRYPTOS.find((crypto) => crypto.symbol === coinLabel)
            return coin ? coin.icon : null
          }

          return (
            <PortfolioCard
              key={coin.cryptoId}
              height="70px"
              width="100%"
              src={findSrc(coin.cryptoLabel)}
              coinName={coin.cryptoName}
              coinLable={coin.cryptoLabel}
              coinPrice={coin.currentPrice.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
              })}
              coinChange={coin.unitChange}
              onClick={() => navigateToWalletScreen(coin.cryptoName)}
            />
          )
        })}
      </ListBox>
      <PortfolioBox>
        <Typography variant="b1" color={`${theme.palette.text.medemp}`}>
          {DashBoardConstants.TotalBalance}
        </Typography>
        <Typography variant="b1" color={`${theme.palette.text.highemp}`}>
          {DashBoardConstants.TotalBalnceAmount}
        </Typography>
      </PortfolioBox>
    </WrapperBox>
  )
}

export default PortFolioCardsList
