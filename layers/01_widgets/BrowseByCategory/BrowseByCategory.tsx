import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Container from '@mui/material/Container';
import DashboardIcon from '@mui/icons-material/Dashboard';
import { CategoryCard } from '@/layers/02_features/CategoryCard/ui/CategoryCard';
import { WidgetHeader } from '@/layers/04_shared/ui/WidgetHeader';
import { Category } from '@/layers/04_shared/types/types';
import { fetchCategories } from '@/layers/04_shared/utils/helpers.server';

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
                icon={DashboardIcon}
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
