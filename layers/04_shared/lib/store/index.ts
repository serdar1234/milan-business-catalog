import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../../api/baseApi';
import { businessApi } from '@/layers/03_entities/business/api/businessApi';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [businessApi.reducerPath]: businessApi.reducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware, businessApi.middleware),

    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
