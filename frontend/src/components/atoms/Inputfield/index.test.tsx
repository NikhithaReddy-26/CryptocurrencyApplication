import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { CustomTextField } from '.';
import { ThemeProvider } from '@mui/material';
import theme from '../../../utils/themes';

describe('CustomTextField', () => {
  it('renders the text field with the correct label', () => {
    const label = 'Text Field';
    render(
      <ThemeProvider theme={theme}>
        <CustomTextField label={label} />
      </ThemeProvider>
    );
    const textField = screen.getByLabelText(label);
    expect(textField).toBeInTheDocument();
  });

  it('invokes the onChange handler when the value changes', () => {
    const onChangeMock = jest.fn();
    render(
      <ThemeProvider theme={theme}>
        <CustomTextField label="Text Field" onChange={onChangeMock} />
      </ThemeProvider>
    );
    const textField = screen.getByLabelText('Text Field');

    fireEvent.change(textField, { target: { value: 'Hello World' } });
    expect(onChangeMock).toHaveBeenCalledTimes(1);
    expect(textField).toHaveValue('Hello World');

    fireEvent.change(textField, { target: { value: 'Testing' } });
    expect(onChangeMock).toHaveBeenCalledTimes(2);
    expect(textField).toHaveValue('Testing');
  });

  it('renders the text field with an error message', () => {
    const errorMessage = 'Invalid input';
    render(
      <ThemeProvider theme={theme}>
        <CustomTextField label="Text Field" error errorMessage={errorMessage} />
      </ThemeProvider>
    );
    const errorText = screen.getByText(errorMessage);
    expect(errorText).toBeInTheDocument();
  });

});