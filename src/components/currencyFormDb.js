import { CurrencyManager } from '../services/currency'

const currencyManager = new CurrencyManager()

export const currency = async () => {
    let result
   await currencyManager.getAllCurrencies(res => {
    //    console.log(res)
       result =  res
   })

   return result
   
}