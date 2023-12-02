import { Box, Stack, Typography, styled } from '@mui/material'
import React from 'react'
import Icon from '../../atoms/Icons'
import UpArrow from '../../../../public/assets/icons/UpArrowGreen.svg'
import DownArrow from '../../../../public/assets/icons/DownArrowRed.svg'
import TimePeriodTabs from '../../molecules/TimePeriodTabs'
import {
  Dashboardproperties,
  cryptoOverviewProperties,
} from '../../../utils/constants'
import theme from '../../../utils/themes'
import Graph from '../../atoms/Graph'

interface CryptoOverviewProps {
  coinValue: number
  coinChangePercentage: string
}

const WrapperBox = styled(Box)({
  maxWidth: '100%',
  maxHeight: '368px',
})

const OuterStack = styled(Stack)({
  maxWidth: '100%',
})

const HeaderBox = styled(Box)({
  maxWidth: '100%',
  display: 'flex',
  justifyContent: 'space-between',
})

const GraphBox = styled(Box)({
  width: '100%',
  height: '246px',
})

const TierStack = styled(Stack)({
  gap: '2px',
})

const MainBox = styled(Box)({
  maxWidth: '100%',
  maxHeight: '416px',
  border: `1px solid ${theme.palette.gray[100]}`,
  padding: '32px 24px',
  backgroundColor: `${theme.palette.gray.white}`,
})

const ChangeBox = styled(Box)({
  width: '40%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around',
})

const CryptoOverview = ({
  coinValue,
  coinChangePercentage,
}: CryptoOverviewProps) => {
  return (
    <MainBox>
      <WrapperBox>
        <OuterStack>
          <HeaderBox>
            <TierStack>
              <Box>
                <Typography variant="c1" color={theme.palette.text.medemp}>
                  {cryptoOverviewProperties.currentValue}
                </Typography>
              </Box>
              <Box>
                <Typography variant="h6">
                  {coinValue}
                </Typography>
              </Box>
              <ChangeBox>
                <Icon
                  src={
                    coinChangePercentage?.includes('-') ? DownArrow : UpArrow
                  }
                />
                <Typography
                  variant="c2"
                  color={
                    coinChangePercentage?.includes('-')
                      ? `${theme.palette.semantic.error[500]}`
                      : `${theme.palette.semantic.success[500]}`
                  }
                >
                  {coinChangePercentage}
                </Typography>
              </ChangeBox>
            </TierStack>
            <Box>
              <TimePeriodTabs tabs={Dashboardproperties.tabs} />
            </Box>
          </HeaderBox>
          <GraphBox>
            <Graph
              data={cryptoOverviewProperties.bitcoinGraphData}
              showYGridLines={false}
              showXAxis={true}
              showLegends={false}
              margins={{
                top: 50,
                right: 10,
                bottom: 30,
                left: 30,
              }}
            />
          </GraphBox>
        </OuterStack>
      </WrapperBox>
    </MainBox>
  )
}

export default CryptoOverview
