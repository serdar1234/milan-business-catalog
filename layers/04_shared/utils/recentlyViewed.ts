export function addRecentlyViewed(id: string) {
  if (typeof window === 'undefined') return;

  const key = 'recently-viewed';
  const raw = localStorage.getItem(key);
  const list = raw ? JSON.parse(raw) : [];

  const updated = [id, ...list.filter((x: string) => x !== id)].slice(0, 20);

  localStorage.setItem(key, JSON.stringify(updated));
}

export function getRecentlyViewed(): string[] {
  if (typeof window === 'undefined') return [];
  return JSON.parse(localStorage.getItem('recently-viewed') || '[]');
}
