import React from "react";
import { StoryFn ,Meta} from "@storybook/react";
import ColumnHeader,{HeaderProps} from ".";

export default {
    title: 'Molecules/ColumnHeader',
    component: ColumnHeader,
  } as Meta

const Template: StoryFn<HeaderProps> = (args) => <ColumnHeader {...args} />;

export const Default = Template.bind({});
Default.args = {
  name: "Name",
  price: "Price",
  change: "Change",
  marketCap: "MarketCap",
};
