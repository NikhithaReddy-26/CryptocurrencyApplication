import { Box, Typography, styled } from '@mui/material'
import React, { useEffect, useState } from 'react'
import theme from '../../../utils/themes'
import Transactions from '../../molecules/RecentTransactions'
import SuccessTransaction from '../../../../public/assets/images/tickmark.svg'
import { fetchTransactionsData } from '../../../services/api/api'

export interface Transaction {
  transactionId?: number
  walletId: number
  transactionPrice: number
  cryptoPrice: number
  date: string | number | Date
  fromUser: string
  transactionType: 'Purchased' | 'Sold'
}

const HeaderBox = styled(Box)`
  display: flex;
  justify-content: space-between;
  margin: 10px 0px;
  padding: 24px 24px 0px 24px;
`

const TransactionsBox = styled(Box)`
  overflow-y: scroll;
  overflow-x: hidden;
  padding: 24px 0px 24px 24px;
  height: 40vh;

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
const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])

  useEffect(() => {
    const fetchData = async () => {
      const transactionsData = await fetchTransactionsData()
      if (Array.isArray(transactionsData)) {
        setTransactions(transactionsData)
      }
    }
    fetchData()
  }, [])

  return (
    <Box>
      <HeaderBox>
        <Typography
          children={'Recent transactions'}
          variant="b1"
          color={theme.palette.text.highemp}
        />
        <Typography
          children={'View All'}
          variant="c2"
          color={theme.palette.primary[500]}
        />
      </HeaderBox>
      <TransactionsBox>
        {transactions
          .map((transaction: Transaction) => {
            return (
              <Transactions
                key={transaction.transactionId}
                month={new Date(transaction.date).toLocaleString('default', {
                  month: 'short',
                })}
                date={new Date(transaction.date).getDate()}
                icon={SuccessTransaction}
                coinName={transaction.walletId === 1 ? 'Bitcoin' : 'Ethereum'}
                coinPrice={transaction.cryptoPrice}
                dollarPrice={transaction.transactionPrice}
                purchased={transaction.transactionType}
              />
            )
          })
          .reverse()}
      </TransactionsBox>
    </Box>
  )
}

export default RecentTransactions
