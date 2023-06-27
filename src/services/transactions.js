import { createTransactionAPI, getAllTransactionsAPI,  getSingleTransactionAPI, getUserTransactionsAPI, updateTransactionStatusAPI, getTotalInflow,  getTotalCurrencyInflow } from "../api/transaction"
import { parseFormData, parseResponse } from "./mixin"



class TransactionManager {
  init(currentUser) {
  }

  // Grab all user values form the db
  getUserTransactions = async (callback, filter) => {
    let response = await getUserTransactionsAPI(filter)
    response = parseResponse(response)
    callback(response)
  }


  // Sending data to db convert
  createTransaction = async (data) => {
    // const form = parseFormData(data)
    // form.append('proof', file, file.name)
    const response = await createTransactionAPI(data)
    return parseResponse(response)
  }

  updateStatus = async (data, status) => {
    let response = await updateTransactionStatusAPI(data._id,status)
    response = parseResponse(response)
    return response
  }


  
  getSingleTransaction = async (item, callback) => {
    let response = await getSingleTransactionAPI(item._id)
    response = parseResponse(response)
    callback(response)
  }
  
  // Get all transaction for admin
  getAllTransactions = async (callback, filter) => {
    let response = await getAllTransactionsAPI(filter)
    response = parseResponse(response)
    callback(response)
  }

  getTotalInflow =  async (callback) => {
    let response = await getTotalInflow()
    response = parseResponse(response)
    callback(response)
  }

  //Get all currency inflow
  getTotalCurrencyInflow = async (callback) => {
    let response = await getTotalCurrencyInflow()
    response = parseResponse(response)
    callback(response)
  }
  
  
  downloadProof = async (id) =>{}
}

// Update the current value of dollar
const exchangeValue = 566








export { exchangeValue }
export { TransactionManager }
