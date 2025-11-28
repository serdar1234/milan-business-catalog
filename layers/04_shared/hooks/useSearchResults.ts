import { Dispatch, SetStateAction, useState } from 'react';
import { useGetSearchResultsQuery } from '@/layers/03_entities/search/api/searchApi';
import { Business } from '../api/mocks/businessMocks';

export interface SearchResults {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  businessList: Business[];
  meta?: {
    pagination: {
      page: number;
      per_page: number;
      total_pages: number;
      total_count: number;
    };
    source: string;
  };
  isLoading: boolean;
  isError: boolean;
}

export const useSearchResults = (query: string): SearchResults => {
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useGetSearchResultsQuery({
    q: query,
    page,
    per_page: 10,
  });

  const businessList = data?.data ?? [];
  const meta = data?.meta;

  return {
    page,
    setPage,
    businessList,
    meta,
    isLoading,
    isError,
  };
};
