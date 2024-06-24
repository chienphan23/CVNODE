import axios from "../../setup/axios.js"

const apiCreateNotifications = async (type,idUser, idPost, idOwnerPost) => {
    try {
        const notifications = await axios.post(`http://localhost:3000/api/v1/notifications/createNotification`, {type, from: idUser, to: idOwnerPost, idPost: idPost})
        return notifications;
    } catch (error) {
        return error
    }
}

export {apiCreateNotifications}