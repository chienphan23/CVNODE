import axios from "../../setup/axios"

export const searchUsers = async (name) => {
    try {
        const users = await axios.post("/users/searchUser", {name})
        return users.data;
    } catch (error) {
        return error;
    }
}