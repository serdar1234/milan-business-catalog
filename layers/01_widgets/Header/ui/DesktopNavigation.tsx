import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import { SearchForm } from '@/layers/02_features/SearchForm/SearchForm';
import { Category } from '@/layers/03_entities/category/categoryApi';

export const DesktopNavigation = ({
  categories,
}: {
  categories: Category[] | null;
}) => {
  return (
    <Box
      sx={{
        display: { xs: 'none', md: 'flex' },
        alignItems: 'space-around',
        gap: 2,
        marginInline: '1rem',
      }}
    >
      {categories &&
        categories.map((category) => (
          <Button
            key={category.id}
            component={Link}
            href={`/category/${category.slug}`}
            sx={{
              color: 'var(--color-border-grey)',
              '&:hover': { color: 'white' },
              textTransform: 'capitalize',
              whiteSpace: 'nowrap',
              padding: '0.5rem',
            }}
          >
            {category.name}
          </Button>
        ))}
      <Box>
        <SearchForm />
      </Box>
    </Box>
  );
};
