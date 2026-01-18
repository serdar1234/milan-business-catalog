import { combineReducers, configureStore } from '@reduxjs/toolkit';
import recentSearchSliceReducer from '@/layers/03_entities/search/model/slice';
import { RootState } from './types';

export const rootReducer = combineReducers({
  recentSearch: recentSearchSliceReducer,
});

export const makeStore = (preloadedState?: Partial<RootState>) => {
  return configureStore({
    reducer: rootReducer,
    preloadedState,

    devTools: process.env.NODE_ENV !== 'production',
  });
};
export type AppStore = ReturnType<typeof makeStore>;

export type AppDispatch = AppStore['dispatch'];
