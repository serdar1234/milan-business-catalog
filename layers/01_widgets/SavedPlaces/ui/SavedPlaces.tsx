import { Box, Container, Typography, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import Link from 'next/link';
import { SavedPlaceCard } from '@/layers/02_features/SavedPlaceCard/ui/SavedPlaceCard';

const SAVED_MOCKS = [
  {
    id: 1,
    name: 'Duomo di Milano',
    subtitle: 'Must-visit • Cathedral',
    imageUrl: '/t1.jpg',
  },
  {
    id: 2,
    name: 'Teatro alla Scala',
    subtitle: 'Opera house • Culture',
    imageUrl: '/t2.jpg',
  },
];

export const SavedPlaces: React.FC = () => {
  return (
    <Box
      component="section"
      sx={{
        py: 6,
        bgcolor: 'background.default',
        display: { xs: 'block', md: 'none' },
      }}
    >
      <Container maxWidth="sm">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight="bold" color="text.primary">
            Your Saved Places
          </Typography>
          <Button
            component={Link}
            href="#"
            variant="text"
            color="brandAccent"
            sx={{ fontWeight: 'bold' }}
          >
            Manage
          </Button>
        </Box>

        <Box>
          {SAVED_MOCKS.map((place) => (
            <SavedPlaceCard key={place.id} place={place} />
          ))}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            component={Link}
            href="/search"
            variant="outlined"
            color="primary"
            startIcon={<AddIcon />}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            Save a New Place
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
