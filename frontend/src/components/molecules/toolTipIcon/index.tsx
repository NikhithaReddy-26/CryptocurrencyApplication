import { Tooltip, TooltipProps, styled, tooltipClasses } from '@mui/material'
import theme from '../../../utils/themes'

interface ToolTipIconProps {
  title: string
  placement?: string
  src: any
  arrow?: boolean
  onClick?: () => void
}

const BootstrapTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} arrow classes={{ popper: className }} />
))(() => ({
  [`& .${tooltipClasses.arrow}`]: {
    color: theme.palette.gray[500],
    width: '16px',
    height: '16.29px',
    border: '1px',
  },
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: theme.palette.gray[500],
    fontSize: '14px',
    fintWeight: '500px',
    lineHeight: '42px',
    width: '106px',
    height: '42px',
    radius: '4px',
    textAlign: 'center',
    border: '1px',
  },
}))

const ToolTipIcon = ({ title, src, arrow, onClick }: ToolTipIconProps) => {
  return (
    <div>
      <BootstrapTooltip title={title} placement="right" arrow={arrow}>
        <img src={src} onClick={onClick} style={{ cursor: 'pointer' }} />
      </BootstrapTooltip>
    </div>
  )
}

export default ToolTipIcon
