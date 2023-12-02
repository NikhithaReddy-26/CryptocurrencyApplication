import { render, screen } from '@testing-library/react'
import { PortfolioCard, PortfolioProps } from './index'
import theme from '../../../utils/themes/index'
describe('PortfolioCard', () => {
  const defaultProps: PortfolioProps = {
    src: 'path/to/image',
    coinName: 'Text 1',
    coinLable: 'Text 2',
    coinPrice: 'Value 1',
    coinChange: 'Value 2',
    height: '100px',
    width: '300px',
  }

  test('renders component with default props', () => {
    render(<PortfolioCard {...defaultProps} />)

    const text1Element = screen.getByText('Text 1')
    expect(text1Element).toBeInTheDocument()

    const text2Element = screen.getByText('Text 2')
    expect(text2Element).toBeInTheDocument()

    const value1Element = screen.getByText('Value 1')
    expect(value1Element).toBeInTheDocument()

    const value2Element = screen.getByText('Value 2')
    expect(value2Element).toBeInTheDocument()
  })

  test('renders component without value2', () => {
    const propsWithoutValue2: PortfolioProps = {
      ...defaultProps,
      coinChange: undefined,
    }

    render(<PortfolioCard {...propsWithoutValue2} />)

    const text1Element = screen.getByText('Text 1')
    expect(text1Element).toBeInTheDocument()

    const text2Element = screen.getByText('Text 2')
    expect(text2Element).toBeInTheDocument()

    const value1Element = screen.getByText('Value 1')
    expect(value1Element).toBeInTheDocument()

    const value2Element = screen.queryByText('Value 2')
    expect(value2Element).not.toBeInTheDocument()
  })

  describe('PortfolioCardWithcolor', () => {
    const defaultProps2: PortfolioProps = {
      src: 'path/to/image',
      coinName: 'Text 1',
      coinLable: 'Text 2',
      coinPrice: 'Value 1',
      coinChange: '+10',
      height: '100px',
      width: '300px',
    }

    test('renders component with positive value', () => {
      const propsWithPositiveValue: PortfolioProps = {
        ...defaultProps,
        coinChange: '+5',
      }

      render(<PortfolioCard {...propsWithPositiveValue} />)

      const value2Element = screen.getByText('+5')
      expect(value2Element).toBeInTheDocument()
      expect(value2Element).toHaveStyle(
        `color: ${theme.palette.semantic.success[500]}`
      )
    })

    test('renders component with negative value', () => {
      const propsWithNegativeValue: PortfolioProps = {
        ...defaultProps,
        coinChange: '-5',
      }

      render(<PortfolioCard {...propsWithNegativeValue} />)

      const value2Element = screen.getByText('-5')
      expect(value2Element).toBeInTheDocument()
      expect(value2Element).toHaveStyle(
        `color: ${theme.palette.semantic.error[500]}`
      )
    })

    test('renders component with no value2', () => {
      const propsWithoutValue2: PortfolioProps = {
        ...defaultProps,
        coinChange: undefined,
      }

      render(<PortfolioCard {...propsWithoutValue2} />)

      const value2Element = screen.queryByText('Value 2')
      expect(value2Element).not.toBeInTheDocument()
    })
  })
})
