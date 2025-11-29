'use client';

import { FilterPanel } from '@/layers/02_features/FilterPanel/FilterPanel';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Drawer from '@mui/material/Drawer';

export default function MapFilterDrawer({
  open,
  toggleDrawer,
}: {
  open: boolean;
  toggleDrawer: (
    open: boolean,
  ) => (event: React.MouseEvent | React.KeyboardEvent) => void;
}) {
  return (
    <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
      <Box
        padding={2}
        sx={{
          width: 'clamp(40vw, 300px, 80vw)',
          overflowX: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <FilterPanel />
        <Button
          variant="contained"
          onClick={toggleDrawer(false)}
          color="statusFeatured"
          sx={{ alignSelf: 'flex-end' }}
        >
          Apply Filters
        </Button>
      </Box>
    </Drawer>
  );
}
