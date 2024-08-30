import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user-slice';
import authReducer from './slices/auth-slice';
import commonSlice from './slices/common-slice';

// Only one reducer for now
const store = configureStore({
  reducer: {
    user: userReducer,
    auth: authReducer,
    common: commonSlice,
  },
  devTools: true,
});

// Define the RootState type
export type RootState = ReturnType<typeof store.getState>;

// Optionally, define the AppDispatch type
export type AppDispatch = typeof store.dispatch;

export default store;
