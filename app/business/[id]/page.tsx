import BusinessHeader from '@/layers/01_widgets/BusinessHeader/ui/BusinessHeader';
import { MobileQuickActions } from '@/layers/01_widgets/MobileQuickActions/ui/MobileQuickActions';

import { MOCK_BUSINESS_DETAILS } from '@/layers/03_entities/business/api/mockData';
import { PhotoGallery } from '@/layers/01_widgets/PhotoGallery/ui/PhotoGallery';
import { Box, Container, Grid } from '@mui/material';
import { BusinessInformation } from '@/layers/01_widgets/BusinessInformation/ui/BusinessInformation';
import { About } from '@/layers/01_widgets/About/ui/About';

export default function BusinessPage() {
  return (
    <>
      <BusinessHeader />
      <MobileQuickActions
        phone={MOCK_BUSINESS_DETAILS.phone}
        address={MOCK_BUSINESS_DETAILS.address}
        isFavorite={MOCK_BUSINESS_DETAILS.isFavorite}
      />
      <Box component="section" sx={{ py: 3, bgcolor: 'background.default' }}>
        <Container maxWidth="lg">
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 8 }}>
              <PhotoGallery />
              <About />
            </Grid>
            <Grid size={{ xs: 12, md: 4 }}>
              <BusinessInformation />
            </Grid>
          </Grid>
        </Container>
      </Box>
    </>
  );
}
