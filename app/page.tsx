import { BrowseByCategory } from '@/layers/01_widgets/BrowseByCategory/BrowseByCategory';
import { ExploreDistricts } from '@/layers/01_widgets/ExploreDistricts/ui/ExploreDistricts';
import { ExploreOnMap } from '@/layers/01_widgets/ExploreOnMap/ui/ExploreOnMap';
import { HeroSearch } from '@/layers/01_widgets/HeroSearch/ui/HeroSearch';
import { LocalInsights } from '@/layers/01_widgets/LocalInsights/ui/LocalInsights';
import { RecentlyViewed } from '@/layers/01_widgets/RecentlyViewed/ui/RecentlyViewed';
import { SavedPlaces } from '@/layers/01_widgets/SavedPlaces/ui/SavedPlaces';
import { SeasonFavorites } from '@/layers/01_widgets/SeasonFavorites/SeasonFavorites';
import WinterSpecials from '@/layers/01_widgets/WinterSpecials/';

export default function Home() {
  return (
    <>
      <HeroSearch />
      <BrowseByCategory />
      <SeasonFavorites />
      <ExploreDistricts />
      <ExploreOnMap />
      <WinterSpecials />
      <LocalInsights />
      <RecentlyViewed />
      <SavedPlaces />
    </>
  );
}
