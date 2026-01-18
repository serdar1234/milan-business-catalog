import { NextRequest } from 'next/server';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';
import { BASE_URL } from '@/layers/04_shared/configs/api';

interface AutocompleteResult {
  name: string;
  city: string;
  slug: string;
  country: string;
  id: number;
}

interface AutocompleteApiResponse {
  data: AutocompleteResult[];
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const q = searchParams.get('q') || '';
    const limitParam = searchParams.get('limit');
    const limit = limitParam ? parseInt(limitParam) : 10;
    const lang = searchParams.get('lang') || '';

    // Only make the request if there's a query
    if (!q || q.trim() === '') {
      return new Response(JSON.stringify({ data: [] }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const { lang: currentLang } = await getSSRPreferences();
    const effectiveLang = lang || currentLang;

    const url = `${BASE_URL}/companies/autocomplete?q=${encodeURIComponent(q)}&limit=${limit}&lang=${effectiveLang}`;
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(
        `Failed to fetch autocomplete suggestions: ${res.status} ${res.statusText}`,
      );
      return new Response(JSON.stringify({ data: [] }), {
        status: 200, // Return 200 with empty array instead of error
        headers: { 'Content-Type': 'application/json' },
      });
    }

    const response: AutocompleteApiResponse = await res.json();
    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error);
    return new Response(JSON.stringify({ data: [] }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
