import Link from 'next/link';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { BusinessCardSmall } from '@/layers/02_features/BusinessCardSmall/BusinessCardSmall';
import { Business } from '@/layers/04_shared/types/types';
import { fetchCategoryBusinesses } from '@/layers/04_shared/utils/helpers.server';

export async function SimilarPlaces({
  id,
  slug,
}: {
  id: number;
  slug: string;
}) {
  const json = fetchCategoryBusinesses({
    page: 1,
    limit: 3,
    category_id: id,
    sort: 'rating',
  });
  const businesses: Business[] = (await json?.then((res) => res?.data)) || [];
  return (
    <Box
      component="section"
      boxShadow={4}
      borderRadius={'1rem'}
      sx={{
        p: 2,
        bgcolor: 'background.paper',
      }}
    >
      <Container style={{ padding: '1rem' }}>
        <WidgetHeader title="Similar Places Nearby" />

        <Box>
          {businesses.map((place) => (
            <BusinessCardSmall key={place.slug} business={place} />
          ))}
        </Box>
        <Link href={`/category/${slug}`}>
          <Typography
            variant="body1"
            color="brandAccent.main"
            textAlign="start"
            mt={2}
          >
            View all similar places
          </Typography>
        </Link>
      </Container>
    </Box>
  );
}
