import axios from "../../../setup/axios"

export const apiGetUser = async (id) => {
    try {
        const user = await axios.get(`/users/getUser`)
        return user;
    } catch (error) {
        return error
    }
}
export const apiDetailUserOfPost = async (id) => {
    try {
        const user = await axios.get(`/users/${id}`)
        return user;
    } catch (error) {
        return error
    }
}
export const apiChangeUser = async (id, formData) => {
    try {
        const user = await axios.patch(`/users/${id}`, formData)
        return user;
    } catch (error) {
        return error
    }
}