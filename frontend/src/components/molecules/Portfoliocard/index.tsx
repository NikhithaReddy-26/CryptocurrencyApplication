import { Box, Stack, Typography } from '@mui/material'
import Images from '../../atoms/Image'
import { styled } from '@mui/system'
import theme from '../../../utils/themes/index'

export interface PortfolioProps {
  src: string | undefined
  coinName: string
  coinLable: string
  coinPrice: string
  coinChange?: string
  height?: string
  width?: string
  variant?: 'b1' | 'b2' | 'c1' | 'c2'
  onClick?: () => void
}

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  padding: '1% 2% 1% 2.5%',
  flexGrow: 1,
  borderRadius: '0.25rem',
  justifyContent: 'space-between',
  backgroundColor: `${theme.palette.gray.white}`,
})

const StyledTypographyStack = styled(Stack)({
  margin: '0.25rem 0 0 0.625rem',
  gap: '0.25rem',
})
const StyledValueStack = styled(Stack)({
  margin: '0.25rem 0 0 0',
  gap: '0.25rem',
  alignItems: 'flex-end',
})

export const PortfolioCard = (props: PortfolioProps) => {
  const { coinName, coinLable, height, width, coinPrice, coinChange, onClick } = props

  const isPositive = coinChange?.includes('+')
  const isNegative = coinChange?.includes('-')
  const value2Color = isNegative
    ? theme.palette.semantic.error[500]
    : isPositive
    ? theme.palette.semantic.success[500]
    : theme.palette.text.medemp

  return (
    <StyledBox data-testid="portfolio-card" height={height} width={width} onClick={onClick}>
      <Stack direction="row">
        <Images src={props.src} alt={props.coinName} />
        <StyledTypographyStack direction="column">
          <Typography variant={'b1'} color={theme.palette.text.highemp}>
            {coinName}
          </Typography>
          <Typography variant={'c2'} color={theme.palette.text.medemp}>
            {coinLable}
          </Typography>
        </StyledTypographyStack>
      </Stack>
      <StyledValueStack direction="column">
        {coinChange ? (
          <>
            <Typography variant={'b1'} color={theme.palette.text.highemp}>
              {coinPrice}
            </Typography>
            <Typography variant={'c2'} color={value2Color}>
              {coinChange}
            </Typography>
          </>
        ) : (
          <Typography
            variant={'b1'}
            color={theme.palette.text.highemp}
            textAlign="center"
          >
            {coinPrice}
          </Typography>
        )}
      </StyledValueStack>
    </StyledBox>
  )
}
