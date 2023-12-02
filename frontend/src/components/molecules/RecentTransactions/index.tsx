import theme from '../../../utils/themes'
import Icon from '../../atoms/Icons'
import { Box, Stack, Typography } from '@mui/material'
import styled from '@emotion/styled'
import CustomChip from '../../atoms/Chip'

export interface TransactionsProps {
  month: string
  date: number
  icon: string
  coinName: string
  coinPrice: number
  dollarPrice: number
  purchased: boolean | string
}

const TransactionContainer = styled(Box)`
  display: flex;
  justify-content: space-between;
  height: 70px;
  padding: 0.75rem 1.5rem 0rem 0rem;
  gap: 8px;
`

const Container = styled(Box)`
  display: flex;
  gap: 1rem;
`
const StyledStack = styled(Stack)`
  display: flex;
`
const WrapperStack = styled(Stack)`
  background-color: ${theme.palette.gray.white};
`

const PriceTypography = styled(Typography)`
  margin-top: 4px;
  text-align: end;
`
const TransactionPriceTypography = styled(Typography)`
  margin-top: 2px;
  text-align: end;
`
const Transactions = ({
  month,
  date,
  icon,
  coinName,
  coinPrice,
  dollarPrice,
  purchased,
}: TransactionsProps) => {
  return (
    <WrapperStack data-testid = 'transaction'>
      <Typography
        variant="c2"
        color={theme.palette.text.highemp}
        children={`${month} ${date}`}
      />
      <TransactionContainer>
        <Container>
          <Icon src={icon} alt="TransactionIcon" width="44px" height="44px" />
          <StyledStack>
            <Typography
              variant="b1"
              color={theme.palette.text.highemp}
              children={`${coinName}`}
            />
            <CustomChip
              label={
                <Typography
                  variant="c2"
                  color={theme.palette.gray[500]}
                  children={purchased}
                />
              }
              variant="filled"
              style={{
                backgroundColor: `${theme.palette.grey[100]}`,
                height: '16px',
              }}
            />
          </StyledStack>
        </Container>

        <Container>
          <Stack>
            <TransactionPriceTypography
              variant="b1"
              color={theme.palette.text.highemp}
              children={purchased ? `+${coinPrice}` : `-${coinPrice}`}
            />
            <PriceTypography
              variant="c2"
              color={theme.palette.text.medemp}
              children={`+$${dollarPrice}`}
            />
          </Stack>
        </Container>
      </TransactionContainer>
    </WrapperStack>
  )
}

export default Transactions
