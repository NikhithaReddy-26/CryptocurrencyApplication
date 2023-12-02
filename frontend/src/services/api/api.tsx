import axios from 'axios'
import { BASE_URL, accessToken,userID } from '../../utils/constants'
import { Transaction } from '../../components/organisms/RecentTransactionCards'

export const fetchData = async (endpoint: string) => {
  const url = `${BASE_URL}/${endpoint}`

  try {
    const response = await axios.get(url)
    return response.data
  } catch (error) {
    console.log('Error fetching data:', error)
    throw error
  }
}

export const API_BASE_URL = 'https://bc99be.bootcamp64.tk'

const token = localStorage.getItem('token')

const LoggedUserId = userID

export const authAxios = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${token}`,
  },
})

export const authDashboard = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${accessToken}`,
  },
})

export const fetchCoinData = async () => {
  try {
    if (localStorage.getItem('token')) {
      const coinsResponse = await authAxios.get(`/cryptocurrencies/`)
      return coinsResponse.data
    } else {
      const coinsResponse = await authDashboard.get(`/cryptocurrencies/`)
      return coinsResponse.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const fetchTransactionsData = async () => {
  try {
    if (localStorage.getItem('token')) {
      const transactionsResponse = await authAxios.get(`/wallets/transactions`)
      return transactionsResponse.data
    } else {
      const transactionsResponse = await authDashboard.get(
        `/wallets/transactions`
      )
      return transactionsResponse.data
    }
  } catch (err) {
    console.log(err)
  }
}

export const postTransactionData = async (transactionData: Transaction) => {
  try {
    if (localStorage.getItem('token')) {
      const response = await authAxios.post(
        `/wallets/transactions`,
        transactionData
      )
      return response.data
    } else {
      const response = await authDashboard.post(
        `/wallets/transactions`,
        transactionData
      )
      return response.data
    }
  } catch (error) {
    console.log('Error posting transaction data')
  }
}

export const getUserData = async () => {
  try {
    if(localStorage.getItem('token')){
    const response = await authAxios.get(`/users/${LoggedUserId}`)
    return response.data
    }else{
      const response = await authDashboard.get(`/users/${LoggedUserId}`)
      return response.data
    }
  } catch (error) {
    console.log('Error fetching user data')
  }
}

export const getAllUsers = async () => {
  try {
    if (localStorage.getItem('token')) {
      const response = await authAxios.get(`/users/getAll`)
      return response.data
    } else {
      const response = await authDashboard.get(`/users/getAll`)
      return response.data
    }
  } catch (error) {
    console.log('Error fetching all users')
  }
}

export const getWatchlistForUser = async (userId: number) => {
  try {
    if (localStorage.getItem('token')) {
      const response = await authAxios.get(`/watchlist/user/${LoggedUserId}`)
      return response.data
    } else {
      const response = await authDashboard.get(
        `/watchlist/user/${LoggedUserId}`
      )
      return response.data
    }
  } catch (error) {
    console.error(error)
    console.log('Error fetching watchlist data')
  }
}

export const postWatchlistedData = async (cryptocurrencyId: number) => {
  try {
    if (localStorage.getItem('token')) {
      const response = await authAxios.post(`/watchlist`, {
        userId: LoggedUserId,
        cryptocurrencyId
      })
      return response?.data
    } else {
      const response = await authDashboard.post(`/watchlist`, {
        userId: LoggedUserId,
        cryptocurrencyId
      })
      return response?.data
    }
  } catch (error) {
    console.log('Error posting watchlisted data:', error)
    throw error
  }
}

export const deleteWatchlistedData = async (cryptocurrencyId: number) => {
  try {
    if (localStorage.getItem('token')) {
      const response = await authAxios.delete(
        `/watchlist/${LoggedUserId}/${cryptocurrencyId}`
      )
      return response.data
    } else {
      const response = await authDashboard.delete(
        `/watchlist/${LoggedUserId}/${cryptocurrencyId}`
      )
      return response.data
    }
  } catch (error) {
    console.log('Error deleting watchlisted data:', error)
    throw error
  }
}
