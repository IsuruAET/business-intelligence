import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ragApi = createApi({
  reducerPath: "ragApi",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_API_URL }),
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
