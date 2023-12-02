import React from 'react';
import { Meta, StoryFn } from '@storybook/react';
import {TotalBalance, TotalBalanceProps } from '.';
import bitcoin from '../../../../public/assets/images/BItcoin.svg';

export default {
  title: 'Molecules/TotalBalance',
  component: TotalBalance,
} as Meta;

const Template: StoryFn<TotalBalanceProps> = (args) => <TotalBalance {...args} />;

export const Default = Template.bind({});
Default.args = {
  title: 'Total Balance',
  heading: 'Bitcoin',
  amount: '0.0234510 BTC',
  src: bitcoin,
};
