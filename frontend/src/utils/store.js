import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import profileSlice from './profile'
import { transactionApi } from './transactions'

export const store = configureStore({
  reducer: {
    profile: profileSlice,
    // Add the generated reducer as a specific top-level slice
    [transactionApi.reducerPath]: transactionApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      transactionApi.middleware
    ),
})

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
// see `setupListeners` docs - takes an optional callback as the 2nd arg for customization
setupListeners(store.dispatch)
