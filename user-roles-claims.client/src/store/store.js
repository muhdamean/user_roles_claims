import {combineReducers, configureStore} from '@reduxjs/toolkit';
import usersReducer from '../components/user/userSlice';
import pagesReducer from '../components/pages/pageSlice';
import rolesReducer from '../components/roles/roleSlice';
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import thunk from 'redux-thunk';

const persistConfig = {
  key: 'root',
  storage
}


// export const store = configureStore({
//     reducer: {
//       users: usersReducer,
//       pages: pagesReducer,
//       roles: rolesReducer
//     },
// })

const rootReducer = combineReducers({ 
  users: usersReducer,
  pages: pagesReducer,
  roles: rolesReducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk]
})

export const persistor = persistStore(store)
