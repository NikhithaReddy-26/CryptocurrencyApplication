import { StoryFn, Meta } from '@storybook/react'
import { CustomSlider } from '.'
import { ThemeProvider } from '@mui/material/styles'
import { SliderProps } from '@mui/material'
import theme from '../../../utils/themes'

export default {
  title: 'Atoms/Slider',
  component: CustomSlider,
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Story />
      </ThemeProvider>
    ),
  ],
} as Meta

const Template: StoryFn<SliderProps> = (args) => <CustomSlider {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 0,
  min: 0,
  max: 100,
}
