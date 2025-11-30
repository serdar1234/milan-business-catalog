'use client';

import { Box, Container } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { ViewedPlaceCard } from '@/layers/02_features/ViewedPlaceCard/ui/ViewedPlaceCard';
import { getRecentlyViewed } from '@/layers/04_shared/utils/recentlyViewed';

const VIEWED_MOCKS = [
  {
    id: 1,
    name: 'Trattoria Milanese',
    subtitle: 'Traditional cuisine • Brera',
    rating: 4.6,
    distance: '0.4 km away',
    imageUrl: 'r1.jpg',
  },
  {
    id: 2,
    name: 'Boutique Quadrilatero',
    subtitle: 'Fashion • Luxury shopping',
    rating: 4.8,
    distance: '0.9 km away',
    imageUrl: 'r2.jpg',
  },
];

export const RecentlyViewed: React.FC = () => {
  const viewedBusinesses = getRecentlyViewed();
  console.log(viewedBusinesses);
  return (
    <Box
      component="section"
      sx={{
        py: 6,
        bgcolor: 'background.paper',
        display: { xs: 'block', md: 'none' },
      }}
    >
      <Container maxWidth="sm">
        <WidgetHeader
          title="Recently Viewed"
          subtitle="Places in Milano you recently viewed"
        />

        <Box>
          {VIEWED_MOCKS.map((place) => (
            <ViewedPlaceCard key={place.id} place={place} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};
