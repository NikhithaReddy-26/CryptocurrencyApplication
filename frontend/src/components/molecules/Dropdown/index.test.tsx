import React from 'react';
import { render, screen } from '@testing-library/react';
import { Dropdown, DropdownProps } from './index';

describe('Dropdown', () => {
  const defaultProps: DropdownProps = {
    text: 'Dropdown',
    height: '2.5rem',
    width: '10rem',
    variant: 'b1',
  };

  it('renders the Dropdown component with default props', () => {
    render(<Dropdown {...defaultProps} />);
    const dropdownText = screen.getByText('Dropdown');
    expect(dropdownText).toBeInTheDocument();
  });

  it('renders the Dropdown component with variant B2', () => {
    const variantB2Props: DropdownProps = {
      ...defaultProps,
      variant: 'b2',
    };
    render(<Dropdown {...variantB2Props} />);
    const dropdownText = screen.getByText('Dropdown');
    expect(dropdownText).toBeInTheDocument();
  });

  
  
});
