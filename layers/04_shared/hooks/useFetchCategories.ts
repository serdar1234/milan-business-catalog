'use client';

import { useState, useEffect, useCallback } from 'react';
import { Category } from '@/layers/04_shared/types/types';
import { useCurrentLanguage } from './useCurrentLanguage';
import { BASE_URL } from '@/layers/04_shared/configs/api';

interface UseFetchCategoriesReturn {
  categories: Category[] | null;
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useFetchCategories = (
  limit?: number,
): UseFetchCategoriesReturn => {
  const [categories, setCategories] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const lang = useCurrentLanguage();

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const url = limit
        ? `${BASE_URL}/categories?lang=${lang}&limit=${limit}`
        : `${BASE_URL}/categories?lang=${lang}`;

      const res = await fetch(url);

      if (!res.ok) {
        throw new Error(
          `Failed to fetch categories: ${res.status} ${res.statusText}`,
        );
      }

      const json = await res.json();
      let cats: Category[] = json.data;

      if (limit) {
        cats = cats.slice(0, limit);
      }

      setCategories(cats);
    } catch (err) {
      console.error('Failed to fetch categories', err);
      setError(
        err instanceof Error ? err.message : 'An unknown error occurred',
      );
      setCategories(null);
    } finally {
      setLoading(false);
    }
  }, [limit, lang]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories, lang]); // Re-fetch when language changes

  const refetch = () => {
    fetchCategories();
  };

  return { categories, loading, error, refetch };
};
