import React from 'react';
import { render } from '@testing-library/react';
import {TotalBalance} from '.';
import bitcoin from '../../../../public/assets/images/BItcoin.svg';

test('renders TotalBalance component with props', () => {
  const { getByText, getByAltText } = render(
    <TotalBalance
      title="Total Balance"
      heading="Bitcoin"
      amount="0.0234510 BTC"
      src={bitcoin}
    />
  );

  expect(getByText('Total Balance')).toBeInTheDocument();
  expect(getByText('Bitcoin')).toBeInTheDocument();
  expect(getByText('0.0234510 BTC')).toBeInTheDocument();

  const image = getByAltText('Icon');
  expect(image).toBeInTheDocument();
});
