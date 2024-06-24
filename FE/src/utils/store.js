import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../features/authentications/userSlice";
import searchSlice from "../features/Search/searchSlice";
const store = configureStore({
    reducer: {
        user: userSlice,
        search: searchSlice
    }
})
export default store