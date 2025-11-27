import { PhotoGallery } from '@/layers/01_widgets/PhotoGallery/ui/PhotoGallery';
import { Box, Container, Grid } from '@mui/material';
import { BusinessInformation } from '@/layers/01_widgets/BusinessInformation/ui/BusinessInformation';
import { About } from '@/layers/01_widgets/About/ui/About';
import { Location } from '@/layers/01_widgets/Location/ui/Location';
import { SimilarPlaces } from '@/layers/01_widgets/SimilarPlaces/ui/SimilarPlaces';
import { ReviewsRatings } from '@/layers/01_widgets/ReviewsRatings/ui/ReviewsRatings';
import { Business } from '@/layers/04_shared/api/mocks/businessMocks';

export function BusinessPageWrapper({ data }: { data?: Business }) {
  const photos = data?.images.length ? data.images : undefined;
  return (
    <Box component="section" sx={{ py: 3, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            <PhotoGallery photos={photos} />
            <About data={data} />
            <ReviewsRatings />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <BusinessInformation data={data} />
            <Location />
            <SimilarPlaces />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
