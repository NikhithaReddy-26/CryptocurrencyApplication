import { render, screen, waitFor, fireEvent } from '@testing-library/react'
import ToolTipIcon from './index'

describe('ToolTipIcon', () => {
  test('triggers tooltip on hover', async () => {
    const title = 'Example Tooltip'
    const src = 'path/to/icon.png'

    render(<ToolTipIcon title={title} src={src} arrow={true} />)

    const iconElement = screen.getByRole('img', { name: title })
    const imgElement = iconElement as HTMLImageElement
    fireEvent.mouseEnter(iconElement)

    await waitFor(() => {
      const tooltipElement = screen.getByText(title)
      expect(tooltipElement).toBeInTheDocument()
    })

    expect(imgElement).toBeInTheDocument()
  })
})
