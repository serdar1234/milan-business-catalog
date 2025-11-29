import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import { CategoryCard } from '@/layers/02_features/CategoryCard/ui/CategoryCard';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MuseumIcon from '@mui/icons-material/Museum';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SpaIcon from '@mui/icons-material/Spa';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { Category } from '@/layers/03_entities/category/categoryApi';
import { fetchCategories } from '@/layers/04_shared/utils/helpers.server';

const icons = [
  CoffeeIcon,
  RestaurantIcon,
  ShoppingBagIcon,
  LocalBarIcon,
  MuseumIcon,
  ColorLensIcon,
  TheaterComedyIcon,
  SpaIcon,
];

export async function BrowseByCategory() {
  const cats: Category[] | null = await fetchCategories(8);
  if (!cats) return null;

  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'var(--color-surface)',
        padding: '2rem 1rem',
      }}
    >
      <Container maxWidth="lg" sx={{ px: 0 }}>
        <WidgetHeader
          title="Browse by Category"
          subtitle="Discover the best Milano has to offer"
        />

        <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="center">
          {cats.map((cat) => (
            <Grid
              key={cat.name}
              size={{ xs: 3, md: 1.5 }}
              sx={{
                display: 'flex',
                justifyContent: 'center',
              }}
            >
              <CategoryCard
                name={cat.name}
                icon={icons[cat.id - 1]}
                count={cat.companies_count}
                href={`/category/${cat.slug}`}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}
