import { redirect } from 'next/navigation';
import SearchPageClient from '@/layers/02_features/Search/ui/SearchPageClient';
import type { ViewType } from '@/layers/02_features/SearchHeaderVersions';
import type { Metadata } from 'next';
import { getTitleFromSlug } from '@/layers/04_shared/utils/helpers';
import { fetchSearchResults } from '@/layers/04_shared/utils/helpers.server';

type MetaProps = {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
};

export async function generateMetadata({
  searchParams,
}: MetaProps): Promise<Metadata> {
  const search = await searchParams;

  return {
    title:
      (Array.isArray(search.q) && search.q[0]) ||
      (typeof search.q === 'string' && getTitleFromSlug(search.q)) ||
      '',
    description:
      'search results for ' + Object.values(await searchParams).join(', '),
  };
}

interface SearchPageProps {
  searchParams: {
    q?: string;
    view?: ViewType;
  };
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const params = await searchParams;
  const searchQuery = params.q || '';

  if (!searchQuery) {
    redirect('/search?q=milano');
  }

  const initial: ViewType = (params.view as ViewType) || 'list';
  const decodedQuery = decodeURIComponent(searchQuery);
  const pageTitle =
    decodedQuery === 'milano' ? 'All Businesses in Milan' : decodedQuery;

  const initialResult = await fetchSearchResults({
    query: decodedQuery,
    page: 1,
  });
  if (!initialResult) return null;

  return (
    <SearchPageClient
      searchQuery={decodedQuery}
      initialView={initial}
      pageTitle={pageTitle}
      initialResult={initialResult}
    />
  );
}
