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

// export const registerUser = createAsyncThunk(
//   'register',
//   async (data, { rejectWithValue }) => {
//     try {
//       const user = await register(data);
//       toast.success('Successfully registered!');
//       return user;
//     } catch ({ response }) {
//       const error = {
//         status: response.status,
//         message: response.data.message,
//       };
//       toast.error(`Oops! ${response.data.message}, please, try again`);
//       return rejectWithValue(error);
//     }
//   }
// );

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
      return response;
    } catch (error) {
      console.error(error);
      return rejectWithValue(error);
    }
  }
);
