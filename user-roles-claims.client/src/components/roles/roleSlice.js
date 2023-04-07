import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  roles:[]
}

export const roleSlice= createSlice({
    name: 'role',
    initialState,
    reducers:{
        addRole:(state, action)=>{
            state.roles.push(action.payload);
        },
        setRoles:(state, action)=>{
            state.roles=action.payload;
        },
        getRoles:(state)=>{
            return state.roles;
        }
    }
})

export const { addRole, setRoles, getRoles } = roleSlice.actions

export default roleSlice.reducer