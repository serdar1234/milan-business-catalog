import { Box, Typography, Grid } from '@mui/material';
import { MOCK_BUSINESS_DETAILS as data } from '@/layers/04_shared/api/mocks/businessDetailsMocks';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { RatingBox } from '@/layers/04_shared/ui/RatingBox';
import { FeatureList } from '@/layers/04_shared/ui/FeatureList';

const MobileView = () => (
  <Box display={{ xs: 'block', md: 'none' }}>
    <WidgetHeader title="About" />
    <Box
      sx={{
        my: 4,
        bgcolor: 'background.paper',
        boxShadow: 4,
        borderRadius: '1rem',
      }}
    >
      <Box sx={{ p: 3 }}>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {data.shortDescription}
        </Typography>

        <Grid container spacing={2}>
          <RatingBox name="Rating" data={data.rating} />
          <RatingBox
            name="Reviews"
            data={Math.floor(data.reviews / 100) * 100}
          />
        </Grid>
      </Box>
    </Box>
  </Box>
);

const DesktopView = () => (
  <Box
    display={{ xs: 'none', md: 'block' }}
    sx={{
      my: 3,
      bgcolor: 'background.paper',
      boxShadow: 4,
      borderRadius: '1rem',
    }}
  >
    <Box sx={{ p: 4 }}>
      <WidgetHeader title={`About ${data.name}`} />
      <Typography
        variant="body1"
        color="text.secondary"
        sx={{ mb: 4, whiteSpace: 'pre-line' }}
      >
        {data.fullDescription}
      </Typography>

      <Grid container spacing={4}>
        <Grid size={6}>
          <FeatureList title="Specialties" items={data.specialties} />
        </Grid>
        <Grid size={6}>
          <FeatureList title="Features" items={data.features} />
        </Grid>
      </Grid>
    </Box>
  </Box>
);

export const About: React.FC = () => {
  return (
    <Box component="section" sx={{ py: { xs: 4, md: 0 } }}>
      <MobileView />
      <DesktopView />
    </Box>
  );
};
