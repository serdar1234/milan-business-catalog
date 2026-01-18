import { Category } from '@/layers/04_shared/types/types';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';
import { BASE_URL } from '@/layers/04_shared/configs/api';
import { Meta, Business, Review } from '../types/types';

export async function fetchCategory(slug: string) {
  const { lang } = await getSSRPreferences();

  const res = await fetch(`${BASE_URL}/categories/${slug}?lang=${lang}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;
  return res.json() as Promise<{ data: Category }>;
}

export async function fetchCategories(
  limit?: number,
): Promise<Category[] | null> {
  try {
    const { lang } = await getSSRPreferences();
    const res = await fetch(`${BASE_URL}/categories?lang=${lang}`);
    if (!res.ok) return null;

    const json = await res.json();
    let cats: Category[] = json.data;
    if (limit) {
      cats = cats.slice(0, limit);
    }
    return cats;
  } catch (err) {
    console.error('Failed to fetch categories', err);
    return null;
  }
}

export async function fetchCategoryBusinesses({
  page = 1,
  limit = 10,
  category_id = 1,
  sort = 'rating',
}): Promise<{ data: Business[]; meta: Meta } | null> {
  const { lang } = await getSSRPreferences();
  try {
    const res = await fetch(
      `${BASE_URL}/companies?page=${page}&per_page=${limit}&category_id=${category_id}&sort=${sort}&lang=${lang}`,
    );
    if (!res.ok) return null;
    return await res.json();
  } catch (err) {
    console.error('Failed to fetch businesses', err);
    return null;
  }
}

export async function fetchSearchResults({
  query = '',
  page = 1,
  limit = 10,
  category_id = 0,
  sort = 'rating',
}): Promise<{ data: Business[]; meta: Meta } | null> {
  const { lang } = await getSSRPreferences();
  try {
    const url = `${BASE_URL}/companies/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${limit}${category_id ? `&category_id=${category_id}` : ''}&sort=${sort}&lang=${lang}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('Failed to fetch search results', err);
    return null;
  }
}

export async function fetchBusinessesWithCategory({
  sort = 'rating',
  limit = 10,
  category_id,
}: {
  sort?: string;
  limit?: number;
  category_id?: number;
}): Promise<{ data: Business[]; meta: Meta } | null> {
  const { lang } = await getSSRPreferences();
  try {
    let url = `${BASE_URL}/companies?sort=${sort}&limit=${limit}&lang=${lang}`;
    if (category_id) {
      url += `&category_id=${category_id}`;
    }

    const res = await fetch(url, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('Failed to fetch businesses with category', err);
    return null;
  }
}

export async function fetchCompanyDetails(slug: string) {
  const { lang } = await getSSRPreferences();
  try {
    const res = await fetch(`${BASE_URL}/companies/${slug}?lang=${lang}`, {
      next: { revalidate: 300 },
    });

    if (!res.ok) return null;
    return res.json() as Promise<{ data: Business }>;
  } catch (err) {
    console.error('Failed to fetch company details', err);
    return null;
  }
}

export async function fetchCompanyReviews(slug: string) {
  const { lang } = await getSSRPreferences();
  try {
    const res = await fetch(
      `${BASE_URL}/companies/${slug}/reviews?lang=${lang}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) return null;
    return res.json() as Promise<{ data: Review[] }>;
  } catch (err) {
    console.error('Failed to fetch company reviews', err);
    return null;
  }
}

export async function fetchBusinesses({
  sort = 'rating',
  limit = 10,
}): Promise<Business[] | null> {
  const { lang } = await getSSRPreferences();
  try {
    const res = await fetch(
      `${BASE_URL}/companies?sort=${sort}&limit=${limit}&lang=${lang}`,
      {
        next: { revalidate: 300 },
      },
    );

    if (!res.ok) return null;
    const response = await res.json();
    return response.data || [];
  } catch (err) {
    console.error('Failed to fetch businesses', err);
    return null;
  }
}
