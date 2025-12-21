import MapPageClient from './MapPageClient';

type SP = { lat?: string; lon?: string; slug?: string };

export default async function MapPage({
  searchParams,
}: {
  searchParams: SP | Promise<SP>;
}) {
  const params = await searchParams;
  const lat = parseFloat(params.lat ?? '');
  const lon = parseFloat(params.lon ?? '');
  const slug = params.slug;
  const initialCenter: [number, number] | undefined =
    lat && lon ? [lat, lon] : undefined;

  return <MapPageClient initialCenter={initialCenter} activeSlug={slug} />;
}
