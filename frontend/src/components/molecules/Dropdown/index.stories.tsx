import { Meta, StoryFn } from '@storybook/react'
import { Dropdown, DropdownProps } from './index'

export default {
  title: 'Molecules/Dropdown',
  component: Dropdown,
} as Meta

const Template: StoryFn<DropdownProps> = (args) => <Dropdown {...args} />

export const Default = Template.bind({})
Default.args = {
  text: 'All assets',
  height: '2.5rem',
  width: 'fit-content',
  variant: 'b1',
}

export const short = Template.bind({})
short.args = {
  text: '1M',
  height: '2.5rem',
  width: 'fit-content',
  variant: 'b1',
}
export const hour = Template.bind({})
hour.args = {
  text: '24h',
  height: '2.5rem',
  width: 'fit-content',
  variant: 'b1',
}
export const VariantB2 = Template.bind({})
VariantB2.args = {
  text: 'English',
  height: '2.625rem',
  width: '10.625rem',
  variant: 'b2',
}
