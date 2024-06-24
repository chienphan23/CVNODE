import axios from "../../../setup/axios"
import Cookies from "js-cookie"

export const apiLogout = async () => {
    try {
        const logout = await axios.delete("/users/deleteToken")
        Cookies.set('access_token', "loggedout", {expires: new Date(Date.now() + 1 * 1000)})
        Cookies.set('refresh_token', "loggedout", {expires: new Date(Date.now() + 1 * 1000)})
        return logout
    } catch (error) {
        return error
    }
}