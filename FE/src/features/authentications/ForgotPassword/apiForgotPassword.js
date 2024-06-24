import axios from "axios"

export const forgotPassword = async (email) => {
    try {
        const token = await axios.post("http://localhost:3000/api/v1/users/forgotPassword", {email})
        return token
    } catch (e) {
        return e;
    }
}