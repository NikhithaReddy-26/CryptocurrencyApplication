import { Box, Stack, Typography,styled } from '@mui/material'
import Icon from '../../atoms/Icons'
import priceRiseUp from '../../../../public/assets/icons/Vector.svg'
import theme from '../../../utils/themes'
import Button from '../../atoms/Button'
import CheckedStar from '../../../../public/assets/icons/Property 1=icons, Property 2=star-fill.svg'
import unCheckedStar from '../../../../public/assets/icons/Property 1=icons, Property 2=star-line.svg'
import { ButtonNames,WatchListBarLabels } from '../../../utils/constants'

export interface WatchlistBarProps {
  coin: string
  coinName: string
  coinType: string
  coinRate?: string
  marketCap?: string
  vol24H?: string
  supply?: string
  isChecked?: boolean
  onClick?: () => void
}

const StyledBox = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  gap: '0.625rem',
})

const StackContainer = styled(Stack)({
  display: 'flex',
  alignItems: 'center',
  gap: '0.625rem',
})

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
  justifyContent: 'space-between',
  width: 'auto',
  padding: '1.5rem',
  borderRadius: '0.25rem',
  border: `0.0625rem solid ${theme.palette.gray[100]}`,
  backgroundColor:`${theme.palette.gray.white}`,
})

const USDButton = styled(Button)({
  width: '9.375rem',
  height: '2.625rem'
})
const WatchListButton = styled(Button)({
  width: '14.375rem',
  height: '3.125rem',
})

const WatchlistBar = ({
  coin,
  coinName,
  coinType,
  coinRate,
  marketCap,
  vol24H,
  supply,
  isChecked,
  onClick,
}: WatchlistBarProps) => {
  const data = [
    { label: WatchListBarLabels.MarketCap , value: marketCap },
    { label: WatchListBarLabels.Vol24H , value: vol24H },
    { label: WatchListBarLabels.CirculatingSupply , value: supply },
  ]

  return (
    <Container>
      <StyledBox>
        <Icon src={coin} alt="CurrencyIcon" height="56px" width="56px" />

        <Stack>
          <Typography variant="h6" color={`${theme.palette.gray[500]}`} >
            {coinName}
          </Typography>
          <Stack spacing={1} direction="row">
            <Typography
              variant="b1"
              color={`${theme.palette.text.medemp}`} 
            >
              {coinType}
            </Typography>
            <Stack spacing={1} direction="row" alignItems = 'center'>
              {coinName !== 'USD Coin' && <Icon src={priceRiseUp} />}
              <Typography
                variant="overline"
                color = {`${theme.palette.semantic.success[500]}`} 
              >
                {coinRate}
              </Typography>
            </Stack>
          </Stack>
        </Stack>

        {coinName !== 'USD Coin' && (
          <Stack
            direction="row"
            borderLeft={`0.5px solid ${theme.palette.gray[300]}`}
            height= '2.8125rem'
            marginLeft={'10px'}
          >
            {data.map((item) => (
              <StackContainer key={item.label} padding = '0.3125rem' paddingLeft={'25px'} >
                <Typography
                  variant="c1"
                  color = {`${theme.palette.text.medemp}`}
                  marginLeft = '5px' 
                >
                  {item.label}
                </Typography>
                <Typography
                  variant="b1"
                  color = {`${theme.palette.text.highemp}`}
                  alignSelf = "flex-start"
                  marginLeft = "5px" 
                >
                  {item.value}
                </Typography>
              </StackContainer>
            ))}
          </Stack>
        )}
      </StyledBox>

      {coinName !== 'USD Coin' ? (
        <WatchListButton
        startIcon={
          isChecked ? (
            <Icon src={CheckedStar} />
          ) : (
            <Icon src={unCheckedStar} />
          )
        }
        children={
          isChecked
            ? ButtonNames.ADDED_TO_WATCHLIST
            : ButtonNames.ADD_TO_WATCHLIST
        }
        variant="outlined"
        typoVariant="button"
        onClick={onClick}
      />
      ) : (
        <Stack direction="row" spacing={2}>
          <USDButton
            children={ButtonNames.CASH_DEPOSIT}
            variant="outlined"
            typoVariant="button"
          />
          <USDButton
            children={ButtonNames.WITHDRAW}
            variant="outlined"
            typoVariant="button"
          />
        </Stack>
      )}
    </Container>
  )
}

export default WatchlistBar
