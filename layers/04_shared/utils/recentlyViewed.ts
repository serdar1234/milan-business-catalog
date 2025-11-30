import { ViewedPlace } from '@/layers/02_features/ViewedPlaceCard/ui/ViewedPlaceCard';
import { MAX_RECENT_PLACES } from './constants';

export function addRecentlyViewed(place: ViewedPlace) {
  if (typeof window === 'undefined') return;

  const key = 'recently-viewed';
  const raw = localStorage.getItem(key);

  // массив объектов
  let list: ViewedPlace[] = raw ? JSON.parse(raw) : [];

  // убираем записи с тем же slug (если есть)
  list = list.filter((item) => item.slug !== place.slug);

  // кладём новое место в начало
  const updated = [place, ...list].slice(0, MAX_RECENT_PLACES);

  // сохраняем обратно
  localStorage.setItem(key, JSON.stringify(updated));
}

export function getRecentlyViewed(): ViewedPlace[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('recently-viewed') || '[]');
}
