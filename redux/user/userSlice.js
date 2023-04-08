import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  comments: [],
  likes: [],
};

const userSlice = createSlice({
  name: 'user',
  initialState,
});
