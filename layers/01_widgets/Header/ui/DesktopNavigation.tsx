import React from 'react';
import Link from 'next/link';
import { Button, IconButton, Box } from '@mui/material';
import { Icon } from '@/layers/04_shared/ui/Icon';

const NAV_LINKS = [
  { href: '/shopping', label: 'Shopping' },
  { href: '/culture', label: 'Culture' },
  { href: '/food', label: 'Food & Drink' },
  { href: '/map', label: 'Map View' },
];

export const DesktopNavigation: React.FC = () => {
  return (
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
  );
};
