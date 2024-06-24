import { createSlice } from "@reduxjs/toolkit";


const initialState = {
    nameSearch: "",
    resultSearch: []
}
const searchSlice = createSlice({
    name: 'searchSlice',
    initialState,
    reducers: {
        updateSearch(state, action){
            state.nameSearch = action.payload.nameSearch
            state.resultSearch = action.payload.result
        },
      
    }
})
export const {updateSearch} = searchSlice.actions
export default searchSlice.reducer