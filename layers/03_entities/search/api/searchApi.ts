import { api } from '@/layers/03_entities/api/baseApi';
import { Business } from '@/layers/04_shared/types/types';
import { type LanguageCode } from '@/layers/04_shared/configs/settings';

export type SearchParams = {
  q: string;
  lang?: LanguageCode;
  page?: number;
  per_page?: number;
  category_id?: number;
  city?: string;
  country?: string;
  rating_min?: number;
  radius?: number;
  lat?: number;
  lon?: number;
  sort?: string;
};

export interface SearchResult {
  data: Business[];
  meta: {
    pagination: {
      page: number;
      per_page: number;
      total_pages: number;
      total_count: number;
    };
    source: string;
  };
}

export const searchApi = api.injectEndpoints({
  endpoints: (builder) => ({
    getSearchResults: builder.query<SearchResult, SearchParams>({
      query: (params) => ({
        url: `companies/search`,
        params,
      }),
      providesTags: [{ type: 'Search', id: 'LIST' }],
      keepUnusedDataFor: 60,
    }),
  }),
});

export const { useGetSearchResultsQuery } = searchApi;

export const { getSearchResults } = searchApi.endpoints;
