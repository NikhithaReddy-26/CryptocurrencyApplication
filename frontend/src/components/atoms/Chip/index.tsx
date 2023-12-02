import styled from '@emotion/styled'
import { Chip, ChipProps } from '@mui/material'

interface IChipProps extends ChipProps {}

const StyledChip = styled(Chip)({})

export default function CustomChip({ ...rest }: IChipProps) {
  return (
    <div>
      <StyledChip data-testid="custom-chip" {...rest} />
    </div>
  )
}
