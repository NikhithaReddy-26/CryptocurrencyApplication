import React, { useEffect, useState } from 'react'
import { fetchCoinData, getUserData } from '../../../services/api/api'
import Header from '../../organisms/Header'
import Sidebar from '../../organisms/SideBar'
import { Dashboard } from '../../templates/Dashboard'
import { Box, Stack, Typography, styled } from '@mui/material'
import { PaymentCardList } from '../../organisms/PaymentCards'
import PaymentCard from '../../molecules/PaymentCard'
import AmountDetails from '../../organisms/AmountDetails'
import DeliveryFee from '../../organisms/DeliveryFee'
import OrderSummary from '../../organisms/OrderSummary'
import theme from '../../../utils/themes'
import {
  PurchaseDetails,
  PaymentCardDetails,
  OrderSummaryDetails,
  ButtonTexts,
} from '../../../utils/constants'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const ContentWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  overflow: 'hidden',
})

export const LeftContainer = styled(Box)({
  flex: 1,
  padding: '24px',
  width: '90vw',
  overflowY: 'auto',
  overflowX: 'hidden',
  '&::-webkit-scrollbar': {
    width: '6px',
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.gray[50],
    borderRadius: '3px',
  },
})

export const RightContainer = styled(Box)({
  width: '527px',
  position: 'sticky',
})

interface CoinData {
  Name: string
  Price: number[]
  DeliveryFee: string
  TransactionFee: string
  Label: string
}

interface UserData {
  accountBalance: number
}

interface Data {
  User: UserData[]
  Coins: CoinData[]
}

export const PurchaseScreen = () => {
  const [balanceAmount, setBalanceAmount] = useState<number>(10000)
  const [coinPrice, setCoinPrice] = useState<number>(0)
  const [coinValue, setCoinValue] = useState<number>(0)
  const [conversionValue, setConversionValue] = useState<string>('')
  const [coinLabel, setCoinLabel] = useState<string>('')
  const [deliveryFee, setDeliveryFee] = useState<string>('1')
  const [transactionFee, setTransactionFee] = useState<string>('')
  const [total, setTotal] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()

  const defaultCoin = location.state?.selectedCoin

  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserData()
      setBalanceAmount(response?.account_balance)
    }
    fetchData()
  }, [])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCoinData()
      const coinData = response?.find(
        (coin: any) => coin.cryptoName === defaultCoin
      )
      if (coinData) {
        const { currentPrice, cryptoLabel } = coinData
        setCoinPrice(currentPrice)
        setCoinLabel(cryptoLabel)
        setDeliveryFee('1')
        setTransactionFee('1')
      }
    }
    fetchData()
  }, [])

  useEffect(() => {
    if (coinValue === 0) {
      setConversionValue('0')
    } else {
      const conversionValue = (coinValue / coinPrice).toFixed(7)
      setConversionValue(conversionValue)
    }

    if (coinValue !== 0) {
      const costOrderValue = parseFloat(coinValue.toFixed(2))
      const transactionFeeValue = parseFloat(transactionFee)
      const totalValue = costOrderValue + transactionFeeValue
      setTotal(totalValue.toFixed(2))
    } else {
      const transactionFeeValue = parseFloat(transactionFee)
      setTotal(transactionFeeValue.toFixed(2))
    }
  }, [coinValue, coinPrice, transactionFee])

  const handleCoinValueChange = (value: number) => {
    setCoinValue(value)
  }

  const handleButtonClick = () => {
    const balanceValue = parseFloat(balanceAmount)
    setCoinValue(balanceValue)
  }

  const cards = [
    {
      id: 'card1',
      component: (
        <Typography variant="subtitle1" color={theme.palette.text.highemp}>
          {PurchaseDetails.CardName}
        </Typography>
      ),
    },
    {
      id: 'card2',
      component: <PaymentCardList selectedCrypto={defaultCoin} />,
    },
    {
      id: 'card3',
      component: (
        <PaymentCard
          title={PaymentCardDetails.Title}
          heading1={PaymentCardDetails.Heading1}
          description={PaymentCardDetails.Description}
          otherText={PaymentCardDetails.OtherText}
          balanceAmount={balanceAmount}
        />
      ),
    },
    {
      id: 'card4',
      component: (
        <AmountDetails
          currency={coinLabel}
          price={coinPrice}
          value={coinValue}
          conversionValue={conversionValue}
          buttonText={ButtonTexts.BuyMax}
          onChange={handleCoinValueChange}
          onButtonClick={handleButtonClick}
        />
      ),
    },
    {
      id: 'card5',
      component: <DeliveryFee coin={defaultCoin} />,
    },
  ]

  const navigateToPaymentSuccessful = (CoinValue: string) => {
    navigate('/Payments', {
      state: {
        defaultCoin,
        type: 'Purchased',
        CoinValue,
      },
    })
  }

  const orderValue = coinValue !== 0 ? `${conversionValue} ${coinLabel}` : '0'
  return (
    <Dashboard
      sidebar={<Sidebar />}
      navbar={<Header headerName={PurchaseDetails.HeaderName} />}
      content={
        <ContentWrapper>
          <LeftContainer>
            <Stack direction="column" width="120vw">
              {cards.map((card, index) => (
                <Box marginBottom="16px" key={card.id}>
                  {card.component}
                </Box>
              ))}
            </Stack>
          </LeftContainer>
          <RightContainer>
            <OrderSummary
              OrderType={OrderSummaryDetails.OrderType}
              OrderValue={orderValue}
              CoinValue={`1 ${coinLabel} = ${new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
              }).format(coinPrice)}`}
              PaymentMethodIcon={OrderSummaryDetails.PaymentIcon}
              PaymentMethod={OrderSummaryDetails.PaymentMethod}
              PaymentMethodType={OrderSummaryDetails.PaymentMethodType}
              DeliveryFee={`${deliveryFee} ${coinLabel}`}
              DepositTypeIcon={OrderSummaryDetails.DepositIcon}
              DepositTo={`${defaultCoin} ${OrderSummaryDetails.DepositTo}`}
              CoinOrderValue={
                coinValue !== 0
                  ? `${(coinValue / coinPrice).toFixed(7)} ${coinLabel}`
                  : '0'
              }
              CostOrderValue={`$${parseFloat(
                coinValue.toFixed(2)
              ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              TransactionFee={`$${parseFloat(transactionFee).toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              )}`}
              Total={`$${parseFloat(total).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
              ButtonChildren={ButtonTexts.BuyNow}
              onClick={() => navigateToPaymentSuccessful(orderValue)}
            />
          </RightContainer>
        </ContentWrapper>
      }
    />
  )
}
