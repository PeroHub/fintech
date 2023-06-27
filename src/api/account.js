import axios from "axios"
import { parseError,storage } from "./mixin"

const URL = '/user/account/'
const ADMIN_URL = '/admin/account/'


export const getAccountsAPI = async (filter) => {

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

export const getPaymentAccountsAPI = async (filter) => {
  const key = `paymentAccount/${JSON.stringify(filter)}`
  const data  =  storage.getData(key)
  if(data){ 
    return data
  }
  try {
    const response = await axios.get(`${URL}payment`, { params: filter, })
    if (response.status === 200) {
      storage.writeData(response.data,key)
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const createAccountAPI = async (data) => {
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

export const createPaymentAccountAPI = async (data) => {
  try {
    const response = await axios.post(`${ADMIN_URL}payment`, data)
    if (response.status === 201) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const deleteAccountAPI = async (data) => {
  try {
    const response = await axios.delete(`${URL}${data?._id}`, data)
    if (response.status === 204) {        
      return true
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const deletePaymentAccountAPI = async (data) => {
  try {
    const response = await axios.delete(`${ADMIN_URL}payment/${data?._id}`, data)
    if (response.status === 204) {        
      return true
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}