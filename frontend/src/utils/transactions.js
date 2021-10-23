// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const transactionApi = createApi({
  reducerPath: 'transactionApi',
  tagTypes: ['Transactions'],
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getTransactionsById: builder.query({
      query: (id) => ({ url: `transactions/${id}`, credentials: 'include' }),
      providesTags: ['Transactions'],
    }),
    addTransaction: builder.mutation({
      query: (body) => ({
        url: `transfer`,
        credentials: 'include',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Transactions'],
      transformResponse: (response) => response.transaction,
    }),
  }),
})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetTransactionsByIdQuery, useAddTransactionMutation } =
  transactionApi
