import { Box, Typography, Grid, Button } from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import LocalParkingIcon from '@mui/icons-material/LocalParking';
import DirectionsBusIcon from '@mui/icons-material/DirectionsBus';
import { TransportRow } from './TransportRow';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { LocationButton } from '@/layers/04_shared/ui/LocationButton';

import {
  BusinessDetails,
  MOCK_BUSINESS_DETAILS,
} from '@/layers/04_shared/api/mocks/businessDetailsMocks';
import { MapContainerClient } from '@/layers/02_features/Map/MapContainerClient';

interface BusinessDetailsProps {
  data?: BusinessDetails;
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

export const Location: React.FC<BusinessDetailsProps> = ({
  data = MOCK_BUSINESS_DETAILS,
}) => {
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
