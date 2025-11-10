import Link from 'next/link';
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { SearchForm } from '@/layers/02_features/Search/ui/SearchForm';

const NAV_LINKS = [
  { href: '/', label: 'Discover' },
  { href: '/category/shopping', label: 'Shopping' },
  { href: '/category/culture', label: 'Culture' },
  { href: '/category/food', label: 'Food & Drink' },
  { href: '/map', label: 'Map View' },
];

export const MobileDrawerContent: React.FC<{
  handleDrawerClose: () => void;
}> = ({ handleDrawerClose }) => {
  return (
    <Box sx={{ width: 250, bgcolor: 'background.default', height: '100%' }}>
      <Toolbar sx={{ backgroundColor: 'primary.main' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Navigation
        </Typography>
      </Toolbar>

      <Box sx={{ p: 2, pb: 1 }}>
        <SearchForm hasBorder />
      </Box>
      <Divider sx={{ mb: 1 }} />

      <List>
        {NAV_LINKS.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            href={item.href}
            onClick={handleDrawerClose}
            sx={{ textDecoration: 'none', color: 'text.primary' }}
          >
            <ListItemText primary={item.label} />
          </ListItem>
        ))}
      </List>
      {/* TODO: Сюда можно добавить кнопку Войти/Профиль */}
    </Box>
  );
};
