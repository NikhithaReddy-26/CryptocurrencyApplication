import { render, screen, fireEvent } from '@testing-library/react';
import WatchlistBar from '.';

describe('WatchlistBar', () => {
  const defaultProps = {
    coin: 'coin-icon',
    coinName: 'Bitcoin',
    coinType: 'BTC',
    coinRate: '1.5',
    marketCap: '500B',
    vol24H: '10B',
    supply: '18M',
    isChecked:false,
  };

  const defaultProps2 = {
    coin: 'coin-icon',
    coinName: 'Bitcoin',
    coinType: 'BTC',
    coinRate: '1.5',
    marketCap: '500B',
    vol24H: '10B',
    supply: '18M',
    isChecked:true,
  };

  it('renders WatchlistBar component with coin details', () => {
    render(<WatchlistBar {...defaultProps} />);

    const coinNameElement = screen.getByText('Bitcoin');
    expect(coinNameElement).toBeInTheDocument();

    const coinTypeElement = screen.getByText('BTC');
    expect(coinTypeElement).toBeInTheDocument();

    const coinRateElement = screen.getByText('1.5');
    expect(coinRateElement).toBeInTheDocument();

    const marketCapElement = screen.getByText('Market cap');
    expect(marketCapElement).toBeInTheDocument();

    const vol24HElement = screen.getByText('Vol.24H');
    expect(vol24HElement).toBeInTheDocument();

    const supplyElement = screen.getByText('Circulating supply');
    expect(supplyElement).toBeInTheDocument();
  });

  it('renders WatchlistBar component for USD Coin', () => {
    const props = {
      ...defaultProps,
      coinName: 'USD Coin',
      coinType: 'USDC',
      coinRate: '',
      marketCap: '',
      vol24H: '',
      supply: '',
    };
    render(<WatchlistBar {...props} />);

    const coinNameElement = screen.getByText('USD Coin');
    expect(coinNameElement).toBeInTheDocument();

    const coinTypeElement = screen.getByText('USDC');
    expect(coinTypeElement).toBeInTheDocument();

    const cashDepositButton = screen.getByText('CASH DEPOSIT');
    expect(cashDepositButton).toBeInTheDocument();

    const withdrawButton = screen.getByText('WITHDRAWL');
    expect(withdrawButton).toBeInTheDocument();
  });


  it('Change the isChecked prop is false and text has to be changed : Add to Watchlist', () => {
    render(<WatchlistBar {...defaultProps} />);

    expect(defaultProps.isChecked).toBe(false);

    const addToWatchlistButton = screen.getByText('ADD TO WATCHLIST');

    expect(addToWatchlistButton).toBeInTheDocument();
  });

  it('Change the isChecked prop is true and text has to be changed : Added to Watchlist', () => {
    render(<WatchlistBar {...defaultProps2} />);

    expect(defaultProps2.isChecked).toBe(true);

    const addedToWatchlistButton = screen.getByText('ADDED TO WATCHLIST');
    expect(addedToWatchlistButton).toBeInTheDocument();
  });

});