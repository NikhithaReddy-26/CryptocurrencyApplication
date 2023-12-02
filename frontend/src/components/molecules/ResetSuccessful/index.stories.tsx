import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { ResetSuccessful } from './index'
import { Box } from '@mui/material'

export default {
  title: 'Molecules/ResetSuccessful',
  component: ResetSuccessful,
} as Meta

const Template: StoryFn = () => (
  <Box width={'512px'}>
    <ResetSuccessful />
  </Box>
)

export const Default = Template.bind({})
Default.args = {}
