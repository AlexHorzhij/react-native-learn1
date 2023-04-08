import { createSlice } from '@reduxjs/toolkit';
import { addPost, getPosts, likePost } from './postsOperations';
const initialState = {
  //   post: {
  //     comments: [],
  //     image: '',
  //     likes: [],
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
        console.log('payload: ', payload);
        state.posts = payload;
        // state.posts.map(item => {
        //   console.log(
        //     'item.likes.includes(payload.owner): ',
        //     item.likes.includes(payload.owner)
        //   );
        //   item.likes.includes(payload.owner)
        //     ? (item.status = true)
        //     : (item.status = false);
        // });
      })
      .addCase(getPosts.rejected, state => {
        state.error = true;
      })
      .addCase(likePost.pending, state => {
        state.isLoading = true;
      })
      .addCase(likePost.fulfilled, (state, { payload }) => {
        const index = state.posts.findIndex(
          item => item.postId === payload.postId
        );
        console.log('index: ', index);
        if (index !== -1) {
          state.posts[index].likes = payload.likes;
          state.posts[index].status = payload.status;
        }
        // console.log('index: ', index);
        // console.log('state.posts[index]: ', state.posts[index]);
        // state.posts.map(item => {
        //   item.postId === payload.postId
        //     ? (item.status = payload.status)
        //     : item;
        //   item.likes = payload.likes;
        // });
      })
      .addCase(likePost.rejected, state => {
        state.error = true;
      });
  },
});