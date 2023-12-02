
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import CryptoCard from '../../molecules/CryptoCard'
import theme from '../../../utils/themes'
import { CRYPTOS, paymentcard } from '../../../utils/constants'
import { useEffect, useState } from 'react'
import { coinData } from '../MyPortFolioCardsList'
import { fetchCoinData } from '../../../services/api/api'

interface PaymentCardsProps{
  selectedCrypto:string
}

export const PaymentCardList = ({ selectedCrypto }:PaymentCardsProps) => {
  const [coinData,setCoinData] = useState<coinData[] | null>([])

  useEffect(() => {
    const fetchCryptoData = async () => {
        const response = await fetchCoinData();
        if (Array.isArray(response)) {
          setCoinData(response);
        } 
    };
    fetchCryptoData();
  }, []);
  

  function findSrc(coinLabel: string): string {
    const coin = CRYPTOS.find((crypto) => crypto.symbol === coinLabel)
    return coin?.icon
  }
  
  const renderCryptoCards = (start: number, end: number) =>
    coinData?.slice(start,end).map((coin:coinData) => (
      <CryptoCard
        key={coin.cryptoId}
        icon={findSrc(coin.cryptoLabel)}
        title={coin.cryptoName}
        price={coin.currentPrice.toLocaleString('en-US', {
          style: 'currency',
          currency: 'USD',
        })}
        isSelected={selectedCrypto === coin.cryptoName}
      />
    ))

  return (
    <StyledBox>
      <Typography variant={'b1'} color={theme.palette.text.highemp}>
        {paymentcard.paymentcardTitle}
      </Typography>
      <StyledOuterStack>
        <StyledCryptoCardStack direction="row">
          {renderCryptoCards(0, 5)}
        </StyledCryptoCardStack>
        <StyledCryptoCardStack direction="row">
          {renderCryptoCards(5, 10)}
        </StyledCryptoCardStack>
        <StyledCryptoCardStack direction="row">
          {renderCryptoCards(10, 15)}
        </StyledCryptoCardStack>
      </StyledOuterStack>
    </StyledBox>
  )
}

const StyledBox = styled(Box)({
  width: '63vw',
  minWidth:"706px",
  padding: '24px',
  flexGrow: 1,
  borderRadius: '4px',
  border: `1px solid #E8E8F7`,
  backgroundColor:"white",
})

const StyledOuterStack = styled(Stack)`
  gap: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
  margin-top: 16px;
  max-height: 320px;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background-color: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 4px;
  }

  ::-webkit-scrollbar-thumb:hover {
    background-color: #555;
  }
`

const StyledCryptoCardStack = styled(Stack)({
  gap: '16px',
})