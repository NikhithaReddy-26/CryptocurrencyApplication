import React from 'react';
import { render } from '@testing-library/react';
import CorrelationCard from './index';

describe('CorrelationCard', () => {
  it('renders without errors', () => {
    render(<CorrelationCard />);
  });
});
