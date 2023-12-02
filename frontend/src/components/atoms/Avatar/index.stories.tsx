import { StoryFn, Meta } from '@storybook/react'
import { ThemeProvider } from '@mui/material/styles'
import { createTheme } from '@mui/material'

import MyAvatar from '.'

export default {
  title: 'Atoms/Avatar',
  component: MyAvatar,
} as Meta<typeof MyAvatar>

const theme = createTheme()

const Template: StoryFn<typeof MyAvatar> = (args) => (
  <ThemeProvider theme={theme}>
    <MyAvatar {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {
  alt: 'Avatar not found',
}
