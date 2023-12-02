import BitcoinIcon from '../../public/assets/images/BItcoin.svg'
import CardanaIcon from '../../public/assets/images/cardana.svg'
import EthereumIcon from '../../public/assets/images/Etherum.svg'
import TetherIcon from '../../public/assets/images/Tether.svg'
import PolkadotIcon from '../../public/assets/images/polkadot.svg'
import DogecoinIcon from '../../public/assets/images/dodge-coin.svg'
import XRPIcon from '../../public/assets/images/xrp.svg'
import BinanceIcon from '../../public/assets/images/bitcoin-coin.svg'
import UsdCoinIcon from '../../public/assets/images/usd-coin.svg'
import BitcoinDarkIcon from '../../public/assets/images/bitcoin-darkblue.svg'
import Eth2CoinIcon from '../../public/assets/images/ethereum-2.svg'
import BitcoinDark from '../../public/assets/images/bitcoin-darkblue.svg'
import cardIcon from '../../public/assets/icons/bank-card.svg'
import wallet from '../../public/assets/icons/wallet.svg'
import bitcoinIcon from '../../public/assets/icons/bitcoin.svg'
import SellingIcon from '../../public/assets/icons/Property 1=icons, Property 2=rupee2.svg'
import watchlistBarIcon from '../../public/assets/icons/Property 1=icons, Property 2=rupee1.svg'

interface GraphData {
  id: string
  color: string
  data: { x: string; y: number }[]
}
interface GraphDataMap {
  [key: string]: GraphData[]
}

export const DeliveryMessage: any = {
  DeliveryTime: 'Instant : 2-5 min',
  BitcoinDeliveryFee: 'Transaction fees: 0.001BTC',
  EthereumDeliveryFee: 'Transaction fees: 0.005ETH',
}

export const HeaderButtons: any = {
  BuyButton: 'BUY',
  SellButton: 'SELL',
}

export const SearchWithFilter = {
  SearchPlaceholder: 'Search all assets',
}
export const FooterContent = {
  Dashboard: 'Dashboard',
  Careers: 'Careers',
  Legal: 'Legal & Privacy',
  Copyright: '© 2021 Minet',
  Dropdowntext: 'English',
  ButtonText: 'NEED HELP',
}
export const CRYPTOS = [
  {
    icon: BitcoinIcon,
    title: 'Bitcoin',
    price: '$3,463,069.54',
    symbol: 'BTC',
    label: 'bitcoin',
  },
  {
    icon: EthereumIcon,
    title: 'Ethereum',
    price: '$1,297.93',
    symbol: 'ETH',
    label: 'ethereum',
  },
  {
    icon: BinanceIcon,
    title: 'Binance',
    price: '$30,054.88',
    symbol: 'BNB',
    label: 'binance',
  },
  {
    icon: TetherIcon,
    title: 'Tether',
    price: '$74.21',
    symbol: 'USDT',
    label: 'tether',
  },
  {
    icon: CardanaIcon,
    title: 'Cardano',
    price: '$138.22',
    symbol: 'ADA',
    label: 'cardano',
  },
  {
    icon: XRPIcon,
    title: 'XRP',
    price: '$76.73',
    symbol: 'XRP',
    label: 'xrp',
  },
  {
    icon: DogecoinIcon,
    title: 'Dogecoin',
    price: '$21.37',
    symbol: 'DOGE',
    label: 'dogecoin',
  },
  {
    icon: PolkadotIcon,
    title: 'Polkadot',
    price: '$1,642.39',
    symbol: 'PKD',
    label: 'polkadot',
  },
  {
    icon: UsdCoinIcon,
    title: 'USD Coin',
    price: '$34,006.00',
    symbol: 'USDC',
    label: 'usd',
  },
  {
    icon: Eth2CoinIcon,
    title: 'ETH2 Coin',
    price: '$34,006.00',
    symbol: 'ETH2',
    label: 'eth2',
  },
  {
    icon: BitcoinDark,
    title: 'BTH Coin',
    price: '$34,006.00',
    symbol: 'BNB',
    label: 'bitcoin2',
  },
]
export const paymentcard = {
  paymentcardTitle: 'Choose crypto',
}
export const chipsData = [
  {
    label: 'Bitcoin',
    value: 'bitcoin',
    symbol: 'BTC',
    backgroundColor: '#F7931A33',
  },
  {
    label: 'Ethereum',
    value: 'ethereum',
    symbol: 'ETH',
    backgroundColor: '#627EEA33',
  },
  {
    label: 'XRP',
    value: 'xrp',
    symbol: 'XPR',
    backgroundColor: '#22222233',
  },
  {
    label: 'Polkadot',
    value: 'polkadot',
    backgroundColor: '#E6007A33',
  },
  {
    label: 'Tether',
    value: 'tether',
    backgroundColor: '#26A17B33',
  },
  {
    label: 'Ethereum 2',
    value: 'ethereum-2',
    symbol: 'ETH2',
    backgroundColor: '#19197133',
  },
  {
    label: 'Dodge Coin',
    value: 'dodgecoin',
    backgroundColor: '#DBC98433',
  },
]

