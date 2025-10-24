'use client';

import { Box, Typography, Grid } from '@mui/material';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';
import { MOCK_BUSINESS_DETAILS as data } from '@/layers/03_entities/business/api/mockData';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { RatingBox } from '@/layers/04_shared/ui/RatingBox';
import { FeatureList } from '@/layers/04_shared/ui/FeatureList';

export const About: React.FC = () => {
  const isMobile = useViewportWidth();

  const MobileView = (
    <Box sx={{ p: 3 }}>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {data.shortDescription}
      </Typography>

      <Grid container spacing={2}>
        <RatingBox name="Rating" data={data.rating} />
        <RatingBox name="Reviews" data={Math.floor(data.reviews / 100) * 100} />
      </Grid>
    </Box>
  );

  const DesktopView = (
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
  );

  return (
    <Box component="section" sx={{ py: { xs: 4, md: 0 } }}>
      {isMobile && <WidgetHeader title="About" />}
      <Box
        sx={{
          my: { xs: 4, md: 3 },
          bgcolor: 'background.paper',
          boxShadow: 4,
          borderRadius: '1rem',
        }}
      >
        {isMobile ? MobileView : DesktopView}
      </Box>
    </Box>
  );
};
