import { useState, Dispatch, SetStateAction } from 'react';
import { useGetSearchResultsQuery } from '@/layers/03_entities/search/api/searchApi';
import { SearchResult } from '@/layers/03_entities/search/api/searchApi';
import { Business, Meta } from '@/layers/04_shared/types/types';

export interface UseSearchResults {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  businessList: Business[];
  meta: Meta | null;
  isLoading: boolean;
  isError: boolean;
}

export const useSearchResults = (
  query: string,
  initialResult?: SearchResult,
): UseSearchResults => {
  const [page, setPage] = useState(initialResult?.meta.pagination.page ?? 1);

  const shouldSkip =
    Boolean(initialResult) && page === initialResult?.meta.pagination.page;

  const { data, isLoading, isError } = useGetSearchResultsQuery(
    {
      q: query,
      page,
      per_page: 10,
    },
    {
      skip: shouldSkip,
    },
  );

  const businessList = data?.data ?? initialResult?.data ?? [];
  const meta = data?.meta ?? initialResult?.meta ?? null;

  return {
    page,
    setPage,
    businessList,
    meta,
    isLoading,
    isError,
  };
};
