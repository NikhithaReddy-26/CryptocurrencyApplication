import React, { useEffect, useState } from 'react'
import { Dashboard } from '../../templates/Dashboard'
import Sidebar from '../../organisms/SideBar'
import Header from '../../organisms/Header'
import { Box, Stack, Typography, styled } from '@mui/material'
import WatchListGraph from '../../organisms/WatchListGraph'
import MyPortFolio from '../../organisms/MyPortfolio'
import MyPortFolioCardsList, {
  coinData,
} from '../../organisms/MyPortFolioCardsList'
import Chart from '../../../../public/assets/icons/chart.svg'
import Graph from '../../../../public/assets/icons/BlueGraph.svg'
import Info from '../../../../public/assets/icons/info.svg'
import Balance from '../../molecules/Balance'
import theme from '../../../utils/themes'
import Icon from '../../atoms/Icons'
import { CurrencyList } from '../../organisms/CryptocurrencyList'
import { DashBoardConstants, chipsData } from '../../../utils/constants'
import RecentTransactions from '../../organisms/RecentTransactionCards'
import {
  API_BASE_URL,
  fetchCoinData,
  getUserData,
} from '../../../services/api/api'
import { useAuth0 } from '@auth0/auth0-react'
import axios from 'axios'

const WrapperBox = styled(Box)({
  width: '99%',
  padding: '0 24px 24px 24px',
})

const WalletTypography = styled(Box)({
  marginTop: '10px',
  paddingLeft: '16px',
})

const RightBox = styled(Box)({
  backgroundColor: `${theme.palette.gray.white}`,
  maxHeight: '100%',
  width: '30%',
  paddingLeft: '1%',
})
const DashboardPage = () => {
  const [graphChip, setGraphChip] = useState<string | null>('BTC')
  const [userData, setUserData] = useState<any>(null)
  const [coinData, setCoinData] = useState<coinData[] | null>(null)
  const [coinName, setCoinName] = useState<string>('Bitcoin')
  const [token,setToken] = useState<number>(1)

  const onSelectedChip = (chipped: string) => {
    setCoinName(chipped[0].toUpperCase() + chipped.slice(1))
    const symbol = chipsData.find((item) => item.value === chipped)
    chipped && setGraphChip(symbol?.symbol ?? null)
  }

  const { isAuthenticated, user } = useAuth0()
  const authLogin = async () => {
    await axios
      .post(`${API_BASE_URL}/users/auth0`, {
        name: user?.name,
        email: user?.email,
        accountBalance: 10000
      })
      .then((response) => {
        localStorage.setItem('token',response.data.token.token)
        localStorage.setItem('userId', response.data.user.user_id)
        setToken(token+1)
      })
      .catch((error) => {
        console.log(error)
      })
  }

  useEffect(() => {
    if (isAuthenticated) {
      authLogin()
    }
  }, [isAuthenticated])

  useEffect(() => {
    const fetchUserData = async () => {
      const fetchedUserData = await getUserData()
      setUserData(fetchedUserData)
    }
    fetchUserData()
  }, [token])

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetchCoinData()
      setCoinData(response)
    }
    fetchData()
  }, [token])


  const SingleCoin = coinData?.find((coin: any) => coin.cryptoName === coinName)

  return (
    <Dashboard
      sidebar={<Sidebar />}
      navbar={<Header headerName={'Dashboard'} />}
      content={
        <WrapperBox>
          <Stack direction={'row'} spacing={2}>
            <Stack width={'70%'} padding={'24px'}>
              <WatchListGraph />
              <Stack
                direction="row"
                justifyContent="space-between"
                marginBottom={'24px'}
                marginTop={'24px'}
              >
                <Typography
                  variant="subtitle1"
                  color={`${theme.palette.text.highemp}`}
                >
                  {DashBoardConstants.PortFolioValues}
                </Typography>
                <Stack direction="row" spacing={1}>
                  <Icon src={Chart} />
                  <Icon src={Graph} />
                </Stack>
              </Stack>
              <MyPortFolio
                coin={coinName}
                coinChangePercentage={SingleCoin?.unitChange}
                totalInvestmentChangePercentage={
                  DashBoardConstants.TotalInvestmentChange
                }
                totalInvestmentValue={DashBoardConstants.TotalInvestmentValue}
                coinValue={SingleCoin?.currentPrice.toLocaleString('en-US', {
                  style: 'currency',
                  currency: 'USD',
                })}
                page={'graph'}
                graphValue={graphChip ?? 'BTC'}
              />
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                marginTop="18px"
              >
                <Typography
                  variant="b1"
                  color={`${theme.palette.text.highemp}`}
                >
                  {DashBoardConstants.FooterRight}
                </Typography>
                <Stack direction="row" spacing={1} alignItems="center">
                  <Icon src={Info} />
                  <Typography
                    variant="c2"
                    color={`${theme.palette.text.highemp}`}
                  >
                    {DashBoardConstants.FooterLeft}
                  </Typography>
                </Stack>
              </Stack>
              <Stack paddingTop="32px" alignItems={'center'}>
                <CurrencyList onSelectChip={onSelectedChip} />
              </Stack>
            </Stack>
            <RightBox>
              <MyPortFolioCardsList />
              <WalletTypography>
                <Typography
                  color={`${theme.palette.text.highemp}`}
                  variant="subtitle1"
                >
                  {DashBoardConstants.MyWallets}
                </Typography>
              </WalletTypography>
              <Balance
                heading1={DashBoardConstants.BalanceHeading}
                description={DashBoardConstants.BalanceDescripton}
                balanceAmount={userData?.account_balance.toLocaleString(
                  'en-US',
                  {
                    style: 'currency',
                    currency: 'USD',
                  }
                )}
              />
              <RecentTransactions />
            </RightBox>
          </Stack>
        </WrapperBox>
      }
    />
  )
}

export default DashboardPage
