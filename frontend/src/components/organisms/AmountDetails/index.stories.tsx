import React from "react";
import { StoryFn, Meta } from '@storybook/react';
import AmountDetails, { AmountDetailsProps } from ".";

export default {
  title: "Organisms/AmountDetails",
  component: AmountDetails,
  argTypes: {
    currency: { control: "text" }, 
    price: { control: "number" },
    value: { control: "number" },
  },
} as Meta;

const Template: StoryFn<AmountDetailsProps> = (args) => (
  <AmountDetails {...args} />
);

export const Default = Template.bind({});
Default.args = {
  currency: "BTC",
  price: 3297866.84,
  value: 0.0234510,
  conversionValue:"$34000" ,
  buttonText: "Sell max",
  showCurrencySign:false,
  coinLabel:"BTC",
  isBuy:false
};

export const BuyMax = Template.bind({});
BuyMax.args = {
  currency: "BTC",
  price: 3297866.84,
  value: 34000,
  conversionValue: "0.0234510",
  buttonText: "Buy max",
};