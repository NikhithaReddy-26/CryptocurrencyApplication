import { Meta, StoryFn } from '@storybook/react'
import CustomButton from '.'
import theme from '../../../utils/themes'
import Icon from '../Icons'
import CheckedStar from '../../../../public/assets/icons/Property 1=icons, Property 2=star-line.svg'

export default {
  title: 'Atoms/Button',
  Component: CustomButton,
} as Meta<typeof CustomButton>

const Template: StoryFn<typeof CustomButton> = (args) => (
  <CustomButton {...args} />
)

export const SignIn = Template.bind({})
SignIn.args = {
  children: 'Signin',
  variant: 'contained',
  typoVariant:'b1',
  style: {
    width: '512px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.primary[500]}`,
  },
}

export const SignInDisabled = Template.bind({})
SignInDisabled.args = {
  children: 'Signin',
  disabled: true,
  variant: 'contained',
  style: {
    width: '512px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.primary[300]}`,
    color: `${theme.palette.gray.white}`,
  },
}

export const SignUp = Template.bind({})
SignUp.args = {
  children: 'Signup',
  variant: 'contained',
  style: {
    width: '512px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.primary[500]}`,
  },
}

export const SignUpDisabled = Template.bind({})
SignUpDisabled.args = {
  children: 'Signup',
  disabled: true,
  variant: 'contained',
  style: {
    width: '512px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.primary[300]}`,
    color: `${theme.palette.gray.white}`,
  },
}

export const sendResetLink = Template.bind({})
sendResetLink.args = {
  children: 'Send Reset Link',
  variant: 'contained',
  style: {
    width: '512px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.primary[500]}`,
  },
}

export const sellNow = Template.bind({})
sellNow.args = {
  children: 'Sell Now',
  variant: 'contained',
  style: {
    width: '512px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.semantic.warning[300]}`,
  },
}

export const buyNow = Template.bind({})
buyNow.args = {
  children: 'Buy Now',
  variant: 'contained',
  style: {
    width: '512px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.primary[500]}`,
  },
}

export const buy = Template.bind({})
buy.args = {
  children: 'BUY',
  variant: 'contained',
  style: {
    width: '120px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.primary[500]}`,
  },
}

export const sell = Template.bind({})
sell.args = {
  children: 'SELL',
  variant: 'contained',
  style: {
    width: '120px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.semantic.warning[300]}`,
  },
}


export const buyMax = Template.bind({})
buyMax.args = {
  children: "Buy Max",
  variant: 'outlined',
  typoVariant:`${theme.typography.button}`,
  style: {
    width: '93px',
    height: '42px',
    borderRadius: '4px',
    textTransform:'none',
  },
}

export const sellMax = Template.bind({})
sellMax.args = {
  children: 'Sell Max',
  variant: 'outlined',
  typoVariant:`${theme.typography.button}`,
  style: {
    width: '93px',
    height: '42px',
    borderRadius: '4px',
    fontSize: '14px',
  },
}

export const buyCrypto = Template.bind({})
buyCrypto.args = {
  children: 'Buy Crypto',
  variant: 'contained',
  typoVariant:`${theme.typography.button}`,
  style: {
    width: '151px',
    height: '42px',
    borderRadius: '4px',
    backgroundColor: `${theme.palette.primary[500]}`,
    fontSize: '14px',
  },
}

export const goToUsdCoin = Template.bind({})
goToUsdCoin.args = {
  children: 'GO TO USD COIN',
  variant: 'outlined',
  typoVariant:`${theme.typography.button}`,
  style: {
    width: '150px',
    height: '42px',
    borderRadius: '4px',
    fontSize: '14px',
  },
}

export const addToWatchlist = Template.bind({})
addToWatchlist.args = {
  children: 'Added to Watchlist',
  typoVariant:`${theme.typography.button}`,
  variant: 'outlined',
  startIcon:<Icon src={CheckedStar}/>,
  style: {
    width: '215px',
    height: '42px',
    borderRadius: '4px',
    fontSize: '14px',
    textTransform:'none',
  },
}

export const needHelp = Template.bind({})
needHelp.args = {
  children: 'Need Help',
  variant: 'outlined',
  style: {
    width: '109px',
    height: '42px',
    borderRadius: '4px',
    fontSize: '14px',
  },
}
