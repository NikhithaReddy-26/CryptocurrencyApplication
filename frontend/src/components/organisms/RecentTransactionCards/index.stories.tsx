import { StoryFn, Meta } from '@storybook/react'
import RecentTransactions from './index'

export default {
  title: 'Organisms/RecentTransactionsList',
  component: RecentTransactions,
} as Meta

const Template: StoryFn = (args) => <RecentTransactions {...args} />

export const Default = Template.bind({})
Default.args = {}
