import { useState } from 'react';
import { useGetSearchResultsQuery } from '@/layers/03_entities/search/api/searchApi';
import { SearchResults } from '../types/types';

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
