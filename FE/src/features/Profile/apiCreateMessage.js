import axios from "../../setup/axios"

export const createMessage = async (messageText, from, to, conversation) => {
    try {
        console.log("alo")
        const message = await axios.post("/chatBox/createMessage", {messageText, from, to, conversation})
        return message.data;
    } catch (error) {
        return error;
    }
}
export const createImagesMessage = async (formData) => {
    try {
        formData.forEach((value, key) => {
            console.log(`${key}: ${value}`);
          });
        const message = await axios.post("/chatBox/createMessageImages", formData)
        return message.data;
    } catch (error) {
        return error;
    }
}

export const getMessage = async (conversation, pageParam) => {
    try {
        const message = await axios.get(`/chatBox/getMessage?conversation=${conversation}&pageParam=${pageParam}`)
        return message.data;
    } catch (error) {
        return error;
    }
}