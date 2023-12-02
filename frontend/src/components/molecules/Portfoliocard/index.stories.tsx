import { StoryFn, Meta } from '@storybook/react'
import cardana from '../../../../public/assets/images/cardana.svg'
import { PortfolioCard, PortfolioProps } from './index'
import bitcoin from '../../../../public/assets/images/BItcoin.svg'
import Tether from '../../../../public/assets/images/Tether.svg'
import usd from '../../../../public/assets/images/usd-coin.svg'
export default {
  title: 'Molecules/PortfolioCard',
  component: PortfolioCard,
} as Meta

const Template: StoryFn<PortfolioProps> = (args) => <PortfolioCard {...args} />

export const Default = Template.bind({})
Default.args = {
  src: cardana,
  text1: 'Cardano',
  text2: 'Moves tightly together',
  value1: '$20,000.00',
  value2: '100%',
}

export const positive = Template.bind({})
positive.args = {
  src: bitcoin,
  text1: 'Bitcoin',
  text2: 'BTC',
  value1: '$34,000,00',
  value2: '+1.06%',
}
export const negative = Template.bind({})
negative.args = {
  src: Tether,
  text1: 'Tether',
  text2: 'USDT',
  value1: '$34,000,00',
  value2: '-0.01%',
}
export const walletcoin = Template.bind({})
walletcoin.args = {
  src: usd,
  text1: 'Tether',
  text2: 'USDT',
  value1: '$34,000,00',
}
