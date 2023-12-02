import { StoryFn, Meta } from '@storybook/react'
import Transactions from '.'
import walletSuccess from '../../../../public/assets/images/tickmark.svg'

export default {
  title: 'Molecules/Transactions',
  component: Transactions,
  argTypes: {
    month: { control: 'text' },
    date: { control: 'number' },
    icon: { control: 'text' },
    coinName: { control: 'text' },
    bitcoinPrice: { control: 'text' },
    dollarPrice: { control: 'text' },
    purchased: { control: 'boolean' },
  },
} as Meta

const Template: StoryFn<typeof Transactions> = (args) => (
  <Transactions {...args} />
)

export const PurchasedTransaction = Template.bind({})
PurchasedTransaction.args = {
  month: 'June',
  date: 23,
  icon: walletSuccess,
  coinName: 'Bitcoin BTC',
  coinPrice: 0.001,
  dollarPrice: '34,000.00',
  purchased: true,
}

export const SoldTransaction = Template.bind({})
SoldTransaction.args = {
  month: 'June',
  date: 14,
  icon: walletSuccess,
  coinName: 'Bitcoin BTC',
  coinPrice: 0.023451,
  dollarPrice: '34,000.00',
  purchased: false,
}
