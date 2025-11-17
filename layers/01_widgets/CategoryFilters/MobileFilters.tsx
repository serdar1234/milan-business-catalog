'use client';

import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { FilterPanel } from '@/layers/02_features/FilterPanel/FilterPanel';
import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';

export default function MobileFilters() {
  const { open, toggleDrawer } = useToggleDrawer();
  return (
    <>
      <IconButton
        aria-label="filters toggle drawer button"
        color="primary"
        onClick={toggleDrawer(true)}
      >
        <Typography
          variant="body1"
          sx={{ mr: '0.5rem', display: { xs: 'none', sm: 'inline-block' } }}
        >
          Filters
        </Typography>
        <FilterAltIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <Box
          padding={2}
          sx={{ width: 'clamp(40vw, 300px, 80vw)', overflowX: 'auto' }}
        >
          <FilterPanel />
        </Box>
      </Drawer>
    </>
  );
}
