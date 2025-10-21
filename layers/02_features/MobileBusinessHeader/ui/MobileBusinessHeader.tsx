import { Box, Grid, Typography } from '@mui/material';

import StarIcon from '@mui/icons-material/Star';
import PlaceIcon from '@mui/icons-material/Place';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import GridViewIcon from '@mui/icons-material/GridView';
import RestaurantIcon from '@mui/icons-material/Restaurant';

interface MobileBusinessHeaderData {
  name: string;
  category: string;
  rating: number;
  district: string;
  isOpen: boolean;
  isLargeCard?: boolean;
  address: string;
  phone: string;
  email: string;
  website: string;
}

interface MobileBusinessHeaderProps {
  data: MobileBusinessHeaderData;
}

export const MobileBusinessHeader: React.FC<MobileBusinessHeaderProps> = ({
  data,
}) => {
  const { name, category, rating, district, isOpen } = data;

  return (
    <Box
      sx={{
        display: { xs: 'flex', md: 'none' },
        p: 3,
        bgcolor: 'background.paper',
        borderRadius: 2,
        mt: 3,
      }}
    >
      <Grid
        container
        spacing={2}
        sx={{
          position: 'relative',
          display: 'flex',
          bgcolor: 'brandPrimary.main',
          color: 'white',
          p: 3,
          mb: 2,
          maxHeight: 300,
          borderRadius: 3,
          boxShadow: 3,
          flexGrow: 1,
          alignItems: 'flex-start',
        }}
      >
        {/* Restaurant icon */}
        <Grid
          size={'auto'}
          sx={{
            bgcolor: 'rgba(255,255,255,0.1)',
            p: 1.5,
            borderRadius: '50%',
            display: 'flex',
            width: 'fit-content',
          }}
        >
          <RestaurantIcon sx={{ fontSize: 36, color: 'white' }} />
        </Grid>
        {/* Name and category */}
        <Grid size={6} sx={{ minWidth: 0 }}>
          <Typography
            variant="h5"
            fontWeight="bold"
            lineHeight={1.2}
            sx={{ mb: 1 }}
          >
            {name}
          </Typography>
          <Typography variant="body2" color="surface" sx={{ mb: 1 }}>
            {category}
          </Typography>
        </Grid>
        {/* QR code */}
        <Grid size={'grow'}>
          <Box
            sx={{
              p: 1.5,
              borderRadius: 2,
              border: '4px solid white',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              position: 'absolute',
              bottom: '1.5rem',
              height: 92,
              right: '1.5rem',
              aspectRatio: '1/1',
              background: 'linear-gradient(135deg, #F06240 0%, #D83B1B 100%)',
            }}
          >
            <GridViewIcon sx={{ fontSize: 28, color: 'white' }} />
          </Box>
        </Grid>
        {/* Rating and district */}
        <Grid
          size={6}
          sx={{
            display: 'flex',
            alignItems: 'flex-start',
            flexDirection: 'column',
            flexWrap: 'wrap',
            gap: { xs: 1.5, sm: 2 },
          }}
        >
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <StarIcon sx={{ color: 'secondary.main', fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" fontWeight="bold">
              {rating}
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <PlaceIcon sx={{ color: 'brandPin.main', fontSize: 18, mr: 0.5 }} />
            <Typography variant="body2" color="grey.300">
              {district} District
            </Typography>
          </Grid>
          <Grid sx={{ display: 'flex', alignItems: 'center' }}>
            <AccessTimeIcon
              sx={{
                color: isOpen ? 'statusSuccess.main' : 'statusError.main',
                fontSize: 18,
                mr: 0.5,
              }}
            />
            <Typography
              variant="body2"
              color={isOpen ? 'statusSuccess.main' : 'statusError.main'}
            >
              Open Now
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Box>
  );
};
