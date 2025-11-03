import { Box, Typography, Stack } from '@mui/material';
import {
  AppBreadcrumbs,
  BreadcrumbItem,
} from '@/layers/04_shared/ui/AppBreadcrumbs';
import { FilterButtons } from '@/layers/04_shared/ui/FilterButtons';

interface CategoryHeaderProps {
  categoryName: string;
  breadcrumbs?: BreadcrumbItem[];
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryName,
  breadcrumbs = [],
}) => {
  return (
    <Box
      component="header"
      sx={{
        bgcolor: 'white',
      }}
    >
      <Box maxWidth="lg" sx={{ mx: 'auto' }}>
        {breadcrumbs.length > 0 && (
          <Box>
            <AppBreadcrumbs items={breadcrumbs} />
          </Box>
        )}

        {/* Header and filter buttons */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={{ xs: 2, md: 0 }}
          sx={{ p: { xs: 2, md: '1.5rem' } }}
        >
          {/* Name */}
          <Typography variant="h4" component="h1" fontWeight="bold">
            {categoryName}
          </Typography>

          <FilterButtons />
        </Stack>
      </Box>
    </Box>
  );
};
