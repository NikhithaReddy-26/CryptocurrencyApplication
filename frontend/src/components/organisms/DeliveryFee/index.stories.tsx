import { StoryFn, Meta } from '@storybook/react'

import DeliveryFee from '.'

export default {
  title: 'Organisms/DeliverFee',
  component: DeliveryFee,
} as Meta

const Template: StoryFn<typeof DeliveryFee> = (args) => (
  <DeliveryFee {...args} />
)

export const Bitcoin = Template.bind({})
Bitcoin.args = {
  coin: 'Bitcoin',
}

export const Ethereum = Template.bind({})
Ethereum.args = {
  coin: 'Ethereum',
}
