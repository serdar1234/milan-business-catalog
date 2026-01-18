import { SeasonFavoritesClient } from './SeasonFavorites.client';
import { fetchBusinesses } from '@/layers/04_shared/utils/helpers.server';

interface Props {
  sort?: string;
}

export async function SeasonFavorites({ sort = 'rating' }: Props) {
  const businessList = await fetchBusinesses({ sort, limit: 3 });

  if (!businessList || businessList.length === 0) {
    return null;
  }

  return <SeasonFavoritesClient initialData={businessList} />;
}
