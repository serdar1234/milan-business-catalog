import { Box, Container, Grid } from '@mui/material';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { DistrictCard } from '@/layers/02_features/DistrictCard/ui/DistrictCard';
import { DISTRICTS } from './mockDistricts';

export const ExploreDistricts: React.FC = () => {
  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <WidgetHeader
        title="Explore Milano Districts"
        subtitle="Discover the unique character and hidden gems of the city's best neighborhoods."
      />

      {/* === ДЕСКТОПНАЯ СЕТКА (Grid 2x2) === */}
      <Grid
        container
        spacing={3}
        sx={{ display: { xs: 'none', md: 'flex' } }} // Скрываем на моб.
      >
        {DISTRICTS.slice(0, 4).map((district) => (
          <Grid
            key={district.name}
            size={6} // Занимает 6/12 ширины (2 в ряд)
          >
            <DistrictCard district={district} />
          </Grid>
        ))}
      </Grid>

      {/* === МОБИЛЬНЫЙ СЛАЙДЕР (Horizontal Scroll) === */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          overflowX: 'auto',
          py: 1,
          '&::-webkit-scrollbar:horizontal': { height: 0 },
          msOverflowStyle: 'none',
          gap: 2,
        }}
      >
        {DISTRICTS.map((district) => (
          <Box
            key={district.name}
            sx={{ flexShrink: 0, width: '70%', minWidth: 250 }}
          >
            <DistrictCard district={district} />
          </Box>
        ))}
      </Box>
    </Container>
  );
};
