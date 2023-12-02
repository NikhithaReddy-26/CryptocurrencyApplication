import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { SearchFilter } from './index'

export default {
  title: 'Molecules/SearchFilter',
  component: SearchFilter,
} as Meta

const Template: StoryFn = (args) => (
  <SearchFilter
    onChange={function (value: string): void {
      throw new Error('Function not implemented.')
    }}
    filterEnabled={false}
    {...args}
  />
)

export const Default = Template.bind({})
Default.args = {
  filterEnabled: true,
}
