import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SearchForm } from '@/layers/02_features/SearchForm/SearchForm';

const NAV_LINKS = [
  { href: '/category/hospitality-5', label: 'Hospitality' },
  { href: '/category/retail-6', label: 'Retail' },
  { href: '/category/transportation-8', label: 'Transportation' },
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
