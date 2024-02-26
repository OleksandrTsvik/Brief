import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const BASE_API_URL = 'http://localhost:5000/api';

export interface LoginRequest {
  username: string;
  password: string;
}

export interface LoginResponse {
  username: string;
  accessToken: string;
}

export interface InfoRequest {
  accessToken: string;
}

export interface InfoResponse {
  username: string;
  accessToken: string;
}

const baseQuery = fetchBaseQuery({ baseUrl: BASE_API_URL + '/auth' });

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (data) => ({
        url: '/login',
        method: 'POST',
        body: data,
      }),
    }),
    info: builder.mutation<InfoResponse, InfoRequest>({
      query: (data) => ({
        url: '/info',
        method: 'POST',
        body: data,
      }),
    }),
  }),
});

export const { useLoginMutation, useInfoMutation } = authApi;
