'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';

import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { addRecentlyViewed } from '@/layers/04_shared/utils/recentlyViewed';
import { Business } from '@/layers/04_shared/types/types';
import { ViewedPlace } from '@/layers/02_features/ViewedPlaceCard/ui/ViewedPlaceCard';
import { MapContainerClient } from '@/layers/02_features/Map';

interface BusinessDetailsProps {
  business?: Business;
}

export const Location: React.FC<BusinessDetailsProps> = ({ business }) => {
  useEffect(() => {
    if (!business || !business.slug) return;

    const company: ViewedPlace = {
      slug: business.slug,
      name: business.name,
      subtitle: business.category.name,
      rating: business.average_rating,
      address: business.address,
      imageUrl: business.images?.[0]?.url || '',
    };

    addRecentlyViewed(company);
  }, [business]);

  const MapBlock = (
    <Box
      sx={{
        position: 'relative',
        height: { xs: 200, sm: 300, md: 350 },
        bgcolor: 'grey.300',
        borderRadius: 2,
        mb: { xs: 3, md: 0 },
        overflow: 'hidden',
      }}
    >
      <MapContainerClient
        centerBusiness={business}
        businesses={business ? [business] : []}
        showMapControls
      />

      <Box
        sx={{
          position: 'absolute',
          bottom: 16,
          left: 16,
          right: 16,
          p: 2,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 3,
          zIndex: 1000,
          display: { xs: 'flex', md: 'none' },
          alignItems: 'center',
        }}
      >
        <LocationOnIcon
          sx={{ color: 'brandAccent.main', mr: 1, fontSize: 24 }}
        />
        <Link href={`/map?slug=${business?.slug}`}>
          <Typography variant="body1" fontWeight="bold">
            {business?.address}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {business?.city}, {business?.country}
          </Typography>
        </Link>
      </Box>

      <Button
        variant="contained"
        LinkComponent={Link}
        href={`/map?slug=${business?.slug}`}
        sx={{
          display: { xs: 'none', md: 'flex' },
          position: 'absolute',
          bottom: 16,
          right: 16,
          bgcolor: 'background.paper',
          color: 'text.primary',
          fontWeight: 'bold',
          boxShadow: 3,
          zIndex: 1000,
          '&:hover': { bgcolor: 'grey.100' },
        }}
        startIcon={<DirectionsIcon sx={{ color: 'primary' }} />}
      >
        Show on map
      </Button>
    </Box>
  );

  const MobileContent = (
    <Box display={{ xs: 'block', md: 'none' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Location & Directions
      </Typography>

      {MapBlock}
    </Box>
  );

  const DesktopContent = (
    <Box display={{ xs: 'none', md: 'block' }}>
      <WidgetHeader title="Location" />
      <Grid
        container
        spacing={4}
        sx={{ display: 'flex', flexDirection: 'column' }}
      >
        {MapBlock}
      </Grid>
    </Box>
  );

  return (
    <Box
      component="section"
      aria-label="Business location"
      sx={{
        p: { xs: 3, md: 4 },
        mb: 4,
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 4,
      }}
    >
      {MobileContent}
      {DesktopContent}
    </Box>
  );
};
