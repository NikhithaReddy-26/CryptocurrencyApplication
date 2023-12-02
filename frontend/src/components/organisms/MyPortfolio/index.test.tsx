import { render, screen } from '@testing-library/react'
import MyPortFolio from './index'
import '@testing-library/jest-dom/extend-expect'

jest.mock('@nivo/line', () => ({
  ResponsiveLine: () => <div data-testid="mocked-responsive-line" />,
}))

test('renders MyPortFolio component', () => {
  render(<MyPortFolio coin={'bitcoin'} coinChangePercentage={'+5.21'} totalInvestmentChangePercentage={'+5.21'} totalInvestmentValue={'45646'} coinValue={'123'} page={'graph'} graphValue={'BTC'}  />);
  expect(screen.getByTestId('myportfolio')).toBeInTheDocument();
});

test('renders MyPortFolio component', () => {
  render(<MyPortFolio coin={'bitcoin'} coinChangePercentage={'-5.21'} totalInvestmentChangePercentage={'-5.21'} totalInvestmentValue={'45646'} coinValue={'123'} page={'landing'} graphValue={'BTC'}  />);
  expect(screen.getByTestId('myportfolio')).toBeInTheDocument();
});