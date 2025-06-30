import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ragApi = createApi({
  reducerPath: "ragApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000/api" }),
  endpoints: (builder) => ({
    askQuestion: builder.mutation<{ answer: string }, { question: string }>({
      query: (body) => ({
        url: "/ask",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useAskQuestionMutation } = ragApi;
