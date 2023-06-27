import { createAccountAPI, createPaymentAccountAPI, deleteAccountAPI, getAccountsAPI, getPaymentAccountsAPI } from "../api/account"
import { databaseDb } from "../firebase"
import { parseResponse } from "./mixin"


class AccountManager {

  init(currentUser) {
    this.dbPath = `accounts/${currentUser?.uid}`
  }

  addAccount = async (data) => {
    const response = await createAccountAPI(data)
    return parseResponse(response)
  }

  addPaymentAccount = async (data) => {
    const response = await createPaymentAccountAPI(data)
    return parseResponse(response)
  }

  removeAccount = async (data) => {
    const response = await deleteAccountAPI(data)
    return parseResponse(response)
  }

  editAccount = (data) => {
    databaseDb.ref(this.dbPath).child(data.key).update({ ...data })
  }

  getAccounts = async (callback, filter) => {
    let response = await getAccountsAPI(filter)
    response = parseResponse(response)
    callback(response)
  }


  getPaymentAccount = async (mode, currency, callback) => {
    const filter = mode === 'bank' ? { type: mode, currency: currency._id } : { type: mode }
    let response = await getPaymentAccountsAPI(filter)
    response = parseResponse(response)
    callback(response[0])

    // const account = [
    //   { accountCurrency: 'USD', bankNumber: '2939929991', accountName: 'Future Pay ' + currency?.name, city: 'New York', recipientBank: 'Access Bank New York' },
    //   { accountCurrency: 'PAY', bankNumber: '2939929991', accountName: 'futurepay@mail.com ', city: 'Zurich', recipientBank: 'Access Bank Swiss' },
    //   { accountCurrency: 'NGN', bankNumber: '2939929991', accountName: 'Future Pay ' + currency?.name, city: 'Uyo', recipientBank: 'Access Bank Nigeria' },
    //   { accountCurrency: 'GBP', bankNumber: '2939929991', accountName: 'Future Pay ' + currency?.name, city: 'London', recipientBank: 'Access Bank London' },
    // ].find((item) => currency?.name === item.accountCurrency)
    // callback(account)
  }


}

export { AccountManager }