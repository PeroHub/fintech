import axios from "axios"
import { parseError } from "./mixin"

const URL = '/user/transaction/'
const ADMIN_URL = '/admin/transaction/'


export const getUserTransactionsAPI = async (filter) => {
  try {
    const response = await axios.get(URL, { params: filter, })
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const getAllTransactionsAPI = async (filter) => {
  try {
    const response = await axios.get(ADMIN_URL, { params: filter, })
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}


export const getTotalInflow = async () => {

  const url = 'stats'
  const currencyUrl =  ADMIN_URL + url
  
  try {
    const response = await axios.get(currencyUrl)
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const getTotalCurrencyInflow = async () => {

  const url = 'stats/total'
  const currencyUrl =  ADMIN_URL + url
  
  try {
    const response = await axios.get(currencyUrl)
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}


export const getSingleTransactionAPI = async (id) => {
  try {
    const response = await axios.get(ADMIN_URL + id)
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}


export const createTransactionAPI = async (data) => {
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

export const updateTransactionStatusAPI = async (id, status) => {
  try {
    const response = await axios.put(`${ADMIN_URL}${id}`, { status: status })
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}