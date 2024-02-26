import { configureStore } from '@reduxjs/toolkit';

import { briefApi } from '../api/brief.api';
import { authApi } from '../auth/auth.api';
import { authReducer } from '../auth/auth.slice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [authApi.reducerPath]: authApi.reducer,
    [briefApi.reducerPath]: briefApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware, briefApi.middleware),
  devTools: import.meta.env.DEV,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
