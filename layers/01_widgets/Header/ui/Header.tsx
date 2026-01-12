import { FC } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileMenu } from './MobileMenu';
import { fetchCategories } from '@/layers/04_shared/utils/helpers.server';
import { SearchButton } from './SearchButton';

export const Header: FC = async () => {
  const categories = await fetchCategories(4);
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
        <MobileMenu categories={categories} />

        <Typography
          variant="h6"
          component={Link}
          href="/"
          sx={{
            textDecoration: 'none',
            color: 'primary.contrastText',
            fontWeight: 'bold',
            letterSpacing: '0.05rem',
            flexGrow: { xs: 1, md: 0 },
            textAlign: 'left',
            whiteSpace: 'nowrap',
          }}
        >
          Milan Catalog
        </Typography>

        <DesktopNavigation categories={categories} />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <SearchButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};
