'use client';
import { ReactNode, useState } from 'react';
import FilterAltIcon from '@mui/icons-material/FilterAlt';
import { Box, Drawer, IconButton } from '@mui/material';

import React from 'react';

export default function MobileFilters({ filters }: { filters: ReactNode }) {
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
      <IconButton aria-label="delete" onClick={toggleDrawer(true)}>
        <FilterAltIcon color="primary" />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)} anchor="right">
        <Box padding={2} sx={{ maxWidth: '80vw' }}>
          {filters}
        </Box>
      </Drawer>
    </>
  );
}
