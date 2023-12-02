import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { CustomSlider } from '.';

describe('CustomSlider', () => {
  it('renders with default props', () => {
    render(<CustomSlider />);
    const slider = screen.getByRole('slider');
    expect(slider).toBeInTheDocument();
  });

  it('renders with specified orientation', () => {
    render(<CustomSlider orientation="vertical" />);
    const slider = screen.getByRole('slider');
    expect(slider).toHaveStyle({ height: '100%' });
  });

  it('calls onChange callback when slider value changes', () => {
    const onChangeMock = jest.fn();
    render(<CustomSlider onChange={onChangeMock} />);
    const slider = screen.getByRole('slider');
    userEvent.click(slider);
    expect(onChangeMock).toHaveBeenCalled();
  });
});

