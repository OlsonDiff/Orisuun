import { createSlice } from '@reduxjs/toolkit';

const initialState: UserInitialState = {
  user: null,
  currentUser: null,
  profileData: null,
  profileTypes: null,
};

const userSlice = createSlice({
  name: 'userDetails',
  initialState,
  reducers: {
    createUser: (state, action) => {
      state.user = { ...action.payload };
    },
    updateUser: (state, action) => {
      state.user = { ...state.user, ...action.payload };
    },
    removeUser: (state) => {
      state.user = null;
    },
    addCurrentUser: (state, action) => {
      state.currentUser = { ...action.payload };
    },
    updateCurrentUser: (state, action) => {
      state.currentUser = { ...state.currentUser, ...action.payload };
    },
    removeCurrentUser: (state) => {
      state.currentUser = null;
    },
    resetUserState: () => initialState,
    addProfileData: (state, action) => {
      state.profileData = action.payload;
    },
    getProfileType: (state, action) => {
      state.profileTypes = action.payload;
    },
  },
});

export const {
  createUser,
  updateUser,
  removeUser,
  addCurrentUser,
  updateCurrentUser,
  removeCurrentUser,
  resetUserState,
  addProfileData,
  getProfileType,
} = userSlice.actions;

export default userSlice.reducer;
