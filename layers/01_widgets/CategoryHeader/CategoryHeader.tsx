'use client';

import { Box, Typography, Button, Stack } from '@mui/material';
import {
  AppBreadcrumbs,
  BreadcrumbItem,
} from '@/layers/04_shared/ui/AppBreadcrumbs';

import AccessTimeIcon from '@mui/icons-material/AccessTime';
import NearMeIcon from '@mui/icons-material/NearMe';
import StarIcon from '@mui/icons-material/Star';

interface FilterButton {
  label: string;
  value: string;
  Icon: React.ElementType;
}

interface CategoryHeaderProps {
  categoryName: string;
  breadcrumbs?: BreadcrumbItem[];
}

const FILTER_BUTTONS: FilterButton[] = [
  { label: 'Open now', value: 'open', Icon: AccessTimeIcon },
  { label: 'Nearby', value: 'nearby', Icon: NearMeIcon },
  { label: 'Top Rated', value: 'top_rated', Icon: StarIcon },
];

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryName,
  breadcrumbs = [],
}) => {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'white',
        borderBottom: '1px solid #F0F0F0',
      }}
    >
      <Box maxWidth="lg" sx={{ mx: 'auto' }}>
        {breadcrumbs.length > 0 && (
          <Box sx={{ mb: 1.5 }}>
            <AppBreadcrumbs items={breadcrumbs} />
          </Box>
        )}

        {/* Header and filter buttons */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={{ xs: 2, md: 0 }}
          sx={{ m: { xs: 2, md: '1.5rem' } }}
        >
          {/* Name */}
          <Typography variant="h4" component="h1" fontWeight="bold">
            {categoryName}
          </Typography>

          {/* Filter buttons */}
          <Stack direction="row" spacing={1}>
            {FILTER_BUTTONS.map(({ label, value, Icon }, index) => (
              <Button
                key={value}
                color="brandPrimary"
                variant={index ? 'outlined' : 'contained'}
                startIcon={<Icon sx={{ fontSize: 18 }} />}
              >
                {label}
              </Button>
            ))}
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
};
