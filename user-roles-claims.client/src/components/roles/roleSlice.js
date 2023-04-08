import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from '../../api/agent';

const initialState = {
  roles:[],
  rolesclaims:[],
  error:null
}

export const fetchUsersRoles = createAsyncThunk('roles/fetchUsersRoles', async () => {
    const response=await agent.Roles.getUsersRoles().then((res)=>{
       if(res.status===200){
           return res.data;
       }
   })
   console.log(response, 'rrrrr')

   return response;
 })

export const rolesSlice= createSlice({
    name: 'roles',
    initialState,
    reducers:{
        addRole(state, action){
            state.roles.push(action.payload);
        },
        setRoleList(state, action){
            state.roles=action.payload;
        },
        setRolesClaims(state, action){
            state.rolesclaims=action.payload;
        },
        getRoles(state){
            return state.roles;
        }
    },
    extraReducers(builder){
        builder.addCase(fetchUsersRoles.fulfilled, (state, action) => {
            state.rolesclaims= action.payload
          })
    }
})

export const { addRole, setRoleList, getRoles , setRolesClaims} = rolesSlice.actions

export default rolesSlice.reducer

export const selectAllUsersRoles= state=> state.roles.rolesclaims;