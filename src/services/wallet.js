import { parseResponse } from "./mixin"
import { createWalletAPI, depositToWalletAPI, getWalletDepositHistoryAPI, getUserWalletAPI, getWalletWithdrawHistoryAPI, withdrawFromWalletAPI } from "../api/wallet"


// export const getUserWallet = async () => {
//   const response = await getUserWalletAPI()
//   return parseResponse(response)
// }

// export const createWallet = async (data) => {
//   const response = await createWalletAPI(data)
//   return parseResponse(response)
// }

class WalletManager {
  init(currentUser) {
  }

  getUserWallet = async () => {
    const response = await getUserWalletAPI()
    return parseResponse(response)
  }

  createWallet = async (data) => {
    const response = await createWalletAPI(data)
    return parseResponse(response)
  }

  depositToWallet = async (data) => {
    const response = await depositToWalletAPI(data)
    return parseResponse(response)
  }

  withdrawFromWallet = async (data) => {
    const response = await withdrawFromWalletAPI(data)
    return parseResponse(response)
  }
  
  getWalletDepositHistory = async (filter) => {
    const response = await getWalletDepositHistoryAPI(filter)
    return parseResponse(response)
  }

  getWalletWithdrawHistory = async (filter) => {
    const response = await getWalletWithdrawHistoryAPI(filter)
    return parseResponse(response)
  }

}



export { WalletManager };