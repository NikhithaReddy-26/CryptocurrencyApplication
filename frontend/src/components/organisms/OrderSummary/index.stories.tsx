import React from 'react';
import { StoryFn, Meta } from '@storybook/react';
import OrderSummary from './';
import wallet from '../../../../public/assets/icons/wallet.svg'
import bankCard from '../../../../public/assets/icons/bank-card.svg'
import payingThrough from '../../../../public/assets/icons/bitcoin.svg'
import depositTo from '../../../../public/assets/icons/Property 1=icons, Property 2=rupee2.svg'

export default {
  title: 'Organisms/OrderSummary',
  component: OrderSummary,
} as Meta;

const Template: StoryFn<typeof OrderSummary> = (args) => <OrderSummary {...args} />;

export const BitcoinBuy = Template.bind({});
BitcoinBuy.args = {
  OrderType: "You're buying",
  OrderValue: '0.00285BTC',
  CoinValue: '1BTC = $3,223,454.44',
  PaymentMethodIcon: bankCard,
  PaymentMethod: 'Payment method',
  PaymentMethodType: 'visa card ....4567',
  DeliveryFee: '0.001BTC',
  DepositTypeIcon: wallet,
  DepositTo: 'Bitcoin Wallet',
  CoinOrderValue: '0.002456BTC',
  CostOrderValue: '$347665',
  TransactionFee: '$100',
  Total: '$347665',
  ButtonChildren: 'BUY NOW'
};

export const EthereumSell = Template.bind({});
EthereumSell.args = {
  OrderType: "You're selling",
  OrderValue: '0.23455ETH',
  CoinValue: '1ETH = $1,234.55',
  PaymentMethodIcon: payingThrough,
  PaymentMethod: 'Payment through',
  PaymentMethodType: 'Bitcoin wallet',
  DeliveryFee: '0.005ETH',
  DepositTypeIcon: depositTo,
  DepositTo: 'Rupee Coin',
  CoinOrderValue: '0.002456BTC',
  CostOrderValue: '$648.54',
  TransactionFee: '$30.0',
  Total: '$346.54',
  ButtonChildren: 'SELL NOW'
};