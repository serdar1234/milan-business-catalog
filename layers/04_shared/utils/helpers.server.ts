import { Category } from '@/layers/03_entities/category/categoryApi';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';
import { Meta, Business } from '../types/types';

export async function fetchCategory(slug: string, lang = 'en') {
  const res = await fetch(`${BASE_URL}/categories/${slug}?lang=${lang}`, {
    next: { revalidate: 300 },
  });

  if (!res.ok) return null;
  return res.json() as Promise<{ data: Category }>;
}
export async function fetchCategories(limit = 8): Promise<Category[] | null> {
  try {
    const { lang } = await getSSRPreferences();
    const res = await fetch(`${BASE_URL}/categories?lang=${lang}`);
    if (!res.ok) return null;

    const json = await res.json();
    const cats: Category[] = json.data.slice(0, limit);
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
  try {
    const { lang } = await getSSRPreferences();
    const res = await fetch(
      `${BASE_URL}/companies?page=${page}&per_page=${limit}&category_id=${category_id}&sort=${sort}&lang=${lang}`,
    );
    if (!res.ok) return null;

    return res.json();
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
  try {
    const { lang } = await getSSRPreferences();
    const url = `${BASE_URL}/companies/search?q=${encodeURIComponent(query)}&page=${page}&per_page=${limit}${category_id ? `&category_id=${category_id}` : ''}&sort=${sort}&lang=${lang}`;
    const res = await fetch(url, { next: { revalidate: 60 } });

    if (!res.ok) return null;
    return res.json();
  } catch (err) {
    console.error('Failed to fetch search results', err);
    return null;
  }
}
