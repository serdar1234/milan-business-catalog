'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import LanguageIcon from '@mui/icons-material/Language';
import EuroIcon from '@mui/icons-material/Euro';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';

import { CURRENCIES, LANGUAGES } from '@/layers/04_shared/configs/settings';
import { usePreferenceSetting } from '@/layers/04_shared/hooks/usePreferenceSetting';

export const CurrencySwitch = ({ light }: { light?: boolean }) => {
  const [language, setLanguage] = usePreferenceSetting('language', 'en');
  const [currency, setCurrency] = usePreferenceSetting('currency', 'EUR');

  const [anchorLang, setAnchorLang] = useState<null | HTMLElement>(null);
  const [anchorCurr, setAnchorCurr] = useState<null | HTMLElement>(null);
  const lightModeStyle = light
    ? {}
    : {
        justifyContent: 'flex-end',
        margin: '1rem',
      };

  return (
    <Box sx={{ display: 'flex', gap: 1, ...lightModeStyle }}>
      <Box
        onClick={(e) => setAnchorLang(e.currentTarget)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          backgroundColor: light
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(255,255,255,0.05)',
        }}
      >
        <LanguageIcon sx={{ fontSize: 16, mr: 0.5 }} />
        <Typography variant="caption">
          {LANGUAGES.find((l) => l.code === language)?.name ?? language}
        </Typography>
      </Box>

      <Menu
        anchorEl={anchorLang}
        open={Boolean(anchorLang)}
        onClose={() => setAnchorLang(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {LANGUAGES.map((item) => (
          <MenuItem
            key={item.code}
            selected={language === item.code}
            onClick={() => {
              setLanguage(item.code);
              setAnchorLang(null);
            }}
          >
            <ListItemIcon>
              <LanguageIcon fontSize="small" />
            </ListItemIcon>
            {item.name}
          </MenuItem>
        ))}
      </Menu>

      <Box
        onClick={(e) => setAnchorCurr(e.currentTarget)}
        sx={{
          display: 'flex',
          alignItems: 'center',
          cursor: 'pointer',
          px: 1,
          py: 0.5,
          borderRadius: 1,
          backgroundColor: light
            ? 'rgba(255,255,255,0.15)'
            : 'rgba(255,255,255,0.05)',
        }}
      >
        {currency === 'EUR' ? (
          <EuroIcon sx={{ fontSize: 16, mr: 0.5 }} />
        ) : (
          <AttachMoneyIcon sx={{ fontSize: 16, mr: 0.5 }} />
        )}
        <Typography variant="caption">{currency}</Typography>
      </Box>

      <Menu
        anchorEl={anchorCurr}
        open={Boolean(anchorCurr)}
        onClose={() => setAnchorCurr(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
      >
        {CURRENCIES.map((item) => (
          <MenuItem
            key={item.code}
            selected={currency === item.code}
            onClick={() => {
              setCurrency(item.code);
              setAnchorCurr(null);
            }}
          >
            <ListItemIcon>
              {item.code === 'EUR' ? (
                <EuroIcon fontSize="small" />
              ) : (
                <AttachMoneyIcon fontSize="small" />
              )}
            </ListItemIcon>
            {item.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
};
