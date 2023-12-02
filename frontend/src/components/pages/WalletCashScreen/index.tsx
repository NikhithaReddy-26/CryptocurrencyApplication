import Header from '../../organisms/Header'
import Sidebar from '../../organisms/SideBar'
import WatchlistBar from '../../organisms/WatchListBar'
import { Dashboard } from '../../templates/Dashboard'
import tick from '../../../../public/assets/images/tickmark.svg'
import { Box, Divider, Stack, Typography, styled } from '@mui/material'
import theme from '../../../utils/themes'
import React, { useEffect, useState } from 'react'
import { SearchFilter } from '../../molecules/SearchWithFilter'
import { Dropdown } from '../../molecules/Dropdown'
import { TransactionCard } from '../../molecules/WalletTranscations'
import { WalletDetails, WatchlistBarData } from '../../../utils/constants'
import axios from 'axios'
import { Transaction } from '../../organisms/RecentTransactionCards'
import { fetchTransactionsData, getUserData } from '../../../services/api/api'

const DetailsBox = styled(Box)`
  gap: 16px;
  padding: 24px;
  margin-top: 16px;
`
const StyledRowStack = styled(Stack)`
  display: flex;
  justify-content: flex-end;
  padding-top: 16px;
`
const StyledStack = styled(Stack)`
  overflow-y: scroll;
  overflow-x: hidden;
  max-height: 35vh;

  ::-webkit-scrollbar {
    width: 5px;
    padding: 10px;
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
}`

const StyledBox = styled(Box)`
  background-color: ${theme.palette.gray[50]};
  min-height: 60px;
  padding: 16px 24px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`

export const WalletCashScreen = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([])
  const [accountBalance, setAccountBalance] = useState<number>(0)

  useEffect(() => {
    const fetchCryptoData = async () => {
      const response = await getUserData();
      setAccountBalance(response?.account_balance)
    }
    fetchCryptoData()
  }, [])

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
    <Dashboard
      sidebar={<Sidebar />}
      navbar={<Header headerName={WalletDetails.HeaderName} />}
      content={
        <Box padding={'24px'}>
          <Stack gap={2} direction={'column'}>
            <Typography variant="subtitle2" color={theme.palette.gray[500]}>
              Wallet
            </Typography>

            <WatchlistBar {...WatchlistBarData} />

            <StyledBox>
              <Typography
                children={WalletDetails.TotalBalance}
                variant="subtitle1"
                color={theme.palette.text.highemp}
              />
              <Typography
                children={`$ ${accountBalance}`}
                variant="subtitle1"
                color={theme.palette.text.highemp}
              />
            </StyledBox>

            <StyledRowStack direction="row" spacing={4}>
              <SearchFilter filterEnabled={true} />
              <Dropdown text={WalletDetails.dropdownText} variant={'b1'} />
            </StyledRowStack>

            <DetailsBox bgcolor={'white'}>
              <StyledStack direction={'column'} spacing={1}>
                {transactions.map((transaction: Transaction) => (
                  <React.Fragment key={transaction.transactionId}>
                    <TransactionCard
                      status={transaction.transactionType}
                      month={new Date(transaction.date).toLocaleString(
                        'default',
                        { month: 'short' }
                      )}
                      day={new Date(transaction.date).getDate()}
                      currencyName={
                        transaction.walletId == 1 ? 'Bitcoin' : 'Ethereum'
                      }
                      from={transaction.fromUser}
                      currencyValue={
                        transaction.transactionType === 'Purchased'
                          ? `+${transaction.cryptoPrice}`
                          : `-${transaction.cryptoPrice}`
                      }
                      convertedAmount={
                        transaction.transactionType === 'Purchased'
                          ? `+$${transaction.transactionPrice}`
                          : `-$${transaction.transactionPrice}`
                      }
                      imgSource={tick}
                    />
                    <Divider />
                  </React.Fragment>
                )).reverse()}
              </StyledStack>
            </DetailsBox>
          </Stack>
        </Box>
      }
    />
  )
}
