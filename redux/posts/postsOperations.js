import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/API';

export const addPost = createAsyncThunk(
  'public',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.uploadPostAtServer(data);
      console.log('response: ', response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const getPosts = createAsyncThunk(
  'getPosts',
  async (_, { rejectWithValue }) => {
    try {
      const response = await API.getAllPosts();
      console.log('response: ', response);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
