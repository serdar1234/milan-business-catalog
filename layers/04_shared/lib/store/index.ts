import { configureStore } from '@reduxjs/toolkit';
import { api as baseApi } from '@/layers/03_entities/api/baseApi';
import recentSearchSliceReducer from '@/layers/03_entities/search/model/slice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      recentSearch: recentSearchSliceReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(baseApi.middleware),

    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
