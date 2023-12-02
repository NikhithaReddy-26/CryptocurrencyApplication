import { Stack, styled } from '@mui/system'
import { PortfolioCard } from '../../molecules/Portfoliocard'
import { Box, Typography } from '@mui/material'
import { portFolioDataText, portfolioData } from '../../../utils/constants'
import theme from '../../../utils/themes'

const WrapperBox = styled(Box)`
  max-width: 398px;
  max-height: 312px;
  height: 100%;
  border-radius: 4px;
  padding: 16px 16px 16px 2px;
  box-sizing: border-box;
  border: 1px solid ${theme.palette.gray[100]};
  background-color: ${theme.palette.gray.white};
`

const OuterStack = styled(Stack)`
  max-width: 398px;
  max-height: 244px;
  gap: 10px;
  padding: 0px 0px 0px 4px;
  box-sizing: border-box;
  overflow-y: scroll;
  overflow-x: hidden;

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

const TypoBox = styled(Typography)({
  maxWidth: '398px',
  heigth: '25px',
  padding: '5px 0px 11px 16px',
  position: 'sticky',
})
const CorrelationCard = () => {
  return (
    <WrapperBox>
      <TypoBox>
        <Typography variant={'subtitle1'} padding={'0px, 24px, 0px, 24px'}>
         {portFolioDataText}
        </Typography>
      </TypoBox>
      <OuterStack>
        {portfolioData.map((data) => (
          <PortfolioCard
            key={data.text1}
            src={data.src}
            coinName={data.text1}
            coinLable={data.text2}
            coinPrice={data.value1}
            coinChange={data.value2}
            width={data.width}
          />
        ))}
      </OuterStack>
    </WrapperBox>
  )
}

export default CorrelationCard
