import { Meta, StoryFn } from "@storybook/react";
import { Dashboard, DashboardProps } from ".";
import Sidebar from "../../organisms/SideBar";
import Header from "../../organisms/Header";
import { Footer } from "../../organisms/Footer";
import { PaymentCardList } from "../../organisms/PaymentCards";

export default {
  component: Dashboard,
  title: "Templates/Dashboard",
} as Meta;

const Template: StoryFn<DashboardProps> = (args) => <Dashboard {...args} />;

export const Default: StoryFn<DashboardProps> = Template.bind({});
Default.args = {
  sidebar: 'sidebar ',
  navbar: 'header',
  footer: 'footer',
  content: 'content',
};


