import { Meta, StoryFn } from '@storybook/react'
import PaymentCard from '.'

export default {
  title: 'Molecules/PaymentCard',
  component: PaymentCard,
} as Meta

const Template: StoryFn<typeof PaymentCard> = (args) => (
  <PaymentCard {...args} />
)

export const BuyScreenCard = Template.bind({})
BuyScreenCard.args = {
  title: 'PaymentMethod',
  heading1: 'USD Coin (Cash)',
  description: 'Total Balance - $',
  otherText: 'Default',
  balanceAmount: '34,000',
}

export const SellScreenCard = Template.bind({})
SellScreenCard.args = {
  title: 'Deposit to',
  heading1: 'USD Coin (Cash)',
  otherText: 'Default',
}
