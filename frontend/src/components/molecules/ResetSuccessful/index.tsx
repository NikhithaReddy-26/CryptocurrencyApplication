import { Box, Stack, Typography } from '@mui/material'
import tickCircle from '../../../../public/assets/images/tick-circle.svg'
import Icon from '../../atoms/Icons'
import { styled } from '@mui/system'
import theme from '../../../utils/themes'
import { resetDetails } from '../../../utils/constants'

const StyledBox = styled(Box)({
  width: 'auto',
  Height: '94px',
  padding: '24px',
  borderRadius: '12px',
  border: '1px solid red',
  gap: '12px',
  borderColor: theme.palette.grey[100],
  backgroundColor: theme.palette.primary[100],
})

export const ResetSuccessful = () => {
  return (
    <StyledBox>
      <Stack direction={'row'} spacing={2}>
        <Icon src={tickCircle} />
        <Stack>
          <Typography
            children={resetDetails.topContent}
            variant="b1"
            color={theme.palette.text.highemp}
          />
          <Typography
            children={resetDetails.bottomContent}
            variant="b2"
            color={theme.palette.text.medemp}
          />
        </Stack>
      </Stack>
    </StyledBox>
  )
}
