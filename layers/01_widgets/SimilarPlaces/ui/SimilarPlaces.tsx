import { Box, Container, Typography } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { ViewedPlaceCard } from '@/layers/02_features/ViewedPlaceCard/ui/ViewedPlaceCard';
import Link from 'next/link';

const VIEWED_MOCKS = [
  {
    id: 1,
    name: 'Trattoria Milanese',
    subtitle: 'Traditional cuisine',
    rating: 4.6,
    distance: '0.4 km away',
    imageUrl: 'r1.jpg',
  },
  {
    id: 2,
    name: 'Boutique Quadrilatero',
    subtitle: 'Fashion • Luxury shopping',
    rating: 4.8,
    distance: '0.9 km away',
    imageUrl: 'r2.jpg',
  },
  {
    id: 3,
    name: 'Pizzeria Milano',
    subtitle: 'Pizza • Italian cuisine',
    rating: 4.3,
    distance: '0.6 km away',
    imageUrl: 'r3.jpg',
  },
];

export const SimilarPlaces: React.FC = () => {
  return (
    <Box
      component="section"
      boxShadow={4}
      borderRadius={'1rem'}
      sx={{
        py: 6,
        bgcolor: 'background.paper',
      }}
    >
      <Container>
        <WidgetHeader title="Similar Places Nearby" />

        <Box>
          {VIEWED_MOCKS.map((place) => (
            <ViewedPlaceCard key={place.id} place={place} withArrow={false} />
          ))}
        </Box>
        <Typography
          variant="body1"
          color="brandAccent.main"
          textAlign="start"
          mt={2}
        >
          <Link href="#">View all similar places</Link>
        </Typography>
      </Container>
    </Box>
  );
};
