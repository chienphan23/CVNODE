// import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "../../../setup/axios";
// import { useNavigate } from "react-router-dom";

export const apiLogin = async (email, password) => {
    try {
        const token = await axios.post("/users/login", {email, password})
        console.log(token.data.message)
        
        return token;
    } catch (error) {
        return error;
    }
}
export const handleExpireAccessToken = async () => {
    try {
        const token = await axios.post("/users/refreshToken")
        return token;
    } catch (error) {
        return error;
    }
}
export const handleCheckTokenExists = async () => {
    try {
        const result = await axios.get("/users/checkTokenExists")
        return result;
    } catch (error) {
        return error;
    }
}

