import Link from 'next/link';
import {
  Box,
  List,
  ListItem,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';

const NAV_LINKS = [
  { href: '/', label: 'Discover' },
  { href: '/shopping', label: 'Shopping' },
  { href: '/culture', label: 'Culture' },
  { href: '/food', label: 'Food & Drink' },
  { href: '/map', label: 'Map View' },
];

interface MobileDrawerContentProps {
  onClose: () => void;
}

export const MobileDrawerContent: React.FC<MobileDrawerContentProps> = ({
  onClose,
}) => {
  return (
    <Box
      sx={{ width: 250, bgcolor: 'background.default', height: '100%' }}
      onClick={onClose}
    >
      <Toolbar sx={{ backgroundColor: 'primary.main' }}>
        <Typography variant="h6" sx={{ color: 'white', fontWeight: 'bold' }}>
          Navigation
        </Typography>
      </Toolbar>
      <List>
        {NAV_LINKS.map((item) => (
          <ListItem
            key={item.label}
            component={Link}
            href={item.href}
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
