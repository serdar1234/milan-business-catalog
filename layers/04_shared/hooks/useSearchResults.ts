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
  category_ids: string[],
  ratingMin?: string,
  sort?: string,
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
        });

        // Add optional filter parameters
        if (ratingMin) {
          params.append('rating_min', ratingMin);
        }
        if (category_ids.length > 0) {
          category_ids.forEach((category_id) => {
            params.append('category_ids[]', category_id);
          });
        }
        if (sort) {
          params.append('sort', sort);
        }

        const response = await fetch(
          `${BASE_URL}/companies/search?${params.toString()}`,
          {
            method: 'GET',
            headers: {
              'Accept-Language': lang,
              Accept: 'application/json',
            },
          },
        );

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
  }, [query, page, lang, ratingMin, category_ids, sort]);

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
