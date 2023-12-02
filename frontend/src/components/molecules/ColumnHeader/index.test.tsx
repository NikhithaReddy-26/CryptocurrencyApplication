import React from 'react';
import { render } from '@testing-library/react';
import ColumnHeader from '.';

describe('ColumnHeader', () => {
  const headerProps = {
    name: 'Name',
    price: 'Price',
    change: 'Change',
    marketCap: 'MarketCap',
  };

  test('renders all header values correctly', () => {
    const { getByText } = render(<ColumnHeader {...headerProps} />);

    expect(getByText(headerProps.name)).toBeInTheDocument();
    expect(getByText(headerProps.price)).toBeInTheDocument();
    expect(getByText(headerProps.change)).toBeInTheDocument();
    expect(getByText(headerProps.marketCap)).toBeInTheDocument();
  });

  test('renders Watch text', () => {
    const { getByText } = render(<ColumnHeader {...headerProps} />);

    expect(getByText('Watch')).toBeInTheDocument();
  });
});
