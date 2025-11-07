import { MapPlaceCard } from '@/layers/02_features/MapPlaceCard/ui/MapPlaceCard';
import { SearchForm } from '@/layers/02_features/Search/ui/SearchForm';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { Container, Box, Button, Typography } from '@mui/material';
import { FILTER_BUTTONS, PLACE_LIST_MOCKS } from './mockData';

export const DesktopView = () => (
  <Box display={{ xs: 'none', md: 'block' }}>
    <WidgetHeader
      title="Find Your Way Around"
      subtitle="A powerful map to explore curated places in every Milan district."
    />
    <Container maxWidth="lg">
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
            bgcolor: 'secondary.light',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Typography variant="h6" color="secondary.contrastText">
            [the map goes here]
          </Typography>
        </Box>
      </Box>
    </Container>
  </Box>
);
