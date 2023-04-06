import { createSlice } from '@reduxjs/toolkit';
import { addPost, getPosts } from './postsOperations';
const initialState = {
  //   post: {
  //     comments: [],
  //     image: '',
  //     likes: 0,
  //     location: { longitude: 0, latitude: 0 },
  //     owner: '',
  //     title: '',
  //   },
  posts: [],
  isLoading: false,
  error: false,
};

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(addPost.pending, state => {
        state.isLoading = true;
      })
      .addCase(addPost.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(addPost.rejected, state => {
        state.error = true;
      })
      .addCase(getPosts.pending, state => {
        state.isLoading = true;
      })
      .addCase(getPosts.fulfilled, (state, { payload }) => {
        state.posts = payload;
      })
      .addCase(getPosts.rejected, state => {
        state.error = true;
      });
  },
});
