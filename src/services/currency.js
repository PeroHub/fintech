
import { getCurrenciesAPI, updateExchangeRateAPI } from "../api/currency"
import { parseResponse } from "./mixin"
// import { storage } from "../api/mixin"


class CurrencyManager {


  getCurrencies = async (callback) => {
    let response = await getCurrenciesAPI({ isBase: false })
    response = parseResponse(response)
    callback(response)
  }

  getAllCurrencies = async (callback) => {
    let response = await getCurrenciesAPI()
    response = parseResponse(response)
    callback(response)
  }
  

  
  getBaseCurrency = async (callback) => {
    let response = await getCurrenciesAPI({ isBase: true })
    response = parseResponse(response)
    callback(response[0])
  }

  updateExchangeRate = async (currency, rate) => {
    const response = await updateExchangeRateAPI(currency._id, rate)
    return parseResponse(response)
  }

}

export { CurrencyManager }