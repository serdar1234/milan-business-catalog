'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useNavigationLinks } from '@/layers/04_shared/hooks/useNavigationLinks';
import { SearchForm } from '@/layers/02_features/SearchForm/SearchForm';

export const DesktopNavigation: React.FC = () => {
  const navLinks = useNavigationLinks(3);

  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'space-around',
        gap: 2,
        marginInline: '1rem',
      }}
    >
      {navLinks.map((link) => (
        <Button
          key={link.href}
          component={Link}
          href={link.href}
          sx={{
            color: 'var(--color-border-grey)',
            '&:hover': { color: 'white' },
            textTransform: 'capitalize',
            whiteSpace: 'nowrap',
            padding: '0.5rem',
          }}
        >
          {link.label}
        </Button>
      ))}
      <Box>
        <SearchForm />
      </Box>
    </Box>
  );
};
