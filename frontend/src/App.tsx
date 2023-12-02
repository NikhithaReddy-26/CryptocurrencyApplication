import { ThemeProvider } from '@mui/material'
import './styles.css'
import theme from './utils/themes'
import { Login } from './components/pages/Login'
import { Signup } from './components/pages/SignUp'
import { ForgotPassword } from './components/pages/ForgotPassword'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import WalletScreen from './components/pages/walletScreen'
import { useAuth0 } from '@auth0/auth0-react'
import DashboardPage from './components/pages/Dashboard'
import TradeScreen from './components/pages/TradeScreen'
import { PurchaseScreen } from './components/pages/PurchaseScreen'
import { PaymentSuccessfulScreen } from './components/pages/PaymentSuccessfulScreen'
import { SellScreen } from './components/pages/SellScreen'
import { WalletCashScreen } from './components/pages/WalletCashScreen'
export const App = () => {
  const { isAuthenticated } = useAuth0()
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route
            path="/"
            element={isAuthenticated ? <DashboardPage /> : <Login />}
          />
          <Route
            path="/signup"
            element={isAuthenticated ? <DashboardPage /> : <Signup />}
          />
          <Route path="/forgotpassword" element={<ForgotPassword />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/trade/:tab" element={<TradeScreen />} />
          <Route path="/details/:tab" element={<WalletScreen />} />
          <Route path="/purchase" element={<PurchaseScreen />} />
          <Route path="/sell" element={<SellScreen />} />
          <Route path="/payments" element={<PaymentSuccessfulScreen />} />
          <Route path="/walletCash" element={<WalletCashScreen />} />
        </Routes>
      </ThemeProvider>
    </Router>
  )
}
