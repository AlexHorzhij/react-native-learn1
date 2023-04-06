import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/API';

export const signUp = createAsyncThunk(
  'signUp',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.userSignUp(data);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const signIn = createAsyncThunk(
  'signIn',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.userSignIn(data);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const signOut = createAsyncThunk(
  'signOut',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.userSignOut();
      console.log('response: ', response);
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);

export const updateUser = createAsyncThunk(
  'update',
  async (data, { rejectWithValue }) => {
    console.log('data: ', data);
    try {
      const response = API.updateUserData(data);
      console.log('data: ', data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
