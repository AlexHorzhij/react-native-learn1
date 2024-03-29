import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, signOut, updateUser } from './authOperations';

const initialState = {
  name: null,
  email: null,
  isLoading: null,
  token: null,
  error: null,
  uid: null,
  avatar: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshUser: (state, { payload }) => {
      state.uid = payload.uid;
      state.email = payload.email;
      state.name = payload.displayName;
      state.avatar = payload.photoURL;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.email = payload.email;
        state.name = payload.displayName;
        state.uid = payload.uid;
      })
      .addCase(signUp.rejected, state => {
        state.error = true;
      })
      .addCase(signIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.email = payload.email;
        state.name = payload.displayName;
        state.uid = payload.uid;
      })
      .addCase(signIn.rejected, state => {
        state.error = true;
      })
      .addCase(signOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, state => {
        state.isLoading = false;
        state.uid = null;
        state.email = null;
        state.name = null;
      })
      .addCase(signOut.rejected, state => {
        state.error = true;
      })
      .addCase(updateUser.pending, state => {
        state.isLoading = true;
      })
      .addCase(updateUser.fulfilled, (state, { payload }) => {
        state.isLoading = false;
        state.uid = payload.uid;
        state.email = payload.email;
        state.name = payload.name;
        state.avatar = payload.photoURL;
      })
      .addCase(updateUser.rejected, state => {
        state.error = true;
      });
  },
});

export const { logOut, refreshUser } = authSlice.actions;
