interface SearchItem {
  value: string;
  slug: string;
}

export interface RecentSearchState {
  searches: SearchItem[];
  isDrawerOpen: boolean;
}

// Define the root state type directly
export type RootState = {
  recentSearch: RecentSearchState;
};
