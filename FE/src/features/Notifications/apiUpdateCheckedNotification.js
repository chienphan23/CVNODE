import axios from "../../setup/axios.js"

const apiUpdateCheckedNotifications = async (to) => {
    try {
        // page đại diện cho số bài viết đã được lấy
        const notifications = await axios.post(`http://localhost:3000/api/v1/notifications/updateCheckedNotifications`, {to})
        return notifications;
    } catch (error) {
        return error
    }
}

export {apiUpdateCheckedNotifications}