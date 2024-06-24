import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    idUser: "",
    email: "",
    avatar: "",
    followers: 0,
    following: 0,
    gender: true,
    name: "",
    posts: []
}
const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        userLogin(state, action){
            state.idUser = action.payload.idUser
            // state.email = action.payload.email
            // state.avatar = action.payload.avatar
            // state.followers = action.payload.followers
            // state.following = action.payload.following
            // state.gender = action.payload.gender
            // state.name = action.payload.name
            // state.posts = action.payload.posts
        },
      
    }
})
export const {userLogin} = userSlice.actions
export default userSlice.reducer