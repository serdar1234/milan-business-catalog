import MapPageClient from './MapPageClient';

interface Props {
  searchParams: {
    lat: string;
    lon: string;
    zoom: string;
  };
}

export default async function MapPage({ searchParams }: Props) {
  return <MapPageClient searchParams={searchParams} />;
}
