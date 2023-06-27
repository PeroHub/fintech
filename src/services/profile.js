import { parseFormData, parseResponse } from "./mixin"
import { getProfileAPI, updateProfileAPI } from '../api/user'
import { storage } from "../api/mixin"


class ProfileManager {

  editProfile = async (data, file) => {
    const form = parseFormData(data)
    if (file) form.append('avatar', file, file.name)
    const response = await updateProfileAPI(form)
    if(response?.fullname){
      storage.writeData(response,'profile')
    }
    return parseResponse(response)
  }

  getProfile = async () => {
    let profile = storage.getData('profile')
    if (profile?.fullname) {
      return profile
    }
    const response = await getProfileAPI()
    if(response?.fullname===200){
      storage.writeData(response,'profile')
    }
    return parseResponse(response)
  }
}



export default ProfileManager