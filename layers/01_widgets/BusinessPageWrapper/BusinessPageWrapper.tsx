import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { PhotoGallery } from '@/layers/01_widgets/PhotoGallery/ui/PhotoGallery';
import { BusinessInformation } from '@/layers/01_widgets/BusinessInformation/ui/BusinessInformation';
import { About } from '@/layers/01_widgets/About/About';
import { Location } from '@/layers/01_widgets/Location/ui/Location';
import { SimilarPlaces } from '@/layers/01_widgets/SimilarPlaces/ui/SimilarPlaces';
import { ReviewsRatings } from '@/layers/01_widgets/ReviewsRatings/ReviewsRatings';
import { Business } from '@/layers/04_shared/types/types';

export function BusinessPageWrapper({ data }: { data: Business }) {
  const photos = data?.images.length ? data.images : undefined;

  return (
    <Box component="section" sx={{ py: 3, bgcolor: 'background.default' }}>
      <Container maxWidth="lg">
        <Grid container spacing={3}>
          <Grid size={{ xs: 12, md: 8 }}>
            {photos && <PhotoGallery photos={photos} />}
            <About data={data} />
            <ReviewsRatings slug={data.slug} />
          </Grid>
          <Grid size={{ xs: 12, md: 4 }}>
            <BusinessInformation data={data} />
            <Location business={data} />
            <SimilarPlaces
              id={data?.category.id ?? 1}
              slug={data?.category.slug ?? ''}
            />
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
