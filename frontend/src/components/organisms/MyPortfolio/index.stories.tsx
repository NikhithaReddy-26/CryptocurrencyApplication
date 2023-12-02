import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import MyPortFolio from './index'

export default {
  title: 'organisms/MyPortFolio',
  component: MyPortFolio,
  argTypes: {
    coin: {
      control: 'text',
    },
    isOpen: {
      control: 'boolean',
    },
  },
} as Meta

const Template: StoryFn<typeof MyPortFolio> = (args) => (
  <MyPortFolio {...args} />
)

export const Bitcoin = Template.bind({})
Bitcoin.args = {
  coin: 'Bitcoin',
  coinChangePercentage: '-5.1',
  totalInvestmentChangePercentage: '+5.1',
  totalInvestmentValue: '$ 11,900,204',
  coinValue: '$ 12,400',
  page:'graph'
}


export const LandingPage = Template.bind({})
LandingPage.args = {
  coin: 'Bitcoin',
  coinChangePercentage: '-5.1',
  totalInvestmentChangePercentage: '+5.1',
  totalInvestmentValue: '$ 11,900,204',
  coinValue: '$ 12,400',
  page:'landing'
}