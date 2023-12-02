import { StoryFn, Meta } from '@storybook/react'
import CorrelationCard from '.'

export default {
  title: 'organisms/CorrelationCard',
  component: CorrelationCard,
  argTypes: {},
} as Meta

const Template: StoryFn<typeof CorrelationCard> = () => <CorrelationCard />

export const Default = Template.bind({})
