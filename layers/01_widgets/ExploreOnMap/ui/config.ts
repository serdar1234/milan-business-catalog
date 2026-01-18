import { ExploreOnMapConfig } from './types';

export const EXPLORE_ON_MAP_CONFIG: ExploreOnMapConfig = {
  defaultFilter: 'All',
  filterCategoryMap: {
    All: undefined, // Show all
  },
  filterButtons: ['All'],
  numberOfBusinessesToShow: 3,
};

export const {
  defaultFilter: DEFAULT_FILTER,
  filterCategoryMap: FILTER_CATEGORY_MAP,
  filterButtons: FILTER_BUTTONS,
  numberOfBusinessesToShow: NUMBER_OF_BUSINESSES,
} = EXPLORE_ON_MAP_CONFIG;

export type { FilterButton } from './types';
