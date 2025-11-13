import { configureStore } from '@reduxjs/toolkit';
import { baseApi } from '../../api/baseApi';
import { businessApi } from '../../api/businessApi';
import { categoriesApi } from '../../api/categoriesApi';
import categoryStateReducer from './features/categoryState/categoryStateSlice';

export const makeStore = () => {
  return configureStore({
    reducer: {
      [baseApi.reducerPath]: baseApi.reducer,
      [businessApi.reducerPath]: businessApi.reducer,
      [categoriesApi.reducerPath]: categoriesApi.reducer,
      categoryState: categoryStateReducer,
    },

    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(
        baseApi.middleware,
        businessApi.middleware,
        categoriesApi.middleware,
      ),

    devTools: process.env.NODE_ENV !== 'production',
  });
};

export type AppStore = ReturnType<typeof makeStore>;

export type RootState = ReturnType<AppStore['getState']>;

export type AppDispatch = AppStore['dispatch'];
