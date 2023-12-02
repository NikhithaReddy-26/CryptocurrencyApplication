import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import Header from './'

export default {
  title: 'Organisms/Header',
  component: Header,
} as Meta

const Template: StoryFn<typeof Header> = (args) => <Header {...args} />

export const Trade = Template.bind({})
Trade.args = {
  headerName: 'Trade',
}

export const Checkout = Template.bind({})
Checkout.args = {
  headerName: 'Checkout',
}
