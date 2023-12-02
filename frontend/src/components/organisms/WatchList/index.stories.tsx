import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import WatchList from '.'
import {
  BitcoinCoinChangePercentage,
  WatchListBitcoinData,
  EthereumCoinChangePercentage,
  WatchListEthereumData,
} from '../../../utils/constants'
import theme from '../../../utils/themes'
import bitcoin from '../../../../public/assets/images/BItcoin.svg'
import ethereum from '../../../../public/assets/images/Etherum.svg'

export default {
  title: 'Organisms/WatchList',
  component: WatchList,
} as Meta

const findColor = (val: string) => {
  const redColor = `${theme.palette.semantic.error[500]}`
  const greenColor = `${theme.palette.semantic.success[500]}`
  const colorIs = val.includes('-') ? redColor : greenColor
  return colorIs
}

const EthereumData = WatchListEthereumData
EthereumData[0].color = findColor(EthereumCoinChangePercentage)
const Template: StoryFn<typeof WatchList> = (args) => <WatchList {...args} />

export const Bitcoin = Template.bind({})
Bitcoin.args = {
  CoinChangePercentage: EthereumCoinChangePercentage,
  data: EthereumData,
  WatchListIcon: bitcoin,
  CoinName: 'Bitcoin',
  CoinValue: '$34,986,60.54',
}

const BitcoinData = WatchListBitcoinData
BitcoinData[0].color = findColor(BitcoinCoinChangePercentage)

export const Ethereum = Template.bind({})
Ethereum.args = {
  CoinChangePercentage: BitcoinCoinChangePercentage,
  data: BitcoinData,
  WatchListIcon: ethereum,
  CoinName: 'Ethereum',
  CoinValue: '$5,876.90',
}
