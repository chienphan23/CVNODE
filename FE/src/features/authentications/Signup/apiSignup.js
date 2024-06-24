import axios from "axios";

export const signupUser = async (email, password, name, passwordConfirm) => {
    try {
        
        const user = await axios.post("http://localhost:3000/api/v1/users/signup", {email, password, name, passwordConfirm})
        return user
    } catch (error) {
        return error
    }
}
