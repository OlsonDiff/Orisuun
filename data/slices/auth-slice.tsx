import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const initialState: AuthState = {
  userDetails: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUserDetails: (state, action: PayloadAction<User>) => {
      state.userDetails = action.payload;
      state.isAuthenticated = true;
    },
    clearUserDetails: (state) => {
      state.userDetails = null;
      state.isAuthenticated = false;
    },
    resetAuthState: () => initialState,
  },
});

export const { setUserDetails, clearUserDetails, resetAuthState } =
  authSlice.actions;
export default authSlice.reducer;
