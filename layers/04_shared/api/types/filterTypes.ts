export interface FilterState {
  radius: number;
  priceRange: string | null; // '1', '2', '3', '4' , null
  atmosphere: string[]; // ['Cozy', 'Lively', ...]
  features: string[]; // ['Canal View', 'Happy Hour', ...]
}

export const INITIAL_FILTER_STATE: FilterState = {
  radius: 25,
  priceRange: null,
  atmosphere: [],
  features: [],
};
