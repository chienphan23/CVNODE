import axios from "axios"
import { useNavigate } from "react-router-dom"

const RefreshToken = async (access_token) => {
    try {
        const newAccessToken = await axios.post("http://localhost:3000/api/v1/users/refreshToken", {access_token})
        console.log("this is re")
        return newAccessToken
    } catch (error) {
        return error
    }
}
export {RefreshToken}