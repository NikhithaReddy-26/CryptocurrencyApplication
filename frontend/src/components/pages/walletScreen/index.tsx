import Header from '../../organisms/Header'
import Sidebar from '../../organisms/SideBar'
import WatchlistBar from '../../organisms/WatchListBar'
import { Dashboard } from '../../templates/Dashboard'
import Bitcoin from '../../../../public/assets/images/BItcoin.svg'
import Ethereum from '../../../../public/assets/images/Etherum.svg'
import tick from '../../../../public/assets/images/tickmark.svg'
import {
  Box,
  Divider,
  Link,
  Stack,
  Tab,
  Typography,
  styled,
} from '@mui/material'
import theme from '../../../utils/themes'
import { TabContext, TabList, TabPanel } from '@mui/lab'
import React, { useEffect, useState } from 'react'
import { SearchFilter } from '../../molecules/SearchWithFilter'
import { Dropdown } from '../../molecules/Dropdown'
import { TransactionCard } from '../../molecules/WalletTranscations'
import { WalletDetails } from '../../../utils/constants'
import Icon from '../../atoms/Icons'
import Globe from '../../../../public/assets/icons/paperwork.svg'
import Webiste from '../../../../public/assets/icons/website.svg'
import CorrelationCard from '../../organisms/CorrelationCards'
import CryptoOverview from '../../organisms/CryptoOverview'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import { fetchCoinData, fetchTransactionsData } from '../../../services/api/api'
import { Transaction } from '../../organisms/RecentTransactionCards'

const OverViewInfoBox = styled(Box)`
  width: 100;
  display: flex;
  justify-content: space-between;
  padding: 10px 5px;
  margin-top: 20px;
`
const StyledBox = styled(Box)`
  background-color: ${theme.palette.gray[50]};
  min-height: 60px;
  padding: 16px 24px 16px 24px;
  display: flex;
  gap: 10px;
  margin: 10px 0 0 0;
`

const StyledStackLast = styled(Stack)`
  display: flex;
  justify-content: flex-end;
  padding: 16px 0 0 0;
`

const StyledTab = styled(Tab)`
  text-transform: 'none';
  color: 'inherit';
`

const InfoBox = styled(Box)`
  width: 60%;
`

const BoxTypo = styled(Box)`
  margin: 5px 0px;
  display: flex;
  align-items: center;
`

const StyledTabPanel = styled(TabPanel)`
  && {
    padding: 0;
  }
`

const DetailsBox = styled(Box)`
  gap: 16px;
  padding: 24px;
  margin-top: 16px;
  border: 1px solid ${theme.palette.gray[100]};
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
`

