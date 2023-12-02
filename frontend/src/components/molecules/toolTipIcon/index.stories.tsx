import { Meta, StoryFn } from '@storybook/react'
import logout from '../../../../public/assets/icons/logout.svg'
import dashboard from '../../../../public/assets/icons/dashboard.svg'

import ToolTipIcon from './index'

export default {
  title: 'Molecules/tooltip',
  component: ToolTipIcon,
} as Meta<typeof ToolTipIcon>

const Template: StoryFn<typeof ToolTipIcon> = (args) => (
  <ToolTipIcon {...args} />
)

export const dashboardIcon = Template.bind({})
dashboardIcon.args = {
  title: 'Dashboard',
  src: dashboard,
}

export const logoutIcon = Template.bind({})
logoutIcon.args = {
  title: 'Logout',
  src: logout,
}
