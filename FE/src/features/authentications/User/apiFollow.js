import axios from "../../../setup/axios"

export const apiFollowUser = async (idUser) => {
    try {
        const user = await axios.patch('/users/followUser', {idUser})
        return user
    } catch (error) {
        return error
    }
}
export const apiUnFollowUser = async (idUser) => {
    try {
        const user = await axios.post('/users/followUser', {idUser})
        return user
    } catch (error) {
        return error
    }
}