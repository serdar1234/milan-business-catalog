import React from 'react';
import { Box, Typography, Grid } from '@mui/material';
import { CategoryCard } from '@/layers/02_features/CategoryCard/ui/CategoryCard';
import LocalBarIcon from '@mui/icons-material/LocalBar';
import RestaurantIcon from '@mui/icons-material/Restaurant';
import CoffeeIcon from '@mui/icons-material/Coffee';
import ColorLensIcon from '@mui/icons-material/ColorLens';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import MuseumIcon from '@mui/icons-material/Museum';
import TheaterComedyIcon from '@mui/icons-material/TheaterComedy';
import SpaIcon from '@mui/icons-material/Spa';

const CATEGORIES = [
  { name: 'Cafes', icon: CoffeeIcon, count: 189, href: '/category/cafes' },
  {
    name: 'Restaurants',
    icon: RestaurantIcon,
    count: 567,
    href: '/category/restaurants',
  },
  {
    name: 'Shopping',
    icon: ShoppingBagIcon,
    count: 420,
    href: '/category/shopping',
  },
  {
    name: 'Aperitivo Bars',
    icon: LocalBarIcon,
    count: 324,
    href: '/category/bars',
  },
  { name: 'Museums', icon: MuseumIcon, count: 112, href: '/category/museums' },
  {
    name: 'Art Galleries',
    icon: ColorLensIcon,
    count: 78,
    href: '/category/art',
  },
  {
    name: 'Theaters',
    icon: TheaterComedyIcon,
    count: 55,
    href: '/category/theaters',
  },
  { name: 'Wellness', icon: SpaIcon, count: 90, href: '/category/wellness' },
];

export const BrowseByCategory: React.FC = () => {
  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        padding: '2rem 1rem',
      }}
    >
      <Typography
        variant="h5"
        component="h2"
        fontWeight="bold"
        sx={{
          mb: { xs: 2, md: 0.5 },
          textAlign: { xs: 'start', md: 'center' },
        }}
      >
        Browse by Category
      </Typography>

      <Typography
        display={{ xs: 'none', md: 'block' }}
        variant="subtitle1"
        component="p"
        sx={{ mb: 3, textAlign: 'center' }}
      >
        Discover the best Milano has to offer
      </Typography>
      <Grid container spacing={{ xs: 1, md: 2 }} justifyContent="center">
        {CATEGORIES.map((cat) => (
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
              icon={cat.icon}
              count={cat.count}
              href={cat.href}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
