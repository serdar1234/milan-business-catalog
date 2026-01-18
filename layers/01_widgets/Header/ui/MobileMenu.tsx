'use client';

import { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import { SharedIcon } from '@/layers/04_shared/ui/Icon';
import { useScrollLock } from '@/layers/04_shared/hooks/useScrollLock';
import { MobileDrawerContent } from './MobileDrawerContent';
import { Category } from '@/layers/04_shared/types/types';

export const MobileMenu = ({
  categories,
}: {
  categories: Category[] | null;
}) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  useScrollLock(mobileOpen);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  return (
    <>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={handleDrawerToggle}
        sx={{ display: { md: 'none' }, mr: 2 }}
      >
        <SharedIcon iconName="Menu" />
      </IconButton>

      <nav>
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{ keepMounted: true, disableScrollLock: true }}
          sx={{
            display: 'block',
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          <MobileDrawerContent
            categories={categories}
            handleDrawerClose={handleDrawerToggle}
          />
        </Drawer>
      </nav>
    </>
  );
};
