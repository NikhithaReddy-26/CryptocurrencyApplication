import React, { useEffect, useState } from 'react'
import { StoryFn, Meta } from '@storybook/react'
import PortFolioCardsList from './index'
import { fetchData } from '../../../services/api/api'
import { MemoryRouter } from 'react-router-dom'

export default {
  title: 'Organisms/PortFolioCardsList',
  component: PortFolioCardsList,
} as Meta

const Template: StoryFn = (args) => {
  const [coinsData, setCoinsData] = useState<any[any]>([])
  useEffect(() => {
    const fetchCoinsData = async () => {
      try {
        const data = await fetchData('db')
        setCoinsData(data.Coins)
      } catch (error) {
        console.log('Error fetching coins data:', error)
      }
    }
    fetchCoinsData()
  }, [])
  return (
    <MemoryRouter>
      <PortFolioCardsList />
    </MemoryRouter>
  )
}

export const Default = Template.bind({})
Default.args = {}
