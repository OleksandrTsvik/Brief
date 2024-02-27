import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithJwt } from './base-query-with-jwt';
import { BriefWithQuestions } from '../models/brief';
import { QuestionType, QuestionWithBrief } from '../models/question';

interface CreateQuestionRequest {
  briefId: string;
  position: number;
  question: string;
  type: QuestionType;
  answerOptions: { position: number; answerOption: string }[];
}

interface UpdateQuestionRequest {
  id: string;
  position: number;
  question: string;
  type: QuestionType;
  answerOptions: { position: number; answerOption: string }[];
}

export const questionApi = createApi({
  reducerPath: 'questionApi',
  baseQuery: baseQueryWithJwt(),
  tagTypes: ['Question'],
  endpoints: (builder) => ({
    getBriefWithQuestions: builder.query<BriefWithQuestions, { id: string }>({
      query: ({ id }) => ({
        url: `/brief/questions/${id}`,
        method: 'GET',
      }),
      providesTags: ['Question'],
    }),
    getQuestion: builder.query<QuestionWithBrief, { id: string }>({
      query: ({ id }) => ({
        url: `/question/${id}`,
        method: 'GET',
      }),
      providesTags: ['Question'],
    }),
    createQuestion: builder.mutation<void, CreateQuestionRequest>({
      query: ({ briefId, ...data }) => ({
        url: `/question/${briefId}`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: ['Question'],
    }),
    updateQuestion: builder.mutation<void, UpdateQuestionRequest>({
      query: ({ id, ...data }) => ({
        url: `/question/${id}`,
        method: 'PUT',
        body: data,
      }),
      invalidatesTags: ['Question'],
    }),
  }),
});

export const {
  useGetBriefWithQuestionsQuery,
  useGetQuestionQuery,
  useCreateQuestionMutation,
  useUpdateQuestionMutation,
} = questionApi;
