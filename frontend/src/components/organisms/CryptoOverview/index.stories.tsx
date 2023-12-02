import React from 'react'
import { Meta, StoryFn } from '@storybook/react'

import CryptoOverview from './index'

export default {
  title: 'Organisms/CryptoOverview',
  component: CryptoOverview,
} as Meta

const Template: StoryFn<typeof CryptoOverview> = (args) => (
  <CryptoOverview {...args} />
)

export const Default = Template.bind({})
Default.args = {
  coinValue: '1234.56',
  coinChangePercentage: '-1.23%',
}
