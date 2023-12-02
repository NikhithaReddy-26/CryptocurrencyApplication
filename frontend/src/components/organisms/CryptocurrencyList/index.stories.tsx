import { StoryFn, Meta } from '@storybook/react'
import { CurrencyList } from '.'

export default {
  title: 'Organisms/CurrencyList',
  component: CurrencyList,
} as Meta

const Template: StoryFn = (args) => <CurrencyList {...args} />

export const Default = Template.bind({})
Default.args = {
  onSelectChip: (chip: string) => {
    console.log('Selected Chip:', chip)
  },
}
