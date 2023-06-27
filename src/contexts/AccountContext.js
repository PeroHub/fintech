import React, { useContext, useState, useEffect } from 'react'
import { AccountManager } from '../services/users'
import { useAuth } from './AuthContext'



const AccountContext = React.createContext()
const accountManager = new AccountManager()





export function useAccount() {
  return useContext(AccountContext)
}

export function AccountsProvider({ children }) {
  const {currentUser} = useAuth()
  const [accounts, setAccount] = useState([])
  const [loading, setLoading] = useState(true)

  const [error, setError] = useState('')

  //const accountManager = new AccountManager(currentUser)
  accountManager.init(currentUser)

  async function addAccount(data) {
    try {
      await accountManager.addAccount(data)
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  async function editAccount(data) {
    try {
      await accountManager.editAccount(data)
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  async function removeAccount(data) {
    try {
      await accountManager.removeAccount(data)
      return true
    } catch (e) {
      setError(e.message)
      return false
    }
  }

  useEffect(() => {
    const getter = accountManager.getAccounts((data) => {
      setAccount(data)
      setLoading(false)
    })

    return getter
  }, [currentUser])

  const value = {
    accounts,
    error,
    addAccount,
    removeAccount,
    editAccount
  }

  return (
    <AccountContext.Provider value={value}>
      {!loading && children}
    </AccountContext.Provider>
  )
}

export {AccountContext}