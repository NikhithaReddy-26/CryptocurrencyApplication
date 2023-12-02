import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { Footer } from './index'

export default {
  title: 'Organisms/Footer',
  component: Footer,
} as Meta

export const Default: StoryFn = () => <Footer />