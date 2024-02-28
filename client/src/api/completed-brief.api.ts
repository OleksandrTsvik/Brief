import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithJwt } from './base-query-with-jwt';
import { CompletedBrief } from '../models/completed-brief';

export interface CompleteBriefRequest {
  briefId: string;
  data: CompleteBriefData[];
}

export interface CompleteBriefData {
  questionId: string;
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
    completeBrief: builder.mutation<void, CompleteBriefRequest>({
      query: ({ briefId, data }) => ({
        url: `/${briefId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['CompletedBrief'],
    }),
  }),
});

export const { useGetCompletedBriefsQuery, useCompleteBriefMutation } =
  completedBriefApi;
