import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithJwt } from './base-query-with-jwt';
import {
  CompletedBrief,
  CompletedBriefWithAnswers,
} from '../models/completed-brief';

export interface CompleteBriefRequest {
  briefId: string;
  data: CompleteBriefData[];
}

export interface CompleteBriefData {
  questionId: string;
  answer: string | string[];
}

export interface UpdateCompleteBriefRequest {
  id: string;
  data: UpdateCompleteBriefData[];
}

export interface UpdateCompleteBriefData {
  answerBriefId: string;
  answer: string | string[];
}

export const completedBriefApi = createApi({
  reducerPath: 'completedBriefApi',
  baseQuery: baseQueryWithJwt('/completed-brief'),
  tagTypes: ['CompletedBrief'],
  endpoints: (builder) => ({
    getCompletedBriefs: builder.query<CompletedBrief[], void>({
      query: () => ({
        url: '/',
        method: 'GET',
      }),
      providesTags: ['CompletedBrief'],
    }),
    getCompletedBrief: builder.query<CompletedBriefWithAnswers, { id: string }>(
      {
        query: ({ id }) => ({
          url: `/${id}`,
          method: 'GET',
        }),
        providesTags: ['CompletedBrief'],
      },
    ),
    completeBrief: builder.mutation<void, CompleteBriefRequest>({
      query: ({ briefId, data }) => ({
        url: `/${briefId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CompletedBrief'],
    }),
    updateCompletedBrief: builder.mutation<void, UpdateCompleteBriefRequest>({
      query: ({ id, data }) => ({
        url: `/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['CompletedBrief'],
    }),
    deleteCompletedBrief: builder.mutation<void, { id: string }>({
      query: ({ id }) => ({
        url: `/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['CompletedBrief'],
    }),
  }),
});

export const {
  useGetCompletedBriefsQuery,
  useGetCompletedBriefQuery,
  useLazyGetCompletedBriefQuery,
  useCompleteBriefMutation,
  useUpdateCompletedBriefMutation,
  useDeleteCompletedBriefMutation,
} = completedBriefApi;
