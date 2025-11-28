'use client';

import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { openSearchDrawer } from '@/layers/03_entities/search/model/slice';
import Link from 'next/link';

import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import HomeIcon from '@mui/icons-material/Home';
import MapIcon from '@mui/icons-material/Map';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

const NAV_ITEMS = [
  { label: 'Home', icon: HomeIcon, href: '/' },
  { label: 'Map', icon: MapIcon, href: '/map' },
  { label: 'Search', icon: TravelExploreIcon, href: '/map' },
  { label: 'Saved', icon: FavoriteIcon, href: '#' },
  { label: 'Profile', icon: PersonIcon, href: '#' },
];
type NavLabel = 'Home' | 'Map' | 'Search' | 'Saved' | 'Profile';

const MobileNavBar: React.FC = () => {
  const [activeNav, setActiveNav] = useState<NavLabel>('Home');

  const dispatch = useDispatch();
  const handleSearchClick = () => {
    dispatch(openSearchDrawer());
  };
  const handleClick = (label: NavLabel) => {
    setActiveNav(label);
    if (label === 'Search') handleSearchClick();
  };

  return (
    <>
      <AppBar
        component={'nav'}
        id="mobile-nav-bar"
        position="fixed"
        sx={{
          top: 'auto',
          bottom: 0,
          bgcolor: 'background.paper',
          display: { xs: 'block', md: 'none' },
          boxShadow: 8,
          borderTop: '1px solid var(--color-border-grey)',
        }}
      >
        <Toolbar
          sx={{
            display: 'flex',
            justifyContent: 'space-around',
            minHeight: 64,
            p: 0,
          }}
        >
          {NAV_ITEMS.map((item) => {
            const IconComponent = item.icon;
            const isActive = item.label === activeNav;
            const isSearch = item.label === 'Search';

            return (
              <Box
                key={item.label}
                component={isSearch ? 'span' : Link}
                href={isSearch ? undefined : item.href}
                aria-label={item.label}
                onClick={() => handleClick(item.label as NavLabel)}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textDecoration: 'none',
                  color: isActive ? 'brandAccent.main' : 'text.secondary',
                  py: 1,
                  cursor: 'pointer',
                  minWidth: 60,
                }}
              >
                <IconComponent
                  sx={{
                    fontSize: 24,
                    mb: 0.2,
                    color: isActive ? 'brandAccent.main' : 'text.secondary',
                  }}
                />
                <Typography
                  variant="caption"
                  fontWeight={isActive ? 'bold' : 'normal'}
                >
                  {item.label}
                </Typography>
              </Box>
            );
          })}
        </Toolbar>
      </AppBar>
    </>
  );
};

export default MobileNavBar;
