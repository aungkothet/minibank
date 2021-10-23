// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoints
export const accountApi = createApi({
  reducerPath: 'accountApi',
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.REACT_APP_BASE_URL,
  }),
  endpoints: (builder) => ({
    getAccountById: builder.query({
      query: (id) => ({ url: `account/${id}`, credentials: 'include' }),
    }),
  }),
})
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetAccountByIdQuery } = accountApi