export const WalletScreen = () => {
  const [transactions, setTransactions] = useState<any[]>([])
  const [coinData, setCoinData] = useState<any[]>([])
  const { tab } = useParams<{ tab: string }>()
  const [selectedCoin, setSelectedCoin] = useState<string>()
  const [value, setValue] = useState<string>(WalletDetails.state)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    setValue(tab ?? '')
  }, [])

  useEffect(() => {
    setSelectedCoin(location.state?.coinName)
  }, [])

  useEffect(() => {
    const fetchCryptoData = async () => {
        const response = await fetchCoinData();
        if (Array.isArray(response)) {
          setCoinData(response);
       
      } 
    };
    fetchCryptoData();
  }, []);
  

  useEffect(() => {
    const fetchData = async () => {
      const transactionsData = await fetchTransactionsData()
      if (Array.isArray(transactionsData)) {
        setTransactions(transactionsData)
      }
    }
    fetchData()
  }, [])
  

  const totalBoughtForCoin = transactions.filter((transaction) => transaction.walletId === 1)
    .reduce((total, transaction) => {
      if (transaction.transactionType === 'Purchased') {
        return total + transaction.cryptoPrice
      } else {
        return total - transaction.cryptoPrice
      }
    }, 0)

  const coin = coinData.find((coin) => coin.cryptoName === selectedCoin)
  const coinPrice = coin?.currentPrice ?? 0
  const totalValueForCoin = totalBoughtForCoin * coinPrice

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue)
  }

  const navigateToPurchaseScreen = () => {
    navigate('/purchase', {
      state: {
        selectedCoin,
      },
    })
  }

  const navigateToSellScreen = () => {
    navigate('/sell', {
      state: {
        selectedCoin,
        totalBoughtForCoin,
      },
    })
  }

  const selectedCoinData = coinData.find(
    (coin) => selectedCoin === coin.cryptoName
  )
  return (
    <Dashboard
      sidebar={<Sidebar />}
      navbar={
        <Header
          headerName={WalletDetails.HeaderName}
          onBuyClick={() => navigateToPurchaseScreen()}
          onSellClick={() => navigateToSellScreen()}
        />
      }
      content={
        <Box padding={'24px'}>
          <Stack gap={2} direction={'column'}>
            {selectedCoin && (
              <WatchlistBar
                isChecked={true}
                coinRate={selectedCoinData?.unitChange}
                coin={
                  selectedCoin === WalletDetails.selectedCoin
                    ? Bitcoin
                    : Ethereum
                }
                coinName={selectedCoin}
                coinType={selectedCoinData?.cryptoLabel}
                marketCap={`$${selectedCoinData?.marketCapital.toFixed(2)}T`}
                vol24H={`$${selectedCoinData?.volume.toFixed(2)}T`}
                supply={`${selectedCoinData?.circulatingSupply.toFixed(2)} ${
                  selectedCoinData?.cryptoLabel
                }`}
              />
            )}

            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <TabList data-testid="tablist" onChange={handleChange}>
                  {WalletDetails.tabs.map((tab) => (
                    <StyledTab
                      key={tab.value}
                      label={
                        <Typography
                          variant="subtitle2"
                          color={
                            value === tab.value
                              ? theme.palette.primary[500]
                              : theme.palette.text.medemp
                          }
                        >
                          {tab.label}
                        </Typography>
                      }
                      value={tab.value}
                      sx={{ textTransform: 'none', color: 'inherit' }}
                    />
                  ))}
                </TabList>
              </Box>
              <StyledTabPanel value={WalletDetails.OverviewTab}>
                <CryptoOverview
                  coinValue={selectedCoinData?.currentPrice}
                  coinChangePercentage={selectedCoinData?.unitChange}
                />
                <OverViewInfoBox>
                  <InfoBox>
                    <Stack>
                      <Stack>
                        <Typography
                          variant="b1"
                          color={theme.palette.text.highemp}
                          children={
                            selectedCoin?.toLowerCase() === 'bitcoin'
                              ? 'Bitcoin'
                              : 'Ethereum'
                          }
                        />
                        <Typography align="justify" variant="b2" mt={2}>
                          {WalletDetails.bitcoinInfo}
                        </Typography>
                      </Stack>
                      <Stack>
                        <Typography
                          variant="b1"
                          color={theme.palette.text.highemp}
                          mt={2}
                        >
                          {WalletDetails.resources}
                        </Typography>
                        <BoxTypo>
                          <Icon src={Webiste} />
                          <Link href="#" variant="body2">
                            {WalletDetails.officialWebsite}
                          </Link>
                        </BoxTypo>
                        <BoxTypo>
                          <Icon src={Globe} />
                          <Link href="#" variant="body2">
                            {WalletDetails.whitePaper}
                          </Link>
                        </BoxTypo>
                      </Stack>
                    </Stack>
                  </InfoBox>
                  <CorrelationCard />
                </OverViewInfoBox>
              </StyledTabPanel>
              <StyledTabPanel value={WalletDetails.WalletTab}>
                <StyledBox>
                  <Typography
                    children={WalletDetails.TotalBalance}
                    variant="subtitle1"
                    color={theme.palette.text.highemp}
                  />
                  <Typography
                    children={`${totalBoughtForCoin.toFixed(2)} ${
                      selectedCoinData?.cryptoLabel
                    }`}
                    variant="subtitle1"
                    color={theme.palette.text.highemp}
                  />
                  <Typography
                    children={`(${totalValueForCoin.toLocaleString('en-US', {
                      style: 'currency',
                      currency: 'USD',
                    })})`}
                    variant="subtitle1"
                    color={theme.palette.text.highemp}
                  />
                </StyledBox>

                <StyledStackLast direction={'row'} spacing={4}>
                  <SearchFilter
                    filterEnabled={true}
                  />
                  <Dropdown text={WalletDetails.dropdownText} variant={'b1'} />
                </StyledStackLast>
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
                          currencyName={selectedCoinData?.cryptoName}
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
                        <Divider sx={{ width: '98.5%' }} />
                      </React.Fragment>
                    )).reverse()}
                  </StyledStack>
                </DetailsBox>
              </StyledTabPanel>
            </TabContext>
          </Stack>
        </Box>
      }
    />
  )
}

export default WalletScreen
