import Box from '@mui/material/Box';
import MobileFilters from './MobileFilters';
import { FilterPanel } from '@/layers/02_features/FilterPanel/FilterPanel';

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

      <Box display={{ xs: 'none', md: 'flex' }} component="aside">
        <FilterPanel />
      </Box>
    </>
  );
};
