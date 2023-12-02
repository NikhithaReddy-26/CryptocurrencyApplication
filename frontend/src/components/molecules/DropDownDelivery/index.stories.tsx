import {StoryFn,Meta} from "@storybook/react";
import DropDownBox from ".";

export default{
    title:"Molecules/DropdownDelivery",
    component:DropDownBox,
    argTypes: {
        coin: {
            control: "text",
        },
        isOpen: {
            control: 'boolean',
          },
      },
} as Meta;

const Template:StoryFn<typeof DropDownBox> = (args) => <DropDownBox {...args} />;

export const Bitcoin = Template.bind({});
Bitcoin.args = {
    coin:"Bitcoin"
}

export const Ethereum = Template.bind({});
Ethereum.args = {
    coin:"Ethereum"
}