export const DeliveryItems = [
  {
    label1: 'Instant',
    label2: '2-5 min',
    infoBitcoin: 'Delivery fees: 0.001BTC',
    infoEthereum: 'Delivery fees: 0.001ETH',
  },
  {
    label1: 'Faster',
    label2: '4 hours',
    infoBitcoin: 'Delivery fees: 0.0001BTC',
    infoEthereum: 'Delivery fees: 0.0001ETH',
  },
  {
    label1: 'Fast',
    label2: '120 hours',
    infoBitcoin: 'Delivery fees: 0.00001BTC',
    infoEthereum: 'Delivery fees: 0.00001ETH',
  },
  { label1: 'None' },
]

export const ButtonNames: any = {
  ADD_TO_WATCHLIST: 'ADD TO WATCHLIST',
  ADDED_TO_WATCHLIST: 'ADDED TO WATCHLIST',
  CASH_DEPOSIT: 'CASH DEPOSIT',
  WITHDRAW: 'WITHDRAWL',
}

export const WatchListBarLabels: any = {
  MarketCap: 'Market cap',
  Vol24H: 'Vol.24H',
  CirculatingSupply: 'Circulating supply',
}

export const OrderSummaryConstants: any = {
  DeliveryFee: 'Delivery fees',
  DepositTo: 'Deposit to',
  TransactionFee: 'transaction fee',
  Total: 'Total',
}

export const Dashboardproperties = {
  totalInvestment: 'Total investment',
  tabs: [
    { label: '1H' },
    { label: '24H' },
    { label: '1W' },
    { label: '1M' },
    { label: '1Y' },
    { label: 'ALL' },
  ],
}

export const EthereumCoinChangePercentage: string = '+2.3'

export const WatchListEthereumData = [
  {
    id: 'ETH',
    color: '',
    data: [
      { x: '2023-06-26', y: 10 },
      { x: '2023-06-27', y: 230 },
      { x: '2023-06-28', y: 225 },
      { x: '2023-06-29', y: 130 },
      { x: '2023-06-30', y: 235 },
      { x: '2023-07-01', y: 250 },
      { x: '2023-07-02', y: 56 },
      { x: '2023-07-03', y: 260 },
    ],
  },
]

export const BitcoinCoinChangePercentage: string = '-2.3'

export const WatchListBitcoinData = [
  {
    id: 'ETH',
    color: '',
    data: [
      { x: '2023-06-26', y: 10 },
      { x: '2023-06-27', y: 230 },
      { x: '2023-06-28', y: 225 },
      { x: '2023-06-29', y: 130 },
      { x: '2023-06-30', y: 235 },
      { x: '2023-07-01', y: 250 },
      { x: '2023-07-02', y: 56 },
      { x: '2023-07-03', y: 260 },
    ],
  },
]

export const SignupScreenDetails = {
  heading: 'Signup to Minet',
  fullNameLabel: 'Full Name',
  emailLabel: 'Email',
  createPasswordLabel: 'Create Password',
  passwordRequirements:
    'A min of 8 characters with at least 1 special character and number included',
  google: 'Google',
  facebook: 'Facebook',
  microsoft: 'Microsoft',
  alreadyHaveAccount: 'Already have an account?',
  login: 'Login',
  emailIsRequired: 'Email is required',
  emailIsInvalid: 'Email is invalid',
  passwordIsRequired: 'Password is required',
  passwordLengthRequirement: 'Password should be at least 8 characters long',
  ariaid: 'password-visibility-toggle',
}

