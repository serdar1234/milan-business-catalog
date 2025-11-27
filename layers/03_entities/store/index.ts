import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { api } from '@/layers/03_entities/api/baseApi';
import recentSearchSliceReducer from '@/layers/03_entities/search/model/slice';

export const rootReducer = combineReducers({
  [api.reducerPath]: api.reducer,
  recentSearch: recentSearchSliceReducer,
});

export const makeStore = (preloadedState?: RootState) => {
  return configureStore({
    reducer: {
      [api.reducerPath]: api.reducer,
      recentSearch: recentSearchSliceReducer,
    },
    preloadedState,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),

    devTools: process.env.NODE_ENV !== 'production',
  });
};
// the shape of the Redux store created by makeStore
export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];
// shape of the entire Redux state tree
export type RootState = ReturnType<typeof rootReducer>;
