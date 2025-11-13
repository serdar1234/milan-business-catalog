import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import {
  FilterState,
  INITIAL_FILTER_STATE,
} from '@/layers/04_shared/api/types/filterTypes';

interface CategoryPageState {
  filters: FilterState;
  currentSort: string;
  currentPage: number;
}

const initialState: CategoryPageState = {
  filters: INITIAL_FILTER_STATE,
  currentSort: 'rating_desc',
  currentPage: 1,
};

const categoryStateSlice = createSlice({
  name: 'categoryState',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
      state.currentPage = 1;
    },

    setFilterParam: (
      state,
      action: PayloadAction<{
        key: keyof FilterState;
        value: string | null | string[];
      }>,
    ) => {
      (state.filters[action.payload.key] as string | null | string[]) =
        action.payload.value;
      state.currentPage = 1;
    },
    setSort: (state, action: PayloadAction<string>) => {
      state.currentSort = action.payload;
      state.currentPage = 1;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
    },
    resetCategoryState: (state) => {
      state.filters = INITIAL_FILTER_STATE;
      state.currentSort = initialState.currentSort;
      state.currentPage = 1;
    },
  },
});

export const {
  setFilters,
  setFilterParam,
  setSort,
  setPage,
  resetCategoryState,
} = categoryStateSlice.actions;

export default categoryStateSlice.reducer;