export const LoginScreenDetails = {
  isNotEntered: 'Email is required',
  EnteredValueIsIncorrect: 'Email is invalid',
  isCorrect: ' ',
  isPasswordEntered: 'Password is required',
  isPasswordAccepted: 'Password should be at least 8 characters long',
  heading: 'Login to Minet',
  emailLabel: 'Email',
  emailType: 'email',
  emailPlaceholder: 'you@company.com',
  passwordLabel: 'Password',
  passwordPlaceholder: 'Enter Password',
  ariaId: 'Toggle password visibility',
  ForgotPasswordLabel: 'Forgot Password',
  Divider: 'Or',
  google: 'Google',
  facebook: 'Facebook',
  microsoft: 'Microsoft',
  noAccount: "Don't have an account?",
  signUp: 'Signup',
  signIn: 'Sign In',
}

export const portFolioDataText: string = ' Price Correlation with'
export const portfolioData = [
  {
    src: BitcoinDarkIcon,
    text1: 'Bitcoin',
    text2: 'Moves tightly together',
    value1: '$3,285,553.73',
    value2: '100%',
    width: '370px',
  },
  {
    src: EthereumIcon,
    text1: 'Ethereum',
    text2: 'Moves tightly together',
    value1: '$230,966.85',
    value2: '80%',
    width: '370px',
  },
  {
    src: XRPIcon,
    text1: 'XPR',
    text2: 'Moves tightly together',
    value1: '$60.20',
    value2: '10%',
    width: '370px',
  },
  {
    src: TetherIcon,
    text1: 'Tether',
    text2: 'Moves tightly together',
    value1: '$74.28',
    value2: '2%',
    width: '370px',
  },
  {
    src: DogecoinIcon,
    text1: 'DogeCoin',
    text2: 'Moves tightly together',
    value1: '$3,285,553.73',
    value2: '100%',
    width: '370px',
  },
  {
    src: CardanaIcon,
    text1: 'cardana',
    text2: 'Moves tightly together',
    value1: '$3,285,553.73',
    value2: '100%',
    width: '370px',
  },
  {
    src: UsdCoinIcon,
    text1: 'usd',
    text2: 'Moves tightly together',
    value1: '$3,285,553.73',
    value2: '100%',
    width: '370px',
  },
  {
    src: BinanceIcon,
    text1: 'binance',
    text2: 'Moves tightly together',
    value1: '$3,285,553.73',
    value2: '100%',
    width: '370px',
  },
]

export const BASE_URL = process.env.REACT_APP_BASE_URL

export const cryptoOverviewProperties = {
  currentValue: 'Current Value',
  bitcoinGraphData: [
    {
      id: 'BTC',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 10 },
        { x: '2023-06-27', y: 230 },
        { x: '2023-06-28', y: 225 },
        { x: '2023-06-29', y: 130 },
        { x: '2023-06-30', y: 235 },
        { x: '2023-07-01', y: 250 },
        { x: '2023-07-02', y: 56 },
        { x: '2023-07-03', y: 260 },
      ],
    },
  ],
}

export const WalletDetails = {
  tabs: [
    {
      label: 'Overview',
      value: 'Overview',
    },
    {
      label: 'Wallet',
      value: 'Wallet',
    },
  ],
  HeaderName: 'Trade',
  state: 'Overview',
  selectedCoin: 'Bitcoin',
  OverviewTab: 'Overview',
  WalletTab: 'Wallet',
  TotalBalance: 'Total Balance',
  dropdownText: '1M',
  CoinStatus: 'Purchased',
  bitcoinInfo:
    'The world’s first cryptocurrency, Bitcoin is stored and exchanged securely on the internet through a digital ledger known as a blockchain. Bitcoins are divisible into smaller units known as satoshis each satoshi is worth 0.00000001 bitcoin.',
  resources: 'Resources',
  officialWebsite: 'Official Website',
  whitePaper: 'White Paper',
}

export const WatchlistBarData = {
  coin: watchlistBarIcon,
  coinName: 'USD Coin',
  coinType: 'Cash',
}

export const PurchaseDetails = {
  HeaderName: 'Checkout',
  CardName: 'Buy Crypto',
}

