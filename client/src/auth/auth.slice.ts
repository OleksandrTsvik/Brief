import { PayloadAction, createSlice } from '@reduxjs/toolkit';

import { RootState } from '../store';

const ACCESS_TOKEN = 'access_token';

interface CredentialsPayload {
  username: string;
  accessToken: string;
}

interface AuthState {
  username: string | null;
  accessToken: string | null;
}

const initialState: AuthState = {
  username: null,
  accessToken: localStorage.getItem(ACCESS_TOKEN),
};

const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setCredentials: (
      state,
      { payload: { username, accessToken } }: PayloadAction<CredentialsPayload>,
    ) => {
      state.username = username;
      state.accessToken = accessToken;

      localStorage.setItem(ACCESS_TOKEN, accessToken);
    },
    resetAuthState: (state) => {
      state.username = null;
      state.accessToken = null;

      localStorage.removeItem(ACCESS_TOKEN);
    },
  },
});

export const authReducer = authSlice.reducer;

export const { setCredentials, resetAuthState } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;
export const selectCurrentUsername = (state: RootState) => state.auth.username;
