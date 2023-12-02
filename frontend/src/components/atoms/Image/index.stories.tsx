import {Meta,StoryFn} from "@storybook/react";
import Image from './index';
import cardana from "../../../../public/assets/images/cardana.svg"

export default {
    title: "Atoms/Images",
    component: Image,
    argTypes:{
        onClick: {
            action: "clicked",
          },
    },
} as Meta<typeof Image>;

const Template: StoryFn<typeof Image> = (args) => <Image {...args} />;
export const cardanaImage= Template.bind({});
cardanaImage.args = {
  src: cardana,
  alt: "cardana image",
  width: "56px",
  height: "56px",
  onClick:() =>{
    console.log('This is the caradana image');
  }
};

