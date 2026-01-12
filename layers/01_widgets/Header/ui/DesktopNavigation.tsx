'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { useClientSetting } from '@/layers/04_shared/hooks/useClientSetting';
import { useGetCategoriesQuery } from '@/layers/03_entities/category/categoryApi';
import { SearchForm } from '@/layers/02_features/SearchForm/SearchForm';

export const DesktopNavigation: React.FC = () => {
  const [language] = useClientSetting('language', 'en');
  const { data: options } = useGetCategoriesQuery(language, {
    refetchOnMountOrArgChange: false,
  });
  console.log('options', options);
  const NAV_LINKS =
    options?.slice(0, 3).map((option) => ({
      href: `/category/${option.slug}`,
      label: option.name,
    })) ?? [];
  NAV_LINKS.push({ href: '/map', label: 'Map View' });

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
