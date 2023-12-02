import React, { useState } from 'react'
import { Box, styled } from '@mui/system'
import logoIcon from '../../../../public/assets/icons/logo.svg'
import ToolTipIcon from '../../molecules/toolTipIcon'
import dashboardIcon from '../../../../public/assets/icons/dashboard.svg'
import dashboardIconActive from '../../../../public/assets/icons/dashboardactive.svg'
import notificationIcon from '../../../../public/assets/icons/notification.svg'
import logoutIcon from '../../../../public/assets/icons/logout.svg'
import TradeIcon from '../../../../public/assets/icons/trade.svg'
import portfolio from '../../../../public/assets/icons/portfolio.svg'
import theme from '../../../utils/themes'
import { useAuth0 } from '@auth0/auth0-react'
import { useNavigate } from 'react-router-dom'

const SidebarWrapper = styled(Box)({
  height: '77.45vh',
  maxWidth: '5vw',
  padding: '24px',
  display: 'flex',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'space-between',
  backgroundColor: `${theme.palette.gray.white}`,
})

const IconContainer = styled(Box)`
  height: 43.94vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  position: relative;
`

const IconGroupContainer = styled(Box)`
  height: 27.66vh;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
`

export interface SidebarProps {
  onDashboardClick?: () => void
}

const Sidebar: React.FC<SidebarProps> = ({ onDashboardClick }) => {
  const [isActive, setIsActive] = useState(false)
  const navigate = useNavigate()
  const { logout } = useAuth0()

  const handleDashboardClick = () => {
    setIsActive(!isActive)
    navigate('/dashboard')
    if (onDashboardClick) {
      onDashboardClick()
    }
  }

  const handleLogoutClick = () => {
    logout({ logoutParams: { returnTo: window.location.origin } })
  }

  return (
    <SidebarWrapper>
      <IconContainer>
        <ToolTipIcon title="Logo" src={logoIcon} />
        <ToolTipIcon
          title="Dashboard"
          src={isActive ? dashboardIconActive : dashboardIcon}
          onClick={handleDashboardClick}
        />
        <IconGroupContainer>
          <ToolTipIcon title="Portfolio" src={portfolio} />
          <ToolTipIcon title="TradeIcon" src={TradeIcon} />
          <ToolTipIcon title="Notification" src={notificationIcon} />
          <ToolTipIcon
            title="Logout"
            src={logoutIcon}
            onClick={handleLogoutClick}
          />
        </IconGroupContainer>
      </IconContainer>
    </SidebarWrapper>
  )
}

export default Sidebar
