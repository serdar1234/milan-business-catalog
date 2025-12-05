import { BrowseByCategory } from '@/layers/01_widgets/BrowseByCategory/BrowseByCategory';
// import { ExploreDistricts } from '@/layers/01_widgets/ExploreDistricts/ui/ExploreDistricts';
import { ExploreOnMap } from '@/layers/01_widgets/ExploreOnMap/ui/ExploreOnMap';
import { HeroBlock } from '@/layers/01_widgets/Hero/HeroBlock';
import { LocalInsights } from '@/layers/01_widgets/LocalInsights/ui/LocalInsights';
import RecentlyViewed from '@/layers/01_widgets/RecentlyViewed';
// import { SavedPlaces } from '@/layers/01_widgets/SavedPlaces/ui/SavedPlaces';
import { SeasonFavorites } from '@/layers/01_widgets/SeasonFavorites/SeasonFavorites';
import { getSSRPreferences } from '@/layers/04_shared/utils/getSSRPreferences';
// import WinterSpecials from '@/layers/01_widgets/WinterSpecials/';

export default async function Home() {
  const { lang } = await getSSRPreferences();
  return (
    <>
      <HeroBlock />
      <BrowseByCategory />
      <SeasonFavorites />
      {/* <ExploreDistricts /> */}
      <ExploreOnMap />
      {/* <WinterSpecials /> */}
      <LocalInsights lang={lang} />
      <RecentlyViewed />
      {/* <SavedPlaces /> */}
    </>
  );
}
