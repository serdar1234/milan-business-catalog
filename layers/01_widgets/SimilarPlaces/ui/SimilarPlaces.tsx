import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { ViewedPlaceCard } from '@/layers/02_features/ViewedPlaceCard/ui/ViewedPlaceCard';
import Link from 'next/link';

const VIEWED_MOCKS = [
  {
    slug: 'trattoria-milanese',
    name: 'Trattoria Milanese',
    subtitle: 'Traditional cuisine',
    rating: 4.6,
    address: '0.4 km away',
    imageUrl: 'r1.jpg',
  },
  {
    slug: 'boutique-quadrilatero',
    name: 'Boutique Quadrilatero',
    subtitle: 'Fashion • Luxury shopping',
    rating: 4.8,
    address: '0.9 km away',
    imageUrl: 'r2.jpg',
  },
  {
    slug: 'pizzeria-milano',
    name: 'Pizzeria Milano',
    subtitle: 'Pizza • Italian cuisine',
    rating: 4.3,
    address: '0.6 km away',
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
            <ViewedPlaceCard key={place.slug} place={place} withArrow={false} />
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
