import axios from "axios"

export const resetPassword = async (tokenReset, password, passwordConfirm) => {
    try {
        const result = await axios.post(`http://localhost:3000/api/v1/users/resetPassword/${tokenReset}`, {password, passwordConfirm})
        return result
    } catch (error) {
        return error
    }
}