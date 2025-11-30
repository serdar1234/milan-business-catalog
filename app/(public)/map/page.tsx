import MapPageClient from './MapPageClient';

export default async function MapPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  const params = await searchParams;
  return <MapPageClient initialSearchParams={params} />;
}
