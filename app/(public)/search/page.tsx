import { redirect } from 'next/navigation';
import SearchPageClient from '@/layers/02_features/Search/ui/SearchPageClient';
import type { ViewType } from '@/layers/02_features/SearchHeaderVersions';

interface Props {
  searchParams: {
    q?: string;
    view?: ViewType;
  };
}

export default async function SearchPage({ searchParams }: Props) {
  const params = await searchParams;
  const searchQuery = params.q || '';
  if (!searchQuery) {
    redirect('/search?q=milano');
  }

  const initial: ViewType = (params.view as ViewType) || 'list';
  const decodedQuery = decodeURIComponent(searchQuery);
  const pageTitle =
    decodedQuery === 'all' ? 'All Businesses in Milan' : decodedQuery;

  return (
    <SearchPageClient
      searchQuery={decodedQuery}
      initialView={initial}
      pageTitle={pageTitle}
    />
  );
}
