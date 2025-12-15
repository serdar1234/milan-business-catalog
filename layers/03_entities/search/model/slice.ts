import { RootState } from '@/layers/03_entities/store';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchItem {
  value: string;
  slug: string;
}
interface RecentSearchState {
  searches: SearchItem[];
  isDrawerOpen: boolean;
}

const MAX_RECENT_SEARCHES = 10;

const initialState: RecentSearchState = {
  searches: [],
  isDrawerOpen: false,
};

const recentSearchSlice = createSlice({
  name: 'recentSearch',
  initialState,
  reducers: {
    addRecentSearch: (state, action: PayloadAction<SearchItem>) => {
      const newQuery = action.payload.slug;
      if (!newQuery) return;
      state.searches = state.searches.filter((s) => s.slug !== newQuery);
      state.searches.unshift(action.payload);
      if (state.searches.length > MAX_RECENT_SEARCHES) {
        state.searches.pop();
      }
    },
    clearRecentSearches: (state) => {
      state.searches = [];
    },
    openSearchDrawer: (state) => {
      state.isDrawerOpen = true;
    },
    closeSearchDrawer: (state) => {
      state.isDrawerOpen = false;
    },
  },
});

export const {
  addRecentSearch,
  clearRecentSearches,
  openSearchDrawer,
  closeSearchDrawer,
} = recentSearchSlice.actions;

export const selectIsSearchDrawerOpen = (state: RootState) =>
  state.recentSearch.isDrawerOpen;
export const selectRecentSearches = (state: RootState) =>
  state.recentSearch.searches;

export default recentSearchSlice.reducer;
