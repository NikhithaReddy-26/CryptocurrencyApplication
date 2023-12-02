import { Meta, StoryFn } from "@storybook/react";
import RadioButton from ".";

export default {
  title: "Atoms/RadioButton",
} as Meta<typeof RadioButton>;

const Template: StoryFn<typeof RadioButton> = (args) => (
  <RadioButton {...args}></RadioButton>
);

export const selectedRadioButton = Template.bind({});
selectedRadioButton.args = {
  checked: true,
  onChange: () => {
    console.log("Radio Button Clicked");
  },
};

export const unselectedRadioButton = Template.bind({});
unselectedRadioButton.args = {
  checked: false,
  onChange: () => {
    console.log("Radio Button Clicked");
  },
};
