import axios from "../../setup/axios"

export const apiGetUserOfPost = async (id) => {
    try {
        const user = await axios.get(`/user?id=${id}`)
        return user;
    } catch (error) {
        console.log(error)
        return error
    }
}
