import axios from "axios"
import { parseError } from "./mixin"

const ADMIN_URL = '/admin/users/'
const URL = '/user/profile'


export const getAllUsers = async (filter) => {
  try {
    const response = await axios.get(ADMIN_URL, { params: filter, })
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}


export const updateProfileAPI = async (data) => {
  try {
    const response = await axios.put(URL, data, { headers: { 'Content-Type': "multipart/form-data" } })
    if (response.status === 201) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

export const getProfileAPI = async () => {
  try {
    const response = await axios.get(URL)
    if (response.status === 200) {
      return response.data
    }
    return parseError(response)
  } catch (error) {
    return parseError(error)
  }
}

