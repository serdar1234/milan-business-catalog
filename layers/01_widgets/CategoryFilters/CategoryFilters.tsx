import { Box, Typography } from '@mui/material';
import Filters from '@/layers/02_features/Filters/Filters';

import MobileFilters from './MobileFilters';

export const CategoryFilters: React.FC = () => {
  return (
    <>
      <Box
        display={{ xs: 'flex', md: 'none' }}
        sx={{
          bgcolor: 'background.paper',
          borderRadius: '1rem',
          boxShadow: 2,
          justifyContent: { xs: 'center', sm: 'flex-end' },
          alignItems: 'center',
          p: 2,
          height: '100%',
        }}
      >
        <MobileFilters />
      </Box>

      <Box
        display={{ xs: 'none', md: 'flex' }}
        sx={{
          bgcolor: 'background.paper',
          p: 2,
          borderRadius: '1rem',
          boxShadow: 2,
          flexDirection: 'column',
        }}
      >
        <Typography variant="h6" fontWeight="bold" sx={{ mb: 2 }}>
          Filters
        </Typography>

        <Filters />
      </Box>
    </>
  );
};
