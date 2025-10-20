import { BrowseByCategory } from '@/layers/01_widgets/BrowseByCategory/BrowseByCategory';
import { ExploreDistricts } from '@/layers/01_widgets/ExploreDistricts/ui/ExploreDistricts';
import { ExploreOnMap } from '@/layers/01_widgets/ExploreOnMap/ui/ExploreOnMap';
import { Footer } from '@/layers/01_widgets/Footer/ui/Footer';
import { HeroSearch } from '@/layers/01_widgets/HeroSearch/ui/HeroSearch';
import { LocalInsights } from '@/layers/01_widgets/LocalInsights/ui/LocalInsights';
import { MobileNavBar } from '@/layers/01_widgets/MobileNavBar/ui/MobileNavBar';
import { SeasonFavorites } from '@/layers/01_widgets/SeasonFavorites/ui/SeasonFavorites';
import { WinterSpecials } from '@/layers/01_widgets/WinterSpecials/ui/WinterSpecials';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box component="main">
      <HeroSearch />
      <BrowseByCategory />
      <SeasonFavorites />
      <ExploreDistricts />
      <ExploreOnMap />
      <WinterSpecials />
      <LocalInsights />
      <MobileNavBar />
      <Footer />
    </Box>
  );
}
