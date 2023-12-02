import React from 'react';
import { render, screen } from '@testing-library/react';
import Images from './index';

describe('Images', () => {
  it('renders an image with the correct source, alt text, width, and height', () => {
    const altText = 'cardana image';
    const width = '56px';
    const height = '56px';

    render(<Images src='image' alt={altText} width={width} height={height} />);

    const imageElement = screen.getByAltText(altText);
    expect(imageElement).toBeInTheDocument();
    expect(imageElement).toHaveAttribute('src', 'image');
    expect(imageElement).toHaveAttribute('width', width);
    expect(imageElement).toHaveAttribute('height', height);
  });

  it('invokes the onClick handler when the image is clicked', () => {
    const onClickMock = jest.fn();
    render(<Images src='image' alt="cardana image" width="56px" height="56px" onClick={onClickMock} />);

    const imageElement = screen.getByAltText('cardana image');
    imageElement.click();

  });
});