import { fetchBaseQuery } from '@reduxjs/toolkit/query';

import { RootState } from '../store';

export const BASE_API_URL = import.meta.env.VITE_BASE_API_URL as string;

export function baseQueryWithJwt(url: string = '/') {
  return fetchBaseQuery({
    baseUrl: BASE_API_URL + url,
    prepareHeaders: (headers, { getState }) => {
      const accessToken = (getState() as RootState).auth.accessToken;

      if (accessToken) {
        headers.set('Authorization', `Bearer ${accessToken}`);
      }

      return headers;
    },
  });
}
