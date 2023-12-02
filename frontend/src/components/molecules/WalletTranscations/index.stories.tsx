import { StoryFn, Meta } from '@storybook/react'
import { TransactionCard } from '.'
import { ThemeProvider } from '@emotion/react'
import theme from '../../../utils/themes'
import Image from '../../../../public/assets/images/tickmark.svg'

export default {
  title: 'Molecules/TransactionCard',
  component: TransactionCard,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof TransactionCard> = (args) => (
  <ThemeProvider theme={theme}>
    <TransactionCard {...args} />
  </ThemeProvider>
)

export const Default = Template.bind({})
Default.args = {
  month: 'Feb',
  day: 25,
  currencyName: 'Bitcoin',
  imgSource: Image,
  from: 'Jane Cooper',
  status: 'Purchased',
  currencyValue: '+ 0.0010 BTC',
  convertedAmount: '+$1800',
}
