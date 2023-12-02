import React from 'react'
import { Slider, SliderProps, ThemeProvider } from '@mui/material'
import theme from '../../../utils/themes'
import { styled } from '@mui/material/styles'

type Props = SliderProps

const SliderCustomized = styled(Slider)(({ orientation }: Props) => ({
  color: theme.palette.text.lowemp,
  height: orientation === 'vertical' ? 300 : undefined,
}))

export const CustomSlider = ({ orientation, ...props }: Props) => {
  return (
    <ThemeProvider theme={theme}>
      <SliderCustomized orientation={orientation} {...props} />
    </ThemeProvider>
  )
  
}