export const DEFAULT_CRYPTO = 'bitcoin'

export const PaymentCardDetails = {
  Title: 'PaymentMethod',
  Heading1: 'USD Coin(Cash)',
  Description: 'Total Balance - $',
  OtherText: 'Default',
}
export const OrderSummaryDetails = {
  OrderType: 'You are buying',
  PaymentIcon: cardIcon,
  PaymentMethod: 'Payment method',
  PaymentMethodType: 'visa card ....4567',
  DepositIcon: wallet,
  DepositTo: 'Wallet',
}
export const ButtonTexts = {
  BuyMax: 'Buy max',
  BuyNow: 'BUY NOW',
  SellMax: 'Sell max',
  SellNow: 'SELL NOW',
}

export const resetDetails = {
  topContent: 'Password reset successful',
  bottomContent: 'Click on button below to proceed to login',
}
export const ForgotPasswordDetails = {
  bottomContent: 'Login',
  topContent: 'Back to',
  resetLink: 'Send Reset Link',
  resetPassword: 'Reset Password',
  numberPlaceholder: '8 digits code',
  emailPlaceholder: 'you@company.com',
  numberLabel: 'Reset code',
  EmailLabel: 'Email',
  Heading: 'Forgot Password',
  textfieldTypeNumber: 'number',
  textfieldTypeEmail: 'email',
}

export const PaymentSuccessfulScreenDetails = {
  newEntryName: 'John Smith',
  PurchasePrice: 100,
  increasePrice: 100,
  PurchaseMessage:
    'Purchase is completed,please check your balance in your crypto wallet',
  SellMessage: 'Sell is completed,please check your balance in your Rupee coin',
}

export const ResetPasswordDetails = {
  validationContent:
    'A minimum of 8 characters with at least 1 special character and number included ',
  ResetPasswordButton: 'Reset Password',
  passwordlength: 'A minimum of 8 characters required.',
  passwordNumber: 'At least 1 number required.',
  message: 'At least 1 special character required.',
  PasswordsDoNotMatch: 'Passwords do not match.',
}

export const authCredentials = {
  domain: 'dev-bnkxb7wvxim0dbxs.us.auth0.com',
  clientId: '3BG53nj558viOFABfupkfhUcD9B3QPEK',
}

