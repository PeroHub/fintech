import axios from "axios"
import { parseError } from "./mixin"

const URL = '/user/wallet'

export const getUserWalletAPI = async () => {
  try {
    const response = await axios.get(URL)
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}


export const createWalletAPI = async (data) => {
  try {
    const response = await axios.post(URL, data)
    if (response.status === 201) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const depositToWalletAPI = async (data) => {
  try {
    const response = await axios.post(`${URL}/deposit/flutterwave`, data)
    if (response.status === 201) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const getWalletDepositHistoryAPI = async (filter = {}) => {
  try {
    const response = await axios.get(`${URL}/deposit/flutterwave`, { params: filter })
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const withdrawFromWalletAPI = async (data) => {
  try {
    const response = await axios.post(`${URL}/withdraw`, data)
    if (response.status === 201) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}



export const getWalletWithdrawHistoryAPI = async (filter = {}) => {
  try {
    const response = await axios.get(`${URL}/withdraw`, { params: filter })
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}


