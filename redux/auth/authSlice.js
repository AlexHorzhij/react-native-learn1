import { createSlice } from '@reduxjs/toolkit';
import { signUp, signIn, signOut } from './authOperations';

const initialState = {
  name: null,
  login: null,
  isLoading: null,
  token: null,
  error: null,
  uid: null,
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    refreshUser: (state, { payload }) => {
      console.log('payload: ', payload);
      state.uid = payload.uid;
      state.login = payload.login;
      state.token = payload.token;
    },
    logOut: state => {
      state.isLoading = false;
      state.login = null;
      state.token = null;
      state.uid = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.isLoading = true;
      })
      .addCase(signUp.fulfilled, (state, { payload }) => {
        console.log('payload', payload);
        state.isLoading = false;
        state.login = payload.login;
        state.token = payload.accessToken;
        state.uid = payload.uid;
      })
      .addCase(signUp.rejected, state => {
        state.error = true;
      })
      .addCase(signIn.pending, state => {
        state.isLoading = true;
      })
      .addCase(signIn.fulfilled, (state, { payload }) => {
        console.log('payload_signIn', payload);
        state.isLoading = false;
        state.login = payload.login;
        state.token = payload.accessToken;
        state.uid = payload.uid;
      })
      .addCase(signIn.rejected, state => {
        state.error = true;
      })
      .addCase(signOut.pending, state => {
        state.isLoading = true;
      })
      .addCase(signOut.fulfilled, (state, { payload }) => {
        console.log('payload', payload);
        state = initialState;
      })
      .addCase(signOut.rejected, state => {
        state.error = true;
      });
  },
});

export const { refreshUser, logOut } = authSlice.actions;

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const authApi = createApi({
//   reducerPath: 'authApi',
//   baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
//   endpoints: builder => ({
//     getPokemonByName: builder.query({
//       query: name => `auth/${name}`,
//     }),
//   }),
// });

// // Export hooks for usage in functional components, which are
// // auto-generated based on the defined endpoints
// export const { useGetPokemonByNameQuery } = pokemonApi;
