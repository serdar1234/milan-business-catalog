import { Category } from '@/layers/03_entities/category/categoryApi';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';

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
