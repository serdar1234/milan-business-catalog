'use client';

import React, { use, useState } from 'react';
import Link from 'next/link';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Drawer,
} from '@mui/material';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileDrawerContent } from './MobileDrawerContent';
import { SharedIcon } from '@/layers/04_shared/ui/Icon';
import { useScrollLock } from '@/layers/04_shared/hooks/useScrollLock';
import { useViewportWidth } from '@/layers/04_shared/hooks/useViewportWidth';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  useScrollLock(mobileOpen);
  const isMobile = useViewportWidth();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  return (
    <AppBar position="sticky">
      <Toolbar
        sx={{
          maxWidth: 1200,
          width: '100%',
          margin: '0 auto',
          justifyContent: 'space-between',
        }}
      >
        {isMobile && (
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <SharedIcon iconName="Menu" />
          </IconButton>
        )}

        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: '0.05rem',
            flexGrow: { xs: 1, md: 0 },
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }}
        >
          Milan Catalog
        </Typography>

        <DesktopNavigation />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {isMobile && (
            <IconButton sx={{ display: 'block', color: 'white' }}>
              <SharedIcon iconName="Search" />
            </IconButton>
          )}

          <IconButton component={Link} href="/profile" sx={{ color: 'white' }}>
            <SharedIcon iconName="User" />
          </IconButton>
        </Box>
      </Toolbar>

      {isMobile && (
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
            <MobileDrawerContent />
          </Drawer>
        </nav>
      )}
    </AppBar>
  );
};
