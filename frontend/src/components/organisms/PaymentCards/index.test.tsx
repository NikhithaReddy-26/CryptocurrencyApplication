import React from 'react'
import { render } from '@testing-library/react'
import { Box, Stack, Typography } from '@mui/material'
import { styled } from '@mui/system'
import { PaymentCardList } from './index'
import axios from 'axios'

describe('PaymentCardList', () => {
  const mockProps = {
    selectedCrypto: 'Bitcoin',
  }

  const CRYPTOS = [
    { icon: 'bitcoin-icon', title: 'Bitcoin', price: '$47,000' },
    { icon: 'ethereum-icon', title: 'Ethereum', price: '$2,500' },
    { icon: 'litecoin-icon', title: 'Litecoin', price: '$180' },
    { icon: 'ripple-icon', title: 'Ripple', price: '$0.75' },
    { icon: 'cardano-icon', title: 'Cardano', price: '$1.50' },
    { icon: 'binance-icon', title: 'Binance Coin', price: '$300' },
    { icon: 'dogecoin-icon', title: 'Dogecoin', price: '$0.30' },
    { icon: 'polkadot-icon', title: 'Polkadot', price: '$20' },
    { icon: 'chainlink-icon', title: 'Chainlink', price: '$25' },
    { icon: 'stellar-icon', title: 'Stellar', price: '$0.40' },
    { icon: 'vechain-icon', title: 'VeChain', price: '$0.10' },
    { icon: 'tron-icon', title: 'Tron', price: '$0.05' },
  ]

  const StyledBox = styled(Box)({
    alignItems: 'center',
    height: '30.39%',
    width: '51.6%',
    padding: '24px',
    flexGrow: 1,
    borderRadius: '4px',
    border: '1px solid #E8E8F7',
  })

  const StyledStack = styled(Stack)({
    gap: '2px',
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

  it('renders with correct props', () => {
    const { getByText } = render(<PaymentCardList {...mockProps} />)

    const titleElement = getByText('Choose crypto')
    expect(titleElement).toBeInTheDocument()
  })
})
