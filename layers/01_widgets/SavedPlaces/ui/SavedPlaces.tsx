import { Box, Container, Button } from '@mui/material';
import FolderSpecialIcon from '@mui/icons-material/FolderSpecial';
import Link from 'next/link';
import { SavedPlaceCard } from '@/layers/02_features/SavedPlaceCard/ui/SavedPlaceCard';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';

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
      <Container>
        <WidgetHeader title="Your Saved Places" />

        <Box>
          {SAVED_MOCKS.map((place) => (
            <SavedPlaceCard key={place.id} place={place} />
          ))}
        </Box>

        <Box sx={{ mt: 3 }}>
          <Button
            fullWidth
            component={Link}
            href="#"
            variant="outlined"
            color="brandAccent"
            startIcon={<FolderSpecialIcon />}
            sx={{
              py: 1.5,
              fontWeight: 'bold',
              borderRadius: 2,
              bgcolor: 'background.paper',
            }}
          >
            Manage
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
