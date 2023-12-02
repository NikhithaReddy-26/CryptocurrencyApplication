import React, { useState, useEffect, useRef, useMemo } from 'react'
import { Box, TextField, InputAdornment, Typography } from '@mui/material'
import { CustomSlider } from '../../atoms/Slider'
import CustomButton from '../../atoms/Button'
import theme from '../../../utils/themes'
import styled from '@emotion/styled'

export interface AmountDetailsProps {
  currency: string
  price: number
  value: number
  conversionValue: string
  onChange?: (value: number) => void
  buttonText?: string
  onButtonClick?: () => void
  showCurrencySign?: boolean
  coinLabel?: string
  isBuy?: boolean
}

const AmountDetailsCard = styled(Box)`
  width: 63vw;
  padding: 1.8%;
  border-radius: 1%;
  border: 1px solid ${theme.palette.gray[100]};
  background-color: #ffff;
`

const AmountDetailsContainer = styled(Box)`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 40%;
  margin-bottom: -2.5%;
  border: ${theme.palette.gray[100]};
`

const StyledTextField = styled(TextField)`
  width: 58vw;
  margin-top: 1.4%;
  padding-bottom: 6%;
  border-radius: 2%;
  border: ${theme.palette.gray[100]};
`
const TypographyContainer = styled(Box)`
  margin-bottom: 10px;
`

const SliderContainer = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: center;
`

const StyledSlider = styled(CustomSlider)`
  height: 17.8vh;
  margin-left: 5.5%;
  margin-right: 5.5%;
`

const StyledValueTypography = styled(Typography)`
  color: ${theme.palette.text.highemp};
`

const formatCurrency = (value: number | bigint) =>
  new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)

const AmountDetails: React.FC<AmountDetailsProps> = ({
  currency,
  price,
  value,
  conversionValue,
  onChange,
  buttonText,
  onButtonClick,
  showCurrencySign = true,
  coinLabel,
  isBuy = true,
}) => {
  const [aboveBox, setAboveBox] = useState<number>(value)
  const [belowBox, setBelowBox] = useState<number>(Number(conversionValue))
  const sliderRef = useRef<any>(null)

  useEffect(() => {
    setAboveBox(value)
    setBelowBox(Number(conversionValue))
  }, [value, conversionValue, price])

  const updateBoxValue = (newValue: number) => {
    const updatedAboveBox = Math.round(newValue * price * 100) / 100
    const updatedBelowBox = Math.round(newValue * price * 100) / 100
    if (showCurrencySign) {
      setAboveBox(updatedAboveBox)
    } else {
      setBelowBox(updatedBelowBox)
    }
    if (onChange) {
      onChange(showCurrencySign ? updatedAboveBox : updatedBelowBox)
    }
  }

  const handleSliderChange = (event: Event, newValue: number | number[]) => {
    const newBoxValue = Array.isArray(newValue) ? newValue[0] : newValue
    updateBoxValue(newBoxValue)
  }

  const handleButtonClick = () => {
    const sliderValue = 1
    updateBoxValue(sliderValue)
    if (onButtonClick) {
      onButtonClick()
    }
  }

  const formattedBoxValue = useMemo(() => {
    return showCurrencySign ? formatCurrency(aboveBox) : aboveBox.toString()
  }, [aboveBox, currency, showCurrencySign])

  const formattedSliderValue = useMemo(() => {
    const label = showCurrencySign ? currency : coinLabel
    return `1 ${label} = ${formatCurrency(price)}`
  }, [price, currency, coinLabel, showCurrencySign])

  const sliderValue = isBuy ? aboveBox / price : belowBox / price
  return (
    <AmountDetailsCard>
      <TypographyContainer>
        <Typography variant="b1" color={theme.palette.text.highemp}>
          Amount details
        </Typography>
      </TypographyContainer>
      <AmountDetailsContainer>
        <StyledTextField
          InputProps={{
            startAdornment: (
              <StyledValueTypography variant="subtitle1">
                {formattedBoxValue}
              </StyledValueTypography>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <CustomButton onClick={handleButtonClick} variant="outlined">
                  {buttonText}
                </CustomButton>
              </InputAdornment>
            ),
          }}
        />
      </AmountDetailsContainer>
      <SliderContainer>
        <StyledSlider
          ref={sliderRef}
          orientation="vertical"
          size="small"
          value={sliderValue}
          onChange={handleSliderChange}
          min={0}
          max={1}
          step={0.01}
          aria-label={`${currency} Slider`}
        />
        <Typography
          variant="c1"
          color={theme.palette.text.medemp}
          style={{ marginLeft: '-5%' }}
        >
          {formattedSliderValue}
        </Typography>
      </SliderContainer>
      <AmountDetailsContainer>
        <StyledTextField
          InputProps={{
            startAdornment: (
              <StyledValueTypography variant="subtitle1">
                {conversionValue}
              </StyledValueTypography>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <Typography
                  variant="subtitle1"
                  color={theme.palette.text.medemp}
                >
                  {currency}
                </Typography>
              </InputAdornment>
            ),
          }}
        />
      </AmountDetailsContainer>
    </AmountDetailsCard>
  )
}

export default AmountDetails
