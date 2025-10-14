// layers/01_widgets/Header/ui/Header.tsx

import React from 'react';
import Link from 'next/link';
import { Icon } from '@/layers/04_shared/ui/Icon';
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Button,
} from '@mui/material';

const NAV_LINKS = [
  { href: '/shopping', label: 'Shopping' },
  { href: '/culture', label: 'Culture' },
  { href: '/food', label: 'Food & Drink' },
  { href: '/map', label: 'Map View' },
];

export const Header: React.FC = () => {
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
        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: 'none',
            color: 'white',
            fontWeight: 'bold',
            letterSpacing: '0.05em',
          }}
        >
          Milan Catalog
        </Typography>

        <Box
          sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 3,
          }}
        >
          {NAV_LINKS.map((link) => (
            <Button
              key={link.href}
              component={Link}
              href={link.href}
              sx={{ color: '#ccc', '&:hover': { color: 'white' } }}
            >
              {link.label}
            </Button>
          ))}
          <IconButton sx={{ color: 'white' }}>
            <Icon iconName="Search" />
          </IconButton>
        </Box>

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

        {/* В MUI часто используют Drawer или Menu для мобильного меню,
           но пока мы его пропускаем, чтобы сосредоточиться на логике. 
           Mobile-first меню будет добавлено позже. */}
      </Toolbar>
    </AppBar>
  );
};
