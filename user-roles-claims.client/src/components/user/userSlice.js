import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  users: [],
  rolesclaims:[]
}

export const counterSlice= createSlice({
    name: 'user',
    initialState,
    reducers:{
        createUser:(state, action)=>{
            state.users =action.payload;
        },
        userRolesClaims:(state, action)=>{
            state.rolesclaims=action.payload;
        }
    }
})

export const { createUser, userRolesClaims } = counterSlice.actions

export default counterSlice.reducer