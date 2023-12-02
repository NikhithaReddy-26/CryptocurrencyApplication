import React from "react";
import { StoryFn ,Meta} from "@storybook/react";
import Balance from ".";

export default {
    title: 'Molecules/Balance',
    component: Balance,
  } as Meta

const Template: StoryFn<typeof Balance> = (args) => <Balance {...args} />;

export const Default = Template.bind({});
Default.args = {
  heading1: 'USD Coin',
  description: 'US Coin',
  balanceAmount: '$34,000'
};
