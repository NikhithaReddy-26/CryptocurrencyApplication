import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import CryptoCard, { CardProps } from './index'
import BitcoinImg from "../../../../public/assets/images/BItcoin.svg"
import EthereumImg from "../../../../public/assets/images/Etherum.svg"
import BinanceImg from "../../../../public/assets/images/bitcoin-coin.svg"
import TetherImg from "../../../../public/assets/images/Tether.svg"
import CardanoImg from "../../../../public/assets/images/cardana.svg"
import XRPImg from "../../../../public/assets/images/xrp.svg"
import DodgecoinImg from "../../../../public/assets/images/dodge-coin.svg"
import PolkadotImg from "../../../../public/assets/images/polkadot.svg"

export default {
  title: 'Molecules/CryptoCard',
  component: CryptoCard,
} as Meta

const Template: StoryFn<CardProps & { isSelected?: boolean }> = (args) => (
  <CryptoCard {...args} />
)

export const  Bitcoin = Template.bind({})
Bitcoin.args = {
  icon: BitcoinImg,
  title: 'Bitcoin',
  price: '$3,406,069.54',
}

export const Ethereum = Template.bind({})
Ethereum.args = {
  icon: EthereumImg,
  title: 'Ethereum',
  price: '$1,297.93',
}

export const Binance = Template.bind({})
Binance.args = {
  icon: BinanceImg,
  title: 'Binance',
  price: '$30,054.88',
}

export const Tether = Template.bind({})
Tether.args = {
  icon: TetherImg,
  title: 'Tether',
  price: '$74.21',
}

export const Cardano = Template.bind({})
Cardano.args = {
  icon: CardanoImg,
  title: 'Cardano',
  price: '$138.22',
}

export const XRP = Template.bind({})
XRP.args = {
  icon: XRPImg,
  title: 'XRP',
  price: '$76.73',
}

export const Dodgecoin = Template.bind({})
Dodgecoin.args = {
  icon: DodgecoinImg,
  title: 'Dodgecoin',
  price: '$21.37',
}

export const Polkadot = Template.bind({})
Polkadot.args = {
  icon: PolkadotImg,
  title: 'Polkadot',
  price: '$1,642.39',
}
