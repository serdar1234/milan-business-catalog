import { useState, useEffect } from 'react';
import { AutocompleteResult } from '@/layers/04_shared/types/types';

interface UseAutocompleteSuggestionsReturn {
  suggestions: AutocompleteResult[];
  isLoading: boolean;
  error: string | null;
}

export function useAutocompleteSuggestions(
  query: string,
  limit: number = 10,
  lang: string,
): UseAutocompleteSuggestionsReturn {
  const [suggestions, setSuggestions] = useState<AutocompleteResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!query || query.trim() === '') {
      setSuggestions([]);
      setError(null);
      return;
    }

    setIsLoading(true);
    setError(null);

    // Using AbortController to cancel previous requests
    const controller = new AbortController();

    const fetchSuggestions = async () => {
      try {
        const response = await fetch(
          `/api/autocomplete?q=${encodeURIComponent(query)}&limit=${limit}&lang=${lang}`,
          {
            signal: controller.signal,
          },
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        if (!controller.signal.aborted) {
          setSuggestions(data.data || []);
        }
      } catch (err) {
        if (!controller.signal.aborted) {
          console.error('Error fetching autocomplete suggestions:', err);
          setError(err instanceof Error ? err.message : 'An error occurred');
          setSuggestions([]);
        }
      } finally {
        if (!controller.signal.aborted) {
          setIsLoading(false);
        }
      }
    };

    fetchSuggestions();

    // Cleanup function to abort the request if component unmounts or query changes
    return () => {
      controller.abort();
    };
  }, [query, limit, lang]);

  return { suggestions, isLoading, error };
}
