import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import '../../../index.css'
import TimePeriodTabs, { TabProps } from '.'
import theme from '../../../utils/themes'

export default {
  title: 'Molecules/TimePeriodTabs',
  component: TimePeriodTabs,
  argTypes: {
    value: { control: 'number' },
    tabs: { control: 'object' },
    boxStyles: { control: 'object' },
  },
} as Meta

const Template: StoryFn<TabProps> = (args) => <TimePeriodTabs {...args} />

export const Default = Template.bind({})
Default.args = {
  value: 3,
  tabs: [
    { label: '1H' },
    { label: '24H' },
    { label: '1W' },
    { label: '1M' },
    { label: '1Y' },
    { label: 'ALL' },
  ],
  boxStyles: {
    width: 'fit-content',
    display: 'flex',
    border: `1% solid ${theme.palette.text.medemp}`,
    borderRadius: '2%',
  },
}
