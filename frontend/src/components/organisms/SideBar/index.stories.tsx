import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { MemoryRouter } from 'react-router-dom'
import Sidebar, { SidebarProps } from '.'

export default {
  title: 'Organisms/Sidebar',
  component: Sidebar,
} as Meta

const Template: StoryFn<SidebarProps> = (args) => {
  return (
    <MemoryRouter>
      <Sidebar {...args} />
    </MemoryRouter>

  )
}

export const Default = Template.bind({})
