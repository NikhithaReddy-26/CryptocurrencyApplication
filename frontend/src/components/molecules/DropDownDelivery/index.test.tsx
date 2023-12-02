import React from 'react';
import { render } from '@testing-library/react';
import DropDownBox from './index';

test('renders with Bitcoin coin and isOpen prop', () => {
  const { getByText } = render(<DropDownBox coin="Bitcoin" isOpen={true} />);
  const instantText = getByText('Instant : 2-5 min');
  const transactionText = getByText('Transaction fees: 0.001BTC');

  expect(instantText).toBeInTheDocument();
  expect(transactionText).toBeInTheDocument();
});

test('renders with Ethereum coin and isOpen prop', () => {
  const { getByText } = render(<DropDownBox coin="Ethereum" isOpen={false} />);
  const instantText = getByText('Instant : 2-5 min');
  const transactionText = getByText('Transaction fees: 0.005ETH');

  expect(instantText).toBeInTheDocument();
  expect(transactionText).toBeInTheDocument();
});