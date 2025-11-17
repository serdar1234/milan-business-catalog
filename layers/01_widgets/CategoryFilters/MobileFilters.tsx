'use client';

import { useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { SearchFilters } from '@/layers/02_features/SearchFilters/SearchFilters';

export default function MobileFilters() {
  const [open, setOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.MouseEvent | React.KeyboardEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }
      setOpen(open);
    };
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
          <SearchFilters />
        </Box>
      </Drawer>
    </>
  );
}
