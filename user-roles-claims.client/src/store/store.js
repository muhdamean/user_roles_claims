import {configureStore} from '@reduxjs/toolkit';
import userReducer from '../components/user/userSlice';
import pageReducer from '../components/pages/pageSlice';
import roleReducer from '../components/roles/roleSlice';

export const store = configureStore({
    reducer: {
      user: userReducer,
      pages: pageReducer,
      roles: roleReducer
    },
  })