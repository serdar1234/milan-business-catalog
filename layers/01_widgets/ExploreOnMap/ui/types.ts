import { Business, Meta } from '@/layers/04_shared/types/types';

export type FilterButton = string;

export interface ExploreOnMapConfig {
  defaultFilter: FilterButton;
  filterCategoryMap: Record<FilterButton, number | undefined>;
  filterButtons: FilterButton[];
  numberOfBusinessesToShow: number;
}

export interface DesktopViewClientProps {
  initialBusinesses: Business[];
  initialFilter?: FilterButton;
  availableFilters: { label: FilterButton; categoryId?: number }[];
}

export interface DesktopViewServerProps {
  initialFilter?: FilterButton;
}

export interface LoadingSkeletonProps {
  viewType: 'mobile' | 'desktop';
}

export interface FilterOption {
  label: FilterButton;
  categoryId?: number;
  description: string;
}

export interface FilteredBusinessData {
  businesses: Business[];
  meta: Meta;
  filterApplied: FilterButton;
}
