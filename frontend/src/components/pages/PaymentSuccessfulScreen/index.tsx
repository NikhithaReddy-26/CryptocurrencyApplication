import React from 'react'
import axios from 'axios'
import { Box, Stack, Typography, styled } from '@mui/material'
import { Dashboard } from '../../templates/Dashboard'
import Header from '../../organisms/Header'
import Sidebar from '../../organisms/SideBar'
import Icon from '../../atoms/Icons'
import TickMark from '../../../../public/assets/images/tickmark.svg'
import theme from '../../../utils/themes'
import CustomButton from '../../atoms/Button'
import { PaymentSuccessfulScreenDetails } from '../../../utils/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import { postTransactionData } from '../../../services/api/api'
import { Transaction } from '../../organisms/RecentTransactionCards'

interface Coin {
  id: number
  Name: string
  src: string
  Label: string
  Change: string
  MarketCap: number
  isWatchlisted: boolean
  Volume: number
  CirculatingSupply: number
  Price: number[]
}

interface WalletEntry {
  id: number
  Name: string
  Date: {
    Month: string
    Day: string
  }
  purchasePrice: number
  transactionType: 'Purchase' | 'Sell'
  transactionExchangeValue: number
  increasePrice: number
}

interface Wallet {
  Bitcoin?: WalletEntry[]
  Ethereum?: WalletEntry[]
}

export interface User {
  id: string
  name: string
  accountBalance: number
  holdings: {
    coinName: string
    coinLabel: string
    purchaseVolume: number
    Wallet: Wallet
  }[]
}

const StyledBox = styled(Box)({
  width: '26%',
  height: '38%',
  paddingLeft: '2%',
  paddingRight: '2%',
})

const StyledOuterBox = styled(Box)({
  height: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
})

export const PaymentSuccessfulScreen = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const CoinType = location.state?.defaultCoin
  const transactionType = location.state?.type
  const transactionExchangeValue = location.state?.CoinValue

  const transactionData: Transaction = {
    walletId: CoinType === 'Bitcoin' ? 1 : 2,
    transactionPrice:
      CoinType === 'Bitcoin'
        ? parseFloat(transactionExchangeValue) * 29052
        : parseFloat(transactionExchangeValue) * 1833,
    cryptoPrice: parseFloat(transactionExchangeValue),
    date: new Date(),
    fromUser: PaymentSuccessfulScreenDetails.newEntryName,
    transactionType
  }

  const handleButtonClick = async () => {
    await postTransactionData(transactionData)
    navigate("/walletCash")
  }

  return (
    <Dashboard
      navbar={<Header headerName={'Checkout'} />}
      sidebar={<Sidebar />}
      content={
        <StyledOuterBox>
          <StyledBox>
            <Stack direction="column" spacing={4} alignItems="center">
              <Icon src={TickMark} width="64px" height="64px" />
              <Typography variant="h4" color={`${theme.palette.text.highemp}`}>
                {transactionExchangeValue}
              </Typography>
              {transactionType === 'Purchased' && (
                <Typography
                  variant="b2"
                  color={`${theme.palette.text.highemp}`}
                  align="center"
                >
                  {PaymentSuccessfulScreenDetails.PurchaseMessage}
                </Typography>
              )}
              {transactionType === 'Sold' && (
                <Typography
                  variant="b2"
                  color={`${theme.palette.text.highemp}`}
                  align="center"
                >
                  {PaymentSuccessfulScreenDetails.SellMessage}
                </Typography>
              )}
              <Stack direction="row" spacing={4}>
                <CustomButton
                  children="BUY CRYPTO"
                  typoVariant="button"
                  variant="outlined"
                />
                <CustomButton
                  data-testid="Page-button-click"
                  children="GO TO USD COIN"
                  typoVariant="button"
                  variant="contained"
                  style={{ backgroundColor: `${theme.palette.primary[500]}` }}
                  onClick={handleButtonClick}
                />
              </Stack>
            </Stack>
          </StyledBox>
        </StyledOuterBox>
      }
    />
  )
}
