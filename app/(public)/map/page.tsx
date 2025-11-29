import MapPageClient from './MapPageClient';

export default function MapPage({
  searchParams,
}: {
  searchParams: Record<string, string>;
}) {
  return <MapPageClient initialSearchParams={searchParams} />;
}
