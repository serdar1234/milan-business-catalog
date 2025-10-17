import { BrowseByCategory } from '@/layers/01_widgets/BrowseByCategory/BrowseByCategory';
import { ExploreDistricts } from '@/layers/01_widgets/ExploreDistricts/ui/ExploreDistricts';
import { HeroSearch } from '@/layers/01_widgets/HeroSearch/ui/HeroSearch';
import { SeasonFavorites } from '@/layers/01_widgets/SeasonFavorites/ui/SeasonFavorites';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box component="main">
      <HeroSearch />
      <BrowseByCategory />
      <SeasonFavorites />
      <ExploreDistricts />
    </Box>
  );
}
