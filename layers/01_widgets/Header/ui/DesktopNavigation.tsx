import React from 'react';
import Link from 'next/link';
import { Button, Box } from '@mui/material';
import { SearchForm } from '@/layers/02_features/Search/ui/SearchForm';

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
        alignItems: 'space-around',
        gap: 2,
        marginInline: '1rem',
      }}
    >
      {NAV_LINKS.map((link) => (
        <Button
          key={link.href}
          component={Link}
          href={link.href}
          sx={{
            color: '#ccc',
            '&:hover': { color: 'white' },
            textTransform: 'capitalize',
            whiteSpace: 'nowrap',
            padding: '0.5rem',
          }}
        >
          {link.label}
        </Button>
      ))}
      <Box sx={{ width: 280, ml: 1, mr: -1 }}>
        <SearchForm />
      </Box>
    </Box>
  );
};
