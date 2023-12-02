import theme from '../../../utils/themes/index'
import { useState } from 'react'
import { Box, MenuItem, Stack, Typography, styled } from '@mui/material'
import DropDownBox from '../../molecules/DropDownDelivery'
import { DeliveryItems } from '../../../utils/constants'

export interface DeliveryFeeProps {
  coin: string
}

const StyledMenuItem = styled(MenuItem)(({ theme }) => ({
  borderBottom: '1px solid' + `${theme.palette.grey[100]}`,
  borderLeft: '1px solid' + `${theme.palette.grey[100]}`,
  borderRight: '1px solid' + `${theme.palette.grey[100]}`,
  width:"60vw",
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  padding: '1rem',
  backgroundColor: `${theme.palette.gray.white}`,
  '&:hover': {
    backgroundColor: `${theme.palette.gray[50]}`,
  },
}))

const StyledBox = styled('div')({
  maxHeight: '156px',
  width:'63vw',
  padding: '1.5rem',
  borderRadius: '0.25rem',
  border: `0.0625rem solid ${theme.palette.gray[100]}`,
  backgroundColor: `${theme.palette.gray.white}`,
})

const DeliveryFee = ({ coin }: DeliveryFeeProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const handleClick = () => {
    setIsOpen(!isOpen)
  }
  return (
    <StyledBox>
      <Typography
        variant="b1"
        sx={{ color: theme.palette.text.highemp }}
        children="Select speed delivery"
      />
      <div style={{ marginTop: '1rem' }}>
        <DropDownBox coin={coin} onClick={handleClick} isOpen={isOpen} />
        {isOpen && (
          <Box width={'104%'} test-id="dropdownBox">
            {DeliveryItems.map((item) => (
              <StyledMenuItem key={item.label1}>
                <Stack direction="row">
                  <Typography variant="b2" className="label1">
                    {item.label1}&nbsp;
                  </Typography>
                  {item.label2 && (
                    <>
                      :
                      <Typography variant="b1" className="label2">
                        &nbsp;{item.label2}
                      </Typography>
                    </>
                  )}
                </Stack>
                <Typography variant="c2">
                  {coin === 'bitcoin' ? item.infoBitcoin : item.infoEthereum}
                </Typography>
              </StyledMenuItem>
            ))}
          </Box>
        )}
      </div>
    </StyledBox>
  )
}

export default DeliveryFee
