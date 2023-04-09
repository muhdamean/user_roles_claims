import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import agent from '../../api/agent'

const initialState = {
  users: [],
  currentUser:[],
  userroles:[],
  status: 'idle',
  error:null
}

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
     const response=await agent.User.get().then((res)=>{
        if(res.status===200){
            return res.data;
        }
    })
    return response
  })

  export const loginUser = createAsyncThunk('users/loginUser', async (data) => {
    const response=await agent.User.post(data).then((res)=>{
       if(res.status===200){
            localStorage.setItem('user', JSON.stringify(res.data[0].email));
           return res.data;
       }
   })
   return response
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
        },
        signOut:(state)=>{
            state.user=null;
            localStorage.removeItem('user');
            state.currentUser=null
            //history.push('/');
        },
    },
    extraReducers(builder){
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
            state.users= action.payload
          });
          builder.addCase(loginUser.fulfilled, (state, action) => {
            state.currentUser= action.payload[0].email;
            state.userroles=action.payload;
          })
    }
})

export const { setUser, setUserList, userRolesClaims } = usersSlice.actions

export default usersSlice.reducer

export const selectAllUsers= state=> state.users.users;
export const currentUserRolesByPage= (state, page) =>
                            state.users.userroles.filter(role => role.page === page);