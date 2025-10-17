import { Box, Typography, Button, Chip, Container } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import MapIcon from '@mui/icons-material/Map';
import { SearchForm } from '@/layers/02_features/Search/ui/SearchForm';
import { MapPlaceCard } from '@/layers/02_features/MapPlaceCard/ui/MapPlaceCard';

// Моковые данные для чипов и фильтров
const NEARBY_CHIPS = [
  { label: '47 Cafes nearby', bgColor: '#E0E7E9' },
  { label: '28 Restaurants', bgColor: '#E0E7E9' },
  { label: '15 Bars', bgColor: '#E0E7E9' },
];

const PLACE_LIST_MOCKS = [
  {
    id: 101,
    imageUrl: '/r1.jpg',
    name: 'Toscana Trattoria',
    rating: 4.8,
    category: 'Italian',
    description: 'Fine Italian cuisine',
    distance: '0.4 km',
    isOpen: true,
  },
  {
    id: 102,
    imageUrl: '/r2.jpg',
    name: 'Albero Bar',
    rating: 4.2,
    category: 'Bar',
    description: 'Cocktails & ambiance',
    distance: '1.1 km',
    isOpen: false,
  },
  {
    id: 103,
    name: 'Caffè Vergnano',
    imageUrl: '/r3.jpg',
    rating: 4.5,
    category: 'Cafe',
    description: 'Traditional Milanese coffee',
    distance: '0.8 km',
    isOpen: true,
  },
];

const FILTER_BUTTONS = ['All', 'Bars', 'Restaurants'];

export const ExploreOnMap: React.FC = () => {
  // === desktop (Grid) ===
  const DesktopView = (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: '1fr 2fr',
        height: 700,
        borderRadius: 2,
        overflow: 'hidden',
        boxShadow: 4,
      }}
    >
      {/* left column */}
      <Box
        sx={{
          bgcolor: 'background.paper',
          p: 3,
          borderRight: '1px solid #eee',
        }}
      >
        {/* Фильтры-кнопки */}
        <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
          {FILTER_BUTTONS.map((label) => (
            <Button
              key={label}
              variant={label === 'All' ? 'contained' : 'outlined'}
              size="small"
              color={label === 'All' ? 'brandAccent' : 'inherit'}
              sx={{
                color: label === 'All' ? 'white' : 'text.primary',
                borderColor: '#ccc',
                textTransform: 'capitalize',
              }}
            >
              {label}
            </Button>
          ))}
        </Box>

        <SearchForm hasBorder />

        <Box>
          {PLACE_LIST_MOCKS.map((place) => (
            <MapPlaceCard key={place.id} place={place} />
          ))}
        </Box>

        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ p: 2, textAlign: 'center' }}
        >
          End of list. Showing 3 of 45 places.
        </Typography>
      </Box>

      {/* the map */}
      <Box
        sx={{
          bgcolor: 'rebeccapurple',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Typography variant="h6" color="text.secondary">
          [Карта города: Заглушка]
        </Typography>
      </Box>
    </Box>
  );

  // === mobile version ===
  const MobileView = (
    <Box
      sx={{
        backgroundImage:
          'linear-gradient(45deg, var(--color-brand-primary), var(--color-text-primary))',
        p: 3,
        borderRadius: 2,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: 2,
        }}
      >
        <Box>
          <Typography
            variant="h5"
            fontWeight="bold"
            color="var(--color-surface)"
            mb={0.5}
          >
            Explore on Map
          </Typography>
          <Typography
            variant="body2"
            color="rgb(from var(--color-surface) r g b / 0.7)"
          >
            Find the best spots near your current location.
          </Typography>
        </Box>

        <Button
          variant="contained"
          color="surface"
          sx={{
            bgcolor: 'background.paper',
            color: 'brandPrimary.main',
            '&:hover': {
              bgcolor: 'background.default',
            },
            px: 2,
            ml: 4,
          }}
          startIcon={<MapIcon />}
        >
          Open map
        </Button>
      </Box>

      <Box
        sx={{
          display: 'flex',
          gap: 1,
          py: 1,
          flexWrap: 'wrap',
        }}
      >
        {NEARBY_CHIPS.map((chip) => (
          <Chip
            key={chip.label}
            label={chip.label}
            size="small"
            sx={{
              flexShrink: 0,
              bgcolor: 'rgb(from var(--color-surface) r g b / 0.15)',
              color: 'background.paper',
              fontWeight: 'medium',
            }}
          />
        ))}
      </Box>
    </Box>
  );

  return (
    <Box component="section" sx={{ py: 6 }}>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <WidgetHeader
          title="Find Your Way Around"
          subtitle="A powerful map to explore curated places in every Milan district."
        />
      </Box>

      <Container maxWidth="lg">
        <Box sx={{ display: { xs: 'block', md: 'none' } }}>{MobileView}</Box>

        <Box sx={{ display: { xs: 'none', md: 'block' } }}>{DesktopView}</Box>
      </Container>
    </Box>
  );
};
