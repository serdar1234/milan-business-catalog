import { useState, Dispatch, SetStateAction } from 'react';
import { SearchResult } from '@/layers/03_entities/search/api/searchApi';
import { Business, Meta } from '@/layers/04_shared/types/types';
import { useGetFullBusinessListQuery } from '@/layers/03_entities/business/businessApi';

export interface useCategoryBusinesses {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  businessList: Business[];
  meta: Meta | null;
  isLoading: boolean;
  isError: boolean;
}

export const useCategoryBusinesses = (
  id: number,
  initialResult?: SearchResult,
): useCategoryBusinesses => {
  const [page, setPage] = useState(initialResult?.meta.pagination.page ?? 1);

  const { data, isLoading, isError } = useGetFullBusinessListQuery({
    category_id: id,
    page,
    per_page: 10,
  });

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
