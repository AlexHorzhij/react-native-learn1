import { createAsyncThunk } from '@reduxjs/toolkit';
import API from '../../api/API';

export const addPost = createAsyncThunk(
  'public',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.uploadPostAtServer(data);
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
      const data = response.map(item =>
        item.likes.includes(item.owner)
          ? (item.status = true)
          : (item.status = false)
      );
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const likePost = createAsyncThunk(
  'likePost',
  async (data, { rejectWithValue }) => {
    try {
      const { likes, postId, userId } = await API.updateLikePost(data);
      const status = likes.includes(userId);
      return { status, postId, likes };
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);

export const publishComment = createAsyncThunk(
  'publishComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await API.addComment(data);
      return response;
    } catch (error) {
      return rejectWithValue(error);
    }
  }
);
