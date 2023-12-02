import { render } from '@testing-library/react';
import OrderSummary from './';

describe('OrderSummary', () => {
  it('renders without error', () => {
    render(
      <OrderSummary
        OrderType="Order Type"
        OrderValue="Order Value"
        CoinValue="Coin Value"
        PaymentMethodIcon="Payment Method Icon"
        PaymentMethod="Payment Method"
        PaymentMethodType="Payment Method Type"
        DeliveryFee="Delivery Fee"
        DepositTypeIcon="Deposit Type Icon"
        DepositTo="Deposit To"
        CoinOrderValue="Coin Order Value"
        CostOrderValue="Cost Order Value"
        TransactionFee="Transaction Fee"
        Total="Total" 
        ButtonChildren="BUY NOW" />
    );
  });

  it('renders without error', () => {
    render(
      <OrderSummary
        OrderType="Order Type"
        OrderValue="Order Value"
        CoinValue="Coin Value"
        PaymentMethodIcon="Payment Method Icon"
        PaymentMethod="Payment Method"
        PaymentMethodType="Payment Method Type"
        DeliveryFee="Delivery Fee"
        DepositTypeIcon="Deposit Type Icon"
        DepositTo="Deposit To"
        CoinOrderValue="Coin Order Value"
        CostOrderValue="Cost Order Value"
        TransactionFee="Transaction Fee"
        Total="Total" 
        ButtonChildren="SELL NOW" />
    );
  });
});
