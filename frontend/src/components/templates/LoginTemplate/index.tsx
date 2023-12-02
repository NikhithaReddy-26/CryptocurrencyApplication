import { Box, styled } from '@mui/material'

interface HomeTemplateProps {
  leftbar: React.ReactElement | string
  rightbar: React.ReactElement | string
}

const Wrapper = styled(Box)({
  width: '100vw',
  height: '99.9vh',
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  boxSizing: 'border-box',
})

const LeftBox = styled(Box)({
  minWidth: '50%',
  '@media (max-width: 730px)': {
    display: 'none',
  },
})

const RightBox = styled(Box)({
  minWidth: '50%',
  '@media (max-width: 730px)': {
    width: '100%',
  },
})

export const LoginTemplate = ({ leftbar, rightbar }: HomeTemplateProps) => {
  return (
    <Wrapper>
      <LeftBox>{leftbar}</LeftBox>
      <RightBox>{rightbar}</RightBox>
    </Wrapper>
  )
}
