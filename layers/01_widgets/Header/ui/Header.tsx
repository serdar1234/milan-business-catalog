'use client';

import React, { useState } from 'react';
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
import { Icon } from '@/layers/04_shared/ui/Icon';

export const Header: React.FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

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
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { md: 'none' } }}
        >
          <Icon iconName="Menu" />
        </IconButton>

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
            textAlign: { xs: 'left', md: 'left' },
          }}
        >
          Milan Catalog
        </Typography>

        <DesktopNavigation />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            sx={{ display: { xs: 'block', md: 'none' }, color: 'white' }}
          >
            <Icon iconName="Search" />
          </IconButton>

          <IconButton component={Link} href="/profile" sx={{ color: 'white' }}>
            <Icon iconName="User" />
          </IconButton>
        </Box>
      </Toolbar>

      <nav>
        <Drawer
          open={mobileOpen}
          onClose={handleDrawerToggle}
          anchor="right"
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 250 },
          }}
        >
          <MobileDrawerContent />
        </Drawer>
      </nav>
    </AppBar>
  );
};
