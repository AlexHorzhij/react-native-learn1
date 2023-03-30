import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/API';

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (data, thunkAPI) => {
    try {
      const response = await API.userSignUp(data);
      console.log('response1', response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (data, thunkAPI) => {
    try {
      const response = await API.userSignIn(data);
      console.log('responseUserSignIn', response);
      return response;
    } catch (error) {
      console.error(error);
    }
  }
);

export const signOut = createAsyncThunk('auth/signOut', async (_, thunkAPI) => {
  try {
    console.log('response: ', 'logout');
    const response = await API.userSignOut();
    return response;
  } catch (error) {
    console.error(error);
  }
});
