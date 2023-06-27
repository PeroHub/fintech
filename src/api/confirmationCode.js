import axios from "axios"
import { parseError, storage } from "./mixin"
const BASE_URL = "https://nodepay.herokuapp.com/user/transaction/placeholder";


export const GetBankCode = async() => {
    try {
        const response = await axios.get(`${BASE_URL}?type=bank`)
        if(response.status === 200){
            return response
        }
        return parseError(response)
    } catch (error) {
        return parseError(error)
    }

}

export const GetPayoneerCode = async() => {
    try {
        const response = await axios.get(`${BASE_URL}?type=web`)
        if(response.status === 200){
            return response
        }
        return parseError(response)
    } catch (error) {
        return parseError(error)
    }

}