export const graphData: GraphDataMap = {
  BTC: [
    {
      id: 'BTC',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 100 },
        { x: '2023-06-27', y: 230 },
        { x: '2023-06-28', y: 225 },
        { x: '2023-06-29', y: 130 },
        { x: '2023-06-30', y: 235 },
        { x: '2023-07-01', y: 250 },
        { x: '2023-07-02', y: 56 },
        { x: '2023-07-03', y: 300 },
      ],
    },
  ],
  ETH: [
    {
      id: 'ETH',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 50 },
        { x: '2023-06-27', y: 230 },
        { x: '2023-06-28', y: 180 },
        { x: '2023-06-29', y: 130 },
        { x: '2023-06-30', y: 220 },
        { x: '2023-07-01', y: 300 },
        { x: '2023-07-02', y: 56 },
        { x: '2023-07-03', y: 260 },
      ],
    },
  ],
  ETH2: [
    {
      id: 'ETH2',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 20 },
        { x: '2023-06-27', y: 130 },
        { x: '2023-06-28', y: 185 },
        { x: '2023-06-29', y: 100 },
        { x: '2023-06-30', y: 210 },
        { x: '2023-07-01', y: 270 },
        { x: '2023-07-02', y: 70 },
        { x: '2023-07-03', y: 250 },
      ],
    },
  ],
  USDT: [
    {
      id: 'USDT',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 15 },
        { x: '2023-06-27', y: 80 },
        { x: '2023-06-28', y: 110 },
        { x: '2023-06-29', y: 90 },
        { x: '2023-06-30', y: 150 },
        { x: '2023-07-01', y: 120 },
        { x: '2023-07-02', y: 30 },
        { x: '2023-07-03', y: 140 },
      ],
    },
  ],
  BNB: [
    {
      id: 'BNB',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 25 },
        { x: '2023-06-27', y: 150 },
        { x: '2023-06-28', y: 130 },
        { x: '2023-06-29', y: 80 },
        { x: '2023-06-30', y: 100 },
        { x: '2023-07-01', y: 110 },
        { x: '2023-07-02', y: 40 },
        { x: '2023-07-03', y: 120 },
      ],
    },
  ],
  ADA: [
    {
      id: 'ADA',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 30 },
        { x: '2023-06-27', y: 120 },
        { x: '2023-06-28', y: 90 },
        { x: '2023-06-29', y: 70 },
        { x: '2023-06-30', y: 80 },
        { x: '2023-07-01', y: 100 },
        { x: '2023-07-02', y: 25 },
        { x: '2023-07-03', y: 110 },
      ],
    },
  ],
  XRP: [
    {
      id: 'XRP',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 5 },
        { x: '2023-06-27', y: 60 },
        { x: '2023-06-28', y: 50 },
        { x: '2023-06-29', y: 40 },
        { x: '2023-06-30', y: 70 },
        { x: '2023-07-01', y: 30 },
        { x: '2023-07-02', y: 10 },
        { x: '2023-07-03', y: 80 },
      ],
    },
  ],
  DOGE: [
    {
      id: 'DOGE',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 8 },
        { x: '2023-06-27', y: 40 },
        { x: '2023-06-28', y: 60 },
        { x: '2023-06-29', y: 30 },
        { x: '2023-06-30', y: 50 },
        { x: '2023-07-01', y: 25 },
        { x: '2023-07-02', y: 12 },
        { x: '2023-07-03', y: 70 },
      ],
    },
  ],
  USDC: [
    {
      id: 'USDC',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 12 },
        { x: '2023-06-27', y: 70 },
        { x: '2023-06-28', y: 80 },
        { x: '2023-06-29', y: 50 },
        { x: '2023-06-30', y: 60 },
        { x: '2023-07-01', y: 40 },
        { x: '2023-07-02', y: 15 },
        { x: '2023-07-03', y: 90 },
      ],
    },
  ],
  BIN: [
    {
      id: 'BIN',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 18 },
        { x: '2023-06-27', y: 90 },
        { x: '2023-06-28', y: 70 },
        { x: '2023-06-29', y: 45 },
        { x: '2023-06-30', y: 55 },
        { x: '2023-07-01', y: 35 },
        { x: '2023-07-02', y: 20 },
        { x: '2023-07-03', y: 100 },
      ],
    },
  ],
  PKD: [
    {
      id: 'PKD',
      color: '#FFA74F',
      data: [
        { x: '2023-06-26', y: 7 },
        { x: '2023-06-27', y: 50 },
        { x: '2023-06-28', y: 40 },
        { x: '2023-06-29', y: 25 },
        { x: '2023-06-30', y: 30 },
        { x: '2023-07-01', y: 20 },
        { x: '2023-07-02', y: 8 },
        { x: '2023-07-03', y: 60 },
      ],
    },
  ],
}

export const SellDetails = {
  HeaderName: 'Checkout',
  CardName: 'Sell Crypto',
}
export const AmountDetaisConstants = {
  Currency: 'USD coin (cash)',
}
export const OrderDetails = {
  OrderType: 'You are selling',
  PaymentIcon: bitcoinIcon,
  PaymentMethod: 'Payment through',
  PaymentMethodType: 'Bitcoin Wallet',
  DepositIcon: SellingIcon,
  DepositTo: 'Rupee Coin',
}
export const TotalBalanceConst = {
  title: 'Total Balance',
  amount: {
    bitcoin: 0.023451,
    ethereum: 0.523451,
  },
}

export const DashBoardConstants = {
  PortFolioValues: 'My Portfolio Values',
  FooterRight: '10 coins(2 active)',
  FooterLeft: 'Click on currency name below to display it on the graph',
  MyWallets: 'My Wallets',
  TotalInvestmentChange: '+1.32',
  TotalInvestmentValue: '$13,23,459',
  BalanceHeading: 'USD Coin',
  BalanceDescripton: 'US Dollar',
  TotalBalance: 'Total balance',
  TotalBalnceAmount: '$34,000',
}

export const accessToken =
  'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJiZW5odXIuaGFycmlzb25AemVtb3NvbGFicy5jb20iLCJpYXQiOjE2OTIyNDk0ODJ9.u75QjbDRC5MBJ0dgYg8JmmYhCpRlcv8cUvyao9b4Vjk'
export const userID = 8
