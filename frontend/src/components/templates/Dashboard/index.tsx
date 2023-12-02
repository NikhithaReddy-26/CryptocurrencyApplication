import { Box, Stack, styled } from '@mui/material'
import theme from '../../../utils/themes'
import { Footer } from '../../organisms/Footer'

export interface DashboardProps {
  sidebar?: React.ReactElement | string
  navbar?: React.ReactElement | string
  footer?: React.ReactElement | string
  content?: React.ReactElement | string
}

export const Dashboard = ({
  navbar,sidebar,content
}: DashboardProps) => {
  return (
    <Wrapper>
      <InnerWrapper direction="row">
        <SidebarWrapper>
            {sidebar}
        </SidebarWrapper>
        <ContentWrapper>
          <NavbarWrapper>
            {navbar}
          </NavbarWrapper>
          <MiddleWrapper>
           {content}
          </MiddleWrapper>
          <FooterWrapper>
            <Footer />
          </FooterWrapper>
        </ContentWrapper>
      </InnerWrapper>
    </Wrapper>
  )
}

const Wrapper = styled(Box)(({ theme }) => ({
  width: '100vw',
  height: '100vh',
  flexDirection: 'column',
  backgroundColor: theme.palette.primary[100],
}))
const InnerWrapper = styled(Stack)({
  height: '100%',
})
const ContentWrapper = styled(Box)({
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  maxWidth: '95vw',
})

const SidebarWrapper = styled(Box)({
  flex: '0 0 5vw',
  backgroundColor: theme.palette.primary[100],
})

const MiddleWrapper = styled(Box)(({ theme }) => ({
  flex: 1,
  backgroundColor: theme.palette.primary[100],
  overflowY: 'auto',
  
}))

const NavbarWrapper = styled(Box)({
  minHeight: '8vh',
  backgroundColor: theme.palette.gray.white,
})

const FooterWrapper = styled(Box)({
  minHeight: '10vh',
  backgroundColor: theme.palette.primary[100],
})
