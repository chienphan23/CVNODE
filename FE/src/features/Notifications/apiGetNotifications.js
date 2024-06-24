import axios from "../../setup/axios.js"

const apiGetNotifications = async (page) => {
    try {
        // page đại diện cho số bài viết đã được lấy
        const notifications = await axios.get(`http://localhost:3000/api/v1/notifications/getNotifications`)
        return notifications;
    } catch (error) {
        return error
    }
}

export {apiGetNotifications}