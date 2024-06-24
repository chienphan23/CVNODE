import axios from "../../setup/axios"

export const getAllConversation = async (idUser) => {
    try {
        const conversation = await axios.post("/chatBox/getAllConversation", {user1: idUser})
        return conversation.data;
    } catch (error) {
        return error;
    }
}

export const getOneConversation = async (idUserCurrent, idUserTo) => {
    try {
        const conversation = await axios.post("/chatBox/getOneConversation", {user1: idUserCurrent, user2: idUserTo})
        console.log(conversation)
        return conversation.data;
    } catch (error) {
        return error;
    }
}