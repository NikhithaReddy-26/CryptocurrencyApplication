import React from 'react'
import { StoryFn, Meta } from '@storybook/react'
import { LoginTemplate } from './index'
import Images from '../../atoms/Image'
import Login from '../../../../public/assets/images/loginImage.png'

export default {
  title: 'Templates/LoginTemplate',
  component: LoginTemplate,
} as Meta

export const Default: StoryFn = () => (
  <LoginTemplate
    leftbar={<Images src={Login} width={'99%'} height={'99%'} />}
    rightbar={'login'}
  />
)
