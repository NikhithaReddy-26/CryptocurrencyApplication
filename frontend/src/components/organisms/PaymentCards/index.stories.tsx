import { StoryFn, Meta } from '@storybook/react'
import { PaymentCardList } from '.'

export default {
  title: 'Organisms/PaymentCardList',
  component: PaymentCardList,
} as Meta

const Template: StoryFn = (args) => (
  <PaymentCardList selectedCrypto={''} {...args} />
)

export const Default = Template.bind({})
Default.args = {
  selectedCrypto: '',
}
