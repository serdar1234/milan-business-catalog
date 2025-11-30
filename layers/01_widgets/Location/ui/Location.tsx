'use client';

import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { TransportRow } from './TransportRow';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { LocationButton } from '@/layers/04_shared/ui/LocationButton';

import { MOCK_BUSINESS_DETAILS } from '@/layers/04_shared/api/mocks/businessDetailsMocks';

import dynamic from 'next/dynamic';
import { Spinner } from '@/layers/04_shared/ui/Spinner';
import { addRecentlyViewed } from '@/layers/04_shared/utils/recentlyViewed';
import { useEffect } from 'react';
import { Business } from '@/layers/04_shared/api/mocks/businessMocks';
const MapContainerClient = dynamic(
  () =>
    import('@/layers/02_features/Map/MapContainerClient').then(
      (mod) => mod.MapContainerClient,
    ),
  {
    ssr: false,
    loading: () => <Spinner bgcolor="transparent" color="secondary" />,
  },
);

interface BusinessDetailsProps {
  business?: Business;
}

const ACTION_BUTTONS: {
  label: string;
  Icon: React.ElementType;
  colorKey: string;
}[] = [
  {
    label: 'Directions',
    Icon: DirectionsIcon,
    colorKey: 'primary',
  },
  {
    label: 'Parking',
    Icon: LocalParkingIcon,
    colorKey: 'brandAccent',
  },
  {
    label: 'Transit',
    Icon: DirectionsBusIcon,
    colorKey: 'statusFeatured',
  },
];

export const Location: React.FC<BusinessDetailsProps> = ({ business }) => {
  const data = MOCK_BUSINESS_DETAILS;
  useEffect(() => {
    if (!business) return;
    addRecentlyViewed(business.slug);
  }, [business, business?.slug]);
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
      <MapContainerClient />
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
        <Box>
          <Typography variant="body1" fontWeight="bold">
            {data.fullAddress}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {data.cityPostal}
          </Typography>
        </Box>
      </Box>

      <Button
        variant="contained"
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
        Get Directions
      </Button>
    </Box>
  );

  const MobileContent = (
    <Box display={{ xs: 'block', md: 'none' }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 2 }}>
        Location & Directions
      </Typography>

      {MapBlock}

      <Grid container spacing={2} sx={{ mb: 3 }}>
        {ACTION_BUTTONS.map((button) => (
          <LocationButton
            key={button.label}
            label={button.label}
            Icon={button.Icon}
            colorKey={button.colorKey}
          />
        ))}
      </Grid>

      <Box>
        {data.transportInfo.map((info, index) => (
          <TransportRow key={index} {...info} />
        ))}
      </Box>
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

        <Grid>
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
            Getting Here
          </Typography>
          <Box>
            {data.transportInfo.map((info, index) => (
              <TransportRow key={index} {...info} />
            ))}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );

  return (
    <Box
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
