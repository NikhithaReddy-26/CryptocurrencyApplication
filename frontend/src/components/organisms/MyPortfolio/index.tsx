import { Box, Stack, Typography, styled } from '@mui/material'
import TimePeriodTabs from '../../molecules/TimePeriodTabs'
import theme from '../../../utils/themes'
import Graph from '../../atoms/Graph'
import Icon from '../../atoms/Icons'
import UpArrow from '../../../../public/assets/icons/UpArrowGreen.svg'
import DownArrow from '../../../../public/assets/icons/DownArrowRed.svg'
import { Dashboardproperties, graphData } from '../../../utils/constants'
import LandingImage from '../../../../public/assets/images/undraw_Data_report_re_p4so 1.png'

interface MyPortFolioProps {
  graphValue: string
  coin: string
  coinChangePercentage: string | undefined
  totalInvestmentChangePercentage: string
  totalInvestmentValue: string
  coinValue: string | undefined
  page: 'landing' | 'graph'
}

const BoxWrapper = styled(Box)({
  width: 'auto',
  height: '423.67px',
  border: '1px solid' + `${theme.palette.grey[100]}`,
  boxSizing: 'border-box',
  padding: '24px',
  backgroundColor: `${theme.palette.gray.white}`,
})

const HeaderBox = styled(Box)({
  display: 'flex',
  width: '100%',
  maxHeight: '94px',
})

const LeftBox = styled(Box)({
  width: '50%',
  display: 'flex',
})

const RightBox = styled(Box)({
  width: '50%',
  height: '100%',
  display: 'flex',
  justifyContent: 'flex-end',
})

const LeftHalfStack = styled(Stack)({
  width: '50%',
  height: '100%',
})
const LeftFullStack = styled(Stack)({
  width: '50%',
  height: '100%',
})
const ChangeBox = styled(Box)({
  width: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
})

const MyPortFolio = ({
  graphValue,
  coin,
  totalInvestmentChangePercentage,
  coinChangePercentage,
  totalInvestmentValue,
  coinValue,
  page,
}: MyPortFolioProps) => {
  const findColor = (val: string) => {
    const redColor = `${theme.palette.semantic.error[500]}`
    const greenColor = `${theme.palette.semantic.success[500]}`
    const colorIs = val.includes('-') ? redColor : greenColor
    return colorIs
  }

  const findIconArrow = (val: string) => {
    const upArrow: any = UpArrow
    const downArrow: any = DownArrow
    const arrow: any = val.includes('-') ? downArrow : upArrow
    return arrow
  }

  const FooterBox = styled(Box)({
    margin: '25px',
    height: '100%',
    width: '100%',
    maxWidth: '1200px',
    maxHeight: '290px',
  })

  const boxStyles = {
    width: 'fit-content',
    display: 'flex',
    borderRadius: '2%',
  }

  const cryptoData = {
    id: 'Total Investment',
    color: `${theme.palette.primary[500]}`,
    data: [
      { x: '2023-06-26', y: 120 },
      { x: '2023-06-27', y: 200 },
      { x: '2023-06-28', y: 225 },
      { x: '2023-06-29', y: 240 },
      { x: '2023-06-30', y: 235 },
      { x: '2023-07-01', y: 200 },
      { x: '2023-07-02', y: 245 },
      { x: '2023-07-03', y: 260 },
    ],
  }

  const margins = { top: 30, right: 25, bottom: 30, left: 25 }

  const legendProps = {
    translateX: 0,
    translateY: -25,
    itemHeight: 14,
    itemWidth: 100,
    itemSpacing: 2,
    symbolSize: 8,
    itemTextColor: '#000',
  }

  const graphDataExists =
    graphValue && graphData[graphValue] && graphData[graphValue][0]

  return (
    <BoxWrapper data-testid="myportfolio">
      <HeaderBox>
        <LeftBox>
          <LeftHalfStack>
            <Box display={'flex'} justifyContent={'space-around'}>
              <Typography
                variant="c1"
                color={theme.palette.text.medemp}
                sx={{ paddingTop: '5px' }}
              >
                {Dashboardproperties.totalInvestment}
              </Typography>
              <ChangeBox>
                <Icon
                  src={findIconArrow(totalInvestmentChangePercentage)}
                  style={{ marginRight: '8px' }}
                />
                <Typography
                  variant="overline"
                  color={findColor(totalInvestmentChangePercentage)}
                >
                  {totalInvestmentChangePercentage}
                </Typography>
              </ChangeBox>
            </Box>
            <Box sx={{ marginLeft: '30px', marginTop: '5px' }}>
              <Typography variant="h6" color={theme.palette.text.highemp}>
                {totalInvestmentValue}
              </Typography>
            </Box>
          </LeftHalfStack>
          <LeftFullStack>
            <Box display={'flex'} justifyContent={'space-around'}>
              <Typography
                variant="c1"
                color={theme.palette.text.medemp}
                sx={{ paddingTop: '5px' }}
              >
                {coin}
              </Typography>
              <ChangeBox>
                <Icon
                  src={
                    coinChangePercentage && findIconArrow(coinChangePercentage)
                  }
                  style={{ marginRight: '8px' }}
                />
                <Typography
                  variant="overline"
                  color={
                    coinChangePercentage && findColor(coinChangePercentage)
                  }
                >
                  {coinChangePercentage}
                </Typography>
              </ChangeBox>
            </Box>
            <Box sx={{ marginLeft: '44px', marginTop: '5px' }}>
              <Typography variant="h6" color={theme.palette.text.highemp}>
                {coinValue}
              </Typography>
            </Box>
          </LeftFullStack>
        </LeftBox>
        <RightBox>
          {' '}
          {
            <TimePeriodTabs
              tabs={Dashboardproperties.tabs}
              boxStyles={boxStyles}
              value={0}
            />
          }{' '}
        </RightBox>
      </HeaderBox>
      <FooterBox>
        {page === 'graph' && graphDataExists ? (
          <Graph
            margins={margins}
            data={[cryptoData, graphData[graphValue][0]]}
            showXAxis={true}
            showYGridLines={true}
            gridYValues={[2000, 2500, 3000, 3500, 4000]}
            showLegends={true}
            legendProps={legendProps}
          />
        ) : (
          <Icon
            src={LandingImage}
            style={{ margin: '60px 0px 0px 25%', display: 'inherit' }}
          />
        )}
      </FooterBox>
    </BoxWrapper>
  )
}

export default MyPortFolio
