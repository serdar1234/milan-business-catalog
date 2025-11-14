import SearchPageClient from './SearchPageClient'; // Импортируем Client Component

interface SearchPageProps {
  params: {
    query: string; // Параметр из URL (например, 'superbar')
  };
  searchParams: {
    // Здесь могут быть параметры, такие как 'view', 'sort', 'filters'
    view?: 'list' | 'map';
  };
}

export default function SearchPage({ params, searchParams }: SearchPageProps) {
  // Декодируем query из URL (Next.js автоматически декодирует URI, но для безопасности)
  const searchQuery = decodeURIComponent(params.query || '');

  // Получаем вид из searchParams, если он есть
  const initialView = searchParams.view === 'map' ? 'map' : 'list';

  // В реальном проекте: Здесь можно вызвать API на сервере, используя searchQuery

  return (
    // Передаем полученные с сервера данные и параметры в клиентский компонент
    <SearchPageClient searchQuery={searchQuery} initialView={initialView} />
  );
}
