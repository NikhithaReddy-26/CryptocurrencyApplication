import { Meta, StoryFn } from '@storybook/react'
import BasicChip from './index'
import theme from '../../../utils/themes'

export default {
  title: 'Atoms/Chip',
  component: BasicChip,
} as Meta<typeof BasicChip>

const Template: StoryFn<typeof BasicChip> = (args) => <BasicChip {...args} />

export const bitcoin = Template.bind({});
bitcoin.args = {
  label: 'Bitcoin',
  variant: 'filled',
  onClick: () => 'Hello there!',
  style: {
    backgroundColor: `${theme.palette.semantic.warning[300]}`,
    borderRadius: '2px',
  },
};

export const ethereum = Template.bind({});
ethereum.args = {
  label: 'ethereum',
  variant: 'filled',
  onClick: () => 'Hello there!',
  style: {
    backgroundColor: `${theme.palette.primary[300]}`,
    borderRadius: '2px',
  },
};


export const xpr = Template.bind({});
xpr.args = {
  label: 'xpr',
  variant: 'filled',
  //   onClick: () => 'Hello there!',
  style: {
    backgroundColor: `${theme.palette.grey[100]}`,
    borderRadius: '2px',
  },
}

export const purchased = Template.bind({});
purchased.args = {
  label: 'purchased',
  variant: 'filled',
  style: {
    backgroundColor: `${theme.palette.grey[100]}`,
    borderRadius: '15px',
  },
};
