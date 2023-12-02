import React, { useEffect, useState } from 'react'
import { fetchCoinData, getUserData } from '../../../services/api/api'
import Header from '../../organisms/Header'
import Sidebar from '../../organisms/SideBar'
import { Dashboard } from '../../templates/Dashboard'
import { Box, Stack, Typography } from '@mui/material'
import { PaymentCardList } from '../../organisms/PaymentCards'
import PaymentCard from '../../molecules/PaymentCard'
import AmountDetails from '../../organisms/AmountDetails'
import OrderSummary from '../../organisms/OrderSummary'
import theme from '../../../utils/themes'
import {
  AmountDetaisConstants,
  PaymentCardDetails,
  ButtonTexts,
  SellDetails,
  OrderSummaryConstants,
  OrderDetails,
  TotalBalanceConst,
  CRYPTOS,
} from '../../../utils/constants'
import { TotalBalance } from '../../molecules/TotalBalance'
import {
  ContentWrapper,
  LeftContainer,
  RightContainer,
} from '../PurchaseScreen'
import { useLocation, useNavigate } from 'react-router-dom'
import axios from 'axios'

export const SellScreen = () => {
  const [sellBalanceAmount, setSellBalanceAmount] = useState<number>(10000)
  const [sellCoinPrice, setSellCoinPrice] = useState<number>(0)
  const [sellCoinValue, setSellCoinValue] = useState<number>(0)
  const [sellConversionValue, setSellConversionValue] = useState<string>('')
  const [sellCoinLabel, setSellCoinLabel] = useState<string>('')
  const [sellDeliveryFee, setSellDeliveryFee] = useState<string>('')
  const [sellTransactionFee, setSellTransactionFee] = useState<string>('')
  const [sellTotal, setSellTotal] = useState<string>('')
  const navigate = useNavigate()
  const location = useLocation()

  const defaultCoin = location.state?.selectedCoin
  const totalBalance = location.state?.totalBoughtForCoin

  function findSrcSell(coinLabel: string): string | undefined {
    const coin = CRYPTOS.find((crypto) => crypto.symbol === coinLabel)
    return coin ? coin.icon : undefined
  }


  useEffect(() => {
    const fetchData = async () => {
      const response = await getUserData();
      setSellBalanceAmount(response?.account_balance);
    }
    fetchData();
  },[])
  
  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCoinData();

      const coinData = response?.find(
        (coin:any) => coin.cryptoName === defaultCoin
      )

      if (coinData) {
        const { currentPrice,cryptoLabel } = coinData
        setSellCoinPrice(currentPrice)
        setSellCoinLabel(cryptoLabel)
        setSellDeliveryFee("1")
        setSellTransactionFee("1")
      }
    }
    fetchData();
  }, [])

  useEffect(() => {
    if (sellCoinValue === 0) {
      setSellConversionValue('0')
    } else {
      const conversionValue = (sellCoinValue / sellCoinPrice).toFixed(7)
      setSellConversionValue(conversionValue)
    }

    if (sellCoinValue !== 0) {
      const costOrderValue = parseFloat(sellCoinValue.toFixed(2))
      const transactionFeeValue = parseFloat(sellTransactionFee)
      const totalValue = costOrderValue + transactionFeeValue
      setSellTotal(totalValue.toFixed(2))
    } else {
      const transactionFeeValue = parseFloat(sellTransactionFee)
      setSellTotal(transactionFeeValue.toFixed(2))
    }
  }, [sellCoinValue, sellCoinPrice, sellTransactionFee])

  const handleSellCoinValueChange = (value: number) => {
    setSellCoinValue(value)
  }
  const handleSellButtonClick = () => {
    const balanceValue = parseFloat(sellBalanceAmount)
    setSellCoinValue(balanceValue)
  }

  const cards = [
    {
      id: 'card1',
      component: (
        <Typography variant="subtitle1" color={theme.palette.text.highemp}>
          {SellDetails.CardName}
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
        <TotalBalance
          title={TotalBalanceConst.title}
          heading={defaultCoin}
          amount={`${totalBalance} ${sellCoinLabel}`}
          src={findSrcSell(sellCoinLabel)}
        />
      ),
    },
    {
      id: 'card4',
      component: (
        <AmountDetails
          currency={AmountDetaisConstants.Currency}
          price={sellCoinPrice}
          value={Number(sellConversionValue)}
          conversionValue={`$${sellCoinValue.toLocaleString()}`}
          buttonText={ButtonTexts.SellMax}
          onChange={handleSellCoinValueChange}
          onButtonClick={handleSellButtonClick}
          showCurrencySign={false}
          coinLabel={sellCoinLabel}
          isBuy={false}
        />
      ),
    },
    {
      id: 'card5',
      component: (
        <PaymentCard
          title={OrderSummaryConstants.DepositTo}
          heading1={PaymentCardDetails.Heading1}
          otherText={PaymentCardDetails.OtherText}
        />
      ),
    },
  ]

  const navigateToPaymentSuccessful = (CoinValue: string) => {
    navigate('/Payments', {
      state: {
        defaultCoin,
        type: 'Sold',
        CoinValue,
      },
    })
  }

  const orderValue =
    sellCoinValue !== 0
      ? `${(sellCoinValue / sellCoinPrice).toFixed(7)} ${sellCoinLabel}`
      : '0'
  return (
    <Dashboard
      sidebar={<Sidebar />}
      navbar={<Header headerName={SellDetails.HeaderName} />}
      content={
        <ContentWrapper>
          <LeftContainer>
            <Stack direction="column" width="120vw">
              {cards.map((card) => (
                <Box marginBottom="16px" key={card.id}>
                  {card.component}
                </Box>
              ))}
            </Stack>
          </LeftContainer>
          <RightContainer>
            <OrderSummary
              OrderType={OrderDetails.OrderType}
              OrderValue={orderValue}
              CoinValue={`1 ${sellCoinLabel} = ${new Intl.NumberFormat(
                'en-US',
                {
                  style: 'currency',
                  currency: 'USD',
                  minimumFractionDigits: 2,
                }
              ).format(sellCoinPrice)}`}
              PaymentMethodIcon={OrderDetails.PaymentIcon}
              PaymentMethod={OrderDetails.PaymentMethod}
              PaymentMethodType={OrderDetails.PaymentMethodType}
              DeliveryFee={`${parseFloat(
                sellDeliveryFee
              ).toLocaleString()} ${sellCoinLabel}`}
              DepositTypeIcon={OrderDetails.DepositIcon}
              DepositTo={OrderDetails.DepositTo}
              CoinOrderValue={
                sellCoinValue !== 0
                  ? `${(sellCoinValue / sellCoinPrice).toFixed(
                      7
                    )} ${sellCoinLabel}`
                  : '0'
              }
              CostOrderValue={`$${parseFloat(
                sellCoinValue.toFixed(2)
              ).toLocaleString(undefined, { minimumFractionDigits: 2 })}`}
              TransactionFee={`$${parseFloat(sellTransactionFee).toLocaleString(
                undefined,
                { minimumFractionDigits: 2 }
              )}`}
              Total={`$${parseFloat(sellTotal).toLocaleString(undefined, {
                minimumFractionDigits: 2,
              })}`}
              ButtonChildren={ButtonTexts.SellNow}
              onClick={() => navigateToPaymentSuccessful(orderValue)}
            />
          </RightContainer>
        </ContentWrapper>
      }
    />
  )
}
