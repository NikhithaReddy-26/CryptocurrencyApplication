import { Meta, StoryFn } from "@storybook/react";
import Icon from "./index";
import search from "../../../../public/assets/icons/search.svg"
import trade from "../../../../public/assets/icons/trade.svg"
import visa from "../../../../public/assets/icons/Property 1=icons, Property 2=visa.svg"


export default {
  title: "Atoms/Icon",
  component: Icon,
  argTypes: {
    onClick: {
      action: "clicked",
    },
  },
} as Meta<typeof Icon>;

const Template: StoryFn<typeof Icon> = (args) => <Icon {...args} />;
export const SearchIcon = Template.bind({});
SearchIcon.args = {
  src: search,
  alt: "icon",
};
export const TradeIcon = Template.bind({});
TradeIcon.args = {
  src: trade,
  alt: "icon",
};
export const VisaIcon = Template.bind({});
VisaIcon.args = {
  src: visa,
  alt: "icon",
};
