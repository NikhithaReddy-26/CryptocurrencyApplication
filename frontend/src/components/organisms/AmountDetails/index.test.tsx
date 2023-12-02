import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import AmountDetails from '.';

describe('AmountDetails', () => {
  const onChangeMock = jest.fn();

  const defaultProps = {
    currency: 'BTC',
    price: 3297866.84,
    value: 34000,
    conversionValue: '0.0234510',
    onChange: onChangeMock,
    buttonText: 'Sell max',
  };

  it('renders the component correctly with default props', () => {
    const { getByText } = render(<AmountDetails {...defaultProps} />);
    expect(getByText('Amount details')).toBeInTheDocument();
  });

  it('triggers onChange callback when slider value changes', () => {
    const { getByLabelText } = render(<AmountDetails {...defaultProps} />);
    const slider = getByLabelText('BTC Slider');

    fireEvent.change(slider, { target: { value: 0.5 } });

    expect(onChangeMock).toHaveBeenCalledWith(1648933.42); 
  });

  it('triggers onChange callback when button is clicked', () => {
    const { getByText } = render(<AmountDetails {...defaultProps} />);
    const button = getByText('Sell max');
  
    fireEvent.click(button);
  
    expect(onChangeMock).toHaveBeenCalledWith(1648933.42);
  }); 
   
});
