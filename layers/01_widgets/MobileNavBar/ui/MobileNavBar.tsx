import { AppBar, Toolbar, Box, Typography } from '@mui/material';
import Link from 'next/link';

import HomeIcon from '@mui/icons-material/Home';
import SearchIcon from '@mui/icons-material/Search';
import MapIcon from '@mui/icons-material/Map';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';

const NAV_ITEMS = [
  { label: 'Home', icon: HomeIcon, href: '/', active: true },
  { label: 'Search', icon: SearchIcon, href: '/search', active: false },
  { label: 'Map', icon: MapIcon, href: '/map', active: false },
  { label: 'Saved', icon: FavoriteIcon, href: '/saved', active: false },
  { label: 'Profile', icon: PersonIcon, href: '/profile', active: false },
];

const MobileNavBar: React.FC = () => {
  return (
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
        borderTop: '1px solid #eee',
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
          const isActive = item.active;

          return (
            <Box
              key={item.label}
              component={Link}
              href={item.href}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textDecoration: 'none',
                color: isActive ? 'brandAccent.main' : 'text.secondary',
                py: 1,
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
  );
};

export default MobileNavBar;
