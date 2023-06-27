import React, { useContext, useState } from 'react'
import { TransactionManager } from '../services/transactions'
import { useAuth } from './AuthContext'



const TransactionContext = React.createContext()
const transactionManager = new TransactionManager()





export function useTransaction() {
  return useContext(TransactionContext)
}

export function TransactionsProvider({ children }) {
  const {currentUser} = useAuth()
  const [userTransaction, setUserTransaction] = useState([])
  const [allTransaction, setAllTransaction] = useState([])
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  transactionManager.init(currentUser)

  async function createTransaction(transaction) {
    try {
      await transactionManager.createTransaction(transaction)
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  async function updateTransactionStatus(transaction,status) {
    try {
      await transactionManager.updateStatus(transaction,status)
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  async function getUserTransactions(){
    setLoading(true)
    transactionManager.getUserTransactions((data)=>{
      setUserTransaction(data)
      setLoading(false)
    })
  }

  async function getAllTransactions(){
    setLoading(true)
    transactionManager.getAllTransactions((data)=>{
      setAllTransaction(data)
      setLoading(false)
    })
  }

  const value = {
    userTransaction,
    allTransaction,
    error,
    createTransaction,
    updateTransactionStatus,
    getAllTransactions,
    getUserTransactions
  }

  return (
    <TransactionContext.Provider value={value}>
      {!loading && children}
    </TransactionContext.Provider>
  )
}

export {TransactionContext}