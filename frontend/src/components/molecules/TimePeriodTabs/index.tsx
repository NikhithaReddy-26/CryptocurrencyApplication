import React from 'react'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import { Stack, styled } from '@mui/material'
import theme from '../../../utils/themes'

interface TabObject {
  label: string
  value?: any
}

export interface TabProps {
  value?: number
  tabs?: TabObject[]
  handleChange?: (event: React.SyntheticEvent, value: number) => void
  boxStyles?: React.CSSProperties
}

const StyledTabs = styled(Tabs)({
  '& .MuiTabs-indicator': {
    display: 'none',
  },
})

const StyledTab = styled(Tab)(
  ({ label, value }: { label: string; value: number }) => ({
    minWidth: 'unset',
    width: '16%',
    borderRadius: '50%',
    color:
      label === '1M'
        ? theme.palette.primary[900] + ' !important'
        : theme.palette.text.medemp,
    backgroundColor:
      label === '1M' && value === 3 ? theme.palette.primary[300] : undefined,
    marginBottom: '0.8%',
    marginTop: '0.8%',
    ...theme.typography.c2,
    padding: '10px 16px',
  })
)

const TimePeriodTabs = ({ value, tabs, handleChange }: TabProps) => {
  return (
    <Stack
      style={{
        border: `1px solid ${theme.palette.gray[100]}`,
        backgroundColor:`${theme.palette.gray.white}`,

      }}
      maxWidth={'304px'}
      width="95%"
    >
      <StyledTabs value={value} onChange={handleChange}>
        {tabs?.map((tab) => (
          <StyledTab key={tab.label} label={tab.label} value={tab.value} />
        ))}
      </StyledTabs>
    </Stack>
  )
}

export default TimePeriodTabs
