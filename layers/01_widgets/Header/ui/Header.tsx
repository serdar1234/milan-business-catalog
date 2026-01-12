'use client';

import { FC, useState } from 'react';
import { useDispatch } from 'react-redux';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { DesktopNavigation } from './DesktopNavigation';
import { MobileDrawerContent } from './MobileDrawerContent';
import { SharedIcon } from '@/layers/04_shared/ui/Icon';
import { useScrollLock } from '@/layers/04_shared/hooks/useScrollLock';
import { openSearchDrawer } from '@/layers/03_entities/search/model/slice';
import { useClientSetting } from '@/layers/04_shared/hooks/useClientSetting';
import { useGetCategoriesQuery } from '@/layers/03_entities/category/categoryApi';
import { Spinner } from '@/layers/04_shared/ui/Spinner';

export const Header: FC = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  useScrollLock(mobileOpen);
  const [language] = useClientSetting('language', 'en');

  const { data: options, isError } = useGetCategoriesQuery(language, {
    refetchOnMountOrArgChange: false,
  });
  console.log('options', options);
  const dispatch = useDispatch();

  const handleSearchClick = (event: React.MouseEvent) => {
    event.preventDefault();
    dispatch(openSearchDrawer());
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  if (isError) return null;

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
          sx={{ display: { md: 'none' }, mr: 2 }}
        >
          <SharedIcon iconName="Menu" />
        </IconButton>

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

        <DesktopNavigation />

        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton
            onClick={handleSearchClick}
            sx={{
              display: { xs: 'block', md: 'none' },
              color: 'primary.contrastText',
            }}
          >
            <SharedIcon iconName="Search" />
          </IconButton>
        </Box>
      </Toolbar>

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
          <MobileDrawerContent handleDrawerClose={handleDrawerToggle} />
        </Drawer>
      </nav>
    </AppBar>
  );
};
