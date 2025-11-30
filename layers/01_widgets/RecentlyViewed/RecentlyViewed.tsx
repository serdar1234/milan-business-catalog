'use client';

import { Box, Container } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { ViewedPlaceCard } from '@/layers/02_features/ViewedPlaceCard/ui/ViewedPlaceCard';
import { getRecentlyViewed } from '@/layers/04_shared/utils/recentlyViewed';

const RecentlyViewed: React.FC = () => {
  const viewedBusinesses = getRecentlyViewed();
  if (viewedBusinesses.length === 0) return null;
  return (
    <Box
      component="section"
      sx={{
        py: 6,
        bgcolor: 'background.paper',
        display: { xs: 'block', md: 'none' },
      }}
    >
      <Container>
        <WidgetHeader
          title="Recently Viewed"
          subtitle="Places in Milano you recently viewed"
        />

        <Box>
          {viewedBusinesses.map((place) => (
            <ViewedPlaceCard key={place.slug} place={place} />
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default RecentlyViewed;
