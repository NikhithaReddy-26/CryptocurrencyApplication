import { Box, Stack, styled } from '@mui/material'
import { useState } from 'react'
import CustomChip from '../../atoms/Chip'
import leftArrow from '../../../../public/assets/icons/chevron-left.svg'
import Icon from '../../atoms/Icons'
import rightArrow from '../../../../public/assets/icons/chevron-right.svg'
import { chipsData } from '../../../utils/constants'

const StyledCustomChip = styled(CustomChip)({
  borderRadius: '2px',
})
const StyledchipStack = styled(Stack)({
  flexWrap: 'wrap',
  display: 'flex',
  alignItems: 'center',
})
export const CurrencyList = ({ onSelectChip }: any) => {
  const [selectedChip, setSelectedChip] = useState<string>('bitcoin')

  const chipClick = (event: any, chip: string) => {
    setSelectedChip(chip)
    onSelectChip(chip)
  }

  return (
    <Box>
      <Stack direction={'row'} width={'100%'}>
        <Icon src={rightArrow} />
        <StyledchipStack direction={'row'} spacing={2}>
          {chipsData.map((chip) => (
            <StyledCustomChip
              data-testid='ChipsClick'
              key={chip.value}
              label={chip.label}
              variant="filled"
              onClick={(event: any) => chipClick(event, chip.value)}
              style={{
                border:
                  selectedChip === chip.value ? '2px solid #F7931A' : 'none',
                backgroundColor: chip.backgroundColor,
              }}
              sx={{
                width:'102px'
              }}
            />
          ))}
        </StyledchipStack>
        <Icon src={leftArrow} />
      </Stack>
    </Box>
  )
}
