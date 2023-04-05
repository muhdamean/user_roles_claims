import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pages: []
}

export const pageSlice= createSlice({
    name: 'page',
    initialState,
    reducers:{
        addPage:(state, action)=>{
            state.pages.push(action.payload);
        },
        setPages:(state, action)=>{
            state.pages=action.payload;
        },
        getPages:(state)=>{
            return state.pages;
        }
    }
})

export const { addPage, setPages, getPages } = pageSlice.actions

export default pageSlice.reducer