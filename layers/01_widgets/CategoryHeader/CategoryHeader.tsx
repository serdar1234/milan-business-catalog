import { Box, Typography, Stack } from '@mui/material';
import {
  AppBreadcrumbs,
  BreadcrumbItem,
} from '@/layers/04_shared/ui/AppBreadcrumbs';
import { FilterButtons } from '@/layers/04_shared/ui/FilterButtons';

interface CategoryHeaderProps {
  categoryName: string;
  placeCount?: number;
  breadcrumbs?: BreadcrumbItem[];
}

export const CategoryHeader: React.FC<CategoryHeaderProps> = ({
  categoryName,
  placeCount = 10,
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
        {/* Breadcrumbs */}
        {breadcrumbs.length > 0 && (
          <Box>
            <AppBreadcrumbs items={breadcrumbs} />
          </Box>
        )}

        {/* Name and filter buttons */}
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          justifyContent="space-between"
          alignItems={{ xs: 'flex-start', md: 'center' }}
          spacing={{ xs: 2, md: 0 }}
          sx={{ p: { xs: 2, md: '1.5rem' } }}
        >
          {/* Category Name */}
          <Typography variant="h4" component="h1" fontWeight="bold">
            {categoryName}
            {placeCount && (
              <Typography variant="body1" component="div">
                {placeCount + ' places'}
              </Typography>
            )}
          </Typography>
          {/* Filter buttons */}
          <FilterButtons />
        </Stack>
      </Box>
    </Box>
  );
};
