import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from '../../api/agent'

const initialState = {
  users: [],
  currentUser:[],
  status: 'idle',
  error:null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
     await agent.User.get().then((res)=>{
        if(res.status===200){
            return res.data;
        }
    })
    // return response.data
  })

  export const loginUser = createAsyncThunk('users/loginUser', async ({data}) => {
    await agent.User.post(data).then((res)=>{
       if(res.status===200){
           return res.data;
       }
   })
   // return response.data
 })



export const usersSlice= createSlice({
    name: 'users',
    initialState,
    reducers:{
        setUser(state, action){
            state.users =action.payload;
        },
        userRolesClaims(state, action){
            state.rolesclaims=action.payload;
        },
        setUserList(state, action){
            state.users= action.payload;
        }
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users= action.payload
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
            state.currentUser= action.payload
          })
    }
})

export const { setUser, setUserList, userRolesClaims } = usersSlice.actions

export default usersSlice.reducer

export const selectAllUsers= state=> state.users.users;