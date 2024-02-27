import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithJwt } from './base-query-with-jwt';
import { ActiveBrief, Brief } from '../models/brief';

interface CreateBriefRequest {
  title: string;
  isActive: boolean;
}

interface UpdateBriefRequest {
  id: string;
  title: string;
  isActive: boolean;
}

export const briefApi = createApi({
  reducerPath: 'briefApi',
  baseQuery: baseQueryWithJwt('/brief'),
  tagTypes: ['Brief'],
  endpoints: (builder) => ({
    getActiveBrief: builder.query<ActiveBrief, void>({
      query: () => ({
        url: '/active',
        method: 'GET',
      }),
      providesTags: ['Brief'],
    }),
    getBriefs: builder.query<Brief[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['Brief'],
    }),
    getBrief: builder.query<Brief, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'GET',
      }),
      providesTags: ['Brief'],
    }),
    createBrief: builder.mutation<void, CreateBriefRequest>({
      query: (data) => ({
        url: '/',
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Brief'],
    }),
    deleteBrief: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Brief'],
    }),
    toggleActive: builder.mutation<void, UpdateBriefRequest>({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Brief'],
    }),
    updateBrief: builder.mutation<void, UpdateBriefRequest>({
      query: ({ id, ...data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Brief'],
    }),
  }),
});

export const {
  useGetActiveBriefQuery,
  useGetBriefsQuery,
  useGetBriefQuery,
  useCreateBriefMutation,
  useDeleteBriefMutation,
  useToggleActiveMutation,
  useUpdateBriefMutation,
} = briefApi;
