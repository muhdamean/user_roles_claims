import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  pages: [],
  error:null
}

export const pagesSlice= createSlice({
    name: 'pages',
    initialState,
    reducers:{
        addPage:(state, action)=>{
            state.pages.push(action.payload);
        },
        setPageList:(state, action)=>{
            state.pages=action.payload;
        },
        getPages:(state)=>{
            return state.pages;
        }
    }
})

export const { addPage, setPageList, getPages } = pagesSlice.actions

export default pagesSlice.reducer