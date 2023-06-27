import axios from "axios"
import { parseError, storage } from "./mixin"
const URL = 'https://futurepay-backend.onrender.com/currency'
const ADMIN_URL = 'https://futurepay-backend.onrender.com/admin/currency/'


export const getCurrenciesAPI = async (filter) => {
  const key = filter ? JSON.stringify(filter) : "default"
  const data  =  storage.getData(key)
  if(data){ 
    return data
  }
  try {
    const response = await axios.get(URL, { params: filter, })
    if (response.status === 200) {
      storage.writeData(response.data,key)
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}


export const createCurrencyAPI = async (data) => {
  try {
    const response = await axios.post(ADMIN_URL, data)
    if (response.status === 201) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}


export const deleteCurrencyAPI = async (data) => {
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

export const updateExchangeRateAPI = async (id, rate) => {
  try {
    const response = await axios.put(`${ADMIN_URL}${id}`, { toBase: rate })
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}
