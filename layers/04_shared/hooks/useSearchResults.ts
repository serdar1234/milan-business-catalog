import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { Business, Meta } from '@/layers/04_shared/types/types';
import { LanguageCode } from '../configs/settings';
import { BASE_URL } from '@/layers/04_shared/configs/api';

export interface UseSearchResults {
  page: number;
  setPage: Dispatch<SetStateAction<number>>;
  businessList: Business[];
  meta: Meta | null;
  isLoading: boolean;
  isError: boolean;
}

interface SearchResult {
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

export const useSearchResults = (
  query: string,
  lang: LanguageCode,
  initialResult: SearchResult,
): UseSearchResults => {
  const [page, setPage] = useState(initialResult?.meta.pagination.page);
  const [data, setData] = useState<SearchResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      setIsError(false);

      try {
        const params = new URLSearchParams({
          q: query,
          page: page.toString(),
          lang,
          per_page: '10',
        }).toString();

        const response = await fetch(`${BASE_URL}/companies/search?${params}`, {
          method: 'GET',
          headers: {
            'Accept-Language': lang,
            Accept: 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result: SearchResult = await response.json();
        setData(result);
      } catch (error) {
        console.error('Error fetching search results:', error);
        setIsError(true);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [query, page, lang]);

  const businessList =
    page === initialResult?.meta.pagination.page
      ? initialResult?.data
      : (data?.data ?? initialResult?.data ?? []);
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
