'use client';

import Link from 'next/link';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { useNavigationLinks } from '@/layers/04_shared/hooks/useNavigationLinks';
import { SearchForm } from '@/layers/02_features/SearchForm/SearchForm';
import { LanguageCurrencySwitcher } from '@/layers/01_widgets/LanguageCurrencySwitcher';

export const MobileDrawerContent: React.FC<{
  handleDrawerClose: () => void;
}> = ({ handleDrawerClose }) => {
  const navLinks = useNavigationLinks(5);

  return (
    <Box sx={{ width: 250, bgcolor: 'background.default', height: '100%' }}>
      <Toolbar sx={{ backgroundColor: 'primary.main' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Navigation
        </Typography>
      </Toolbar>

      <Box sx={{ p: 2, pb: 1 }}>
        <SearchForm hasBorder handleDrawerClose={handleDrawerClose} />
      </Box>
      <Divider sx={{ mb: 1 }} />

      <List>
        {navLinks.map((item) => (
          <ListItem
            key={item.href}
            component={Link}
            href={item.href}
            onClick={handleDrawerClose}
            sx={{ textDecoration: 'none', color: 'text.primary' }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>

      <LanguageCurrencySwitcher />
    </Box>
  );
};
