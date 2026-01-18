'use server';

import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';
import { BASE_URL } from '@/layers/04_shared/configs/api';
import { AutocompleteResult } from '@/layers/04_shared/types/types';

interface AutocompleteApiResponse {
  data: AutocompleteResult[];
}

export interface AutocompleteParams {
  q: string;
  limit: number;
  lang: string;
}

export async function fetchAutocompleteSuggestions(
  params: AutocompleteParams,
): Promise<AutocompleteResult[]> {
  const { q, limit, lang } = params;

  try {
    // Only make the request if there's a query
    if (!q || q.trim() === '') {
      return [];
    }

    const { lang: currentLang } = await getSSRPreferences();
    const effectiveLang = lang || currentLang;

    const url = `${BASE_URL}/companies/autocomplete?q=${encodeURIComponent(q)}&limit=${limit}&lang=${effectiveLang}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store', // Don't cache autocomplete requests
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch autocomplete suggestions: ${res.status} ${res.statusText}`,
      );
      return [];
    }

    const response: AutocompleteApiResponse = await res.json();
    return response.data || [];
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return [];
  }
}
