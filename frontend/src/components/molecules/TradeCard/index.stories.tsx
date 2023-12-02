import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import TradeCard from './index';
import bitcoin from '../../../../public/assets/images/BItcoin.svg'
import ethereum from '../../../../public/assets/images/Etherum.svg'


export default {
  title: 'Molecules/TradeCard',
  component: TradeCard,
} as Meta;

const Template: StoryFn<typeof TradeCard> = (args) => <TradeCard {...args} />;

export const Bitcoin = Template.bind({});
Bitcoin.args = {
  coinName: 'Bitcoin',
  coinSrc: bitcoin,
  coinCaption: 'Digital Currency',
  coinPrice: 47000,
  coinChange: '+2.5%',
  coinMarketCap: '$900B',
  coinisWatchListed: true,
};

export const Ethereum = Template.bind({});
Ethereum.args = {
  coinName: 'Ethereum',
  coinSrc: ethereum,
  coinCaption: 'ETH2',
  coinPrice: 3000,
  coinChange: '-1.8%',
  coinMarketCap: '$400B',
  coinisWatchListed: false,
};
