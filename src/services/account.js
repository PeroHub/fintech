import { parseResponse } from "./mixin";
import { getAllUsers } from "../api/user"

class UserAccountManager {
    init(currentUser) {
    }

    getAllUserAccount = async (filter={}) => {
        const response = await getAllUsers(filter)
        return parseResponse(response)
    }
}

export { UserAccountManager };