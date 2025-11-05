'use client';

import { useState } from 'react';
import { Box, Button } from '@mui/material';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import { useScrollLock } from '../hooks/useScrollLock';

const options = ['Atria', 'Callisto', 'Dione', 'Ganymede', 'Hangouts Call'];

const ITEM_HEIGHT = '50vh';

export default function LongMenu({ title }: { title: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [mobileOpen, setMobileOpen] = useState(false);
  useScrollLock(mobileOpen);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMobileOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMobileOpen(false);
  };

  return (
    <Box
      sx={{
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: '1rem',
        boxShadow: 2,
      }}
    >
      <Button
        aria-label="more"
        id="categories-button"
        aria-controls={open ? 'long-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup="true"
        variant="outlined"
        color="primary"
        disableElevation
        onClick={handleClick}
        endIcon={<KeyboardArrowDownIcon />}
        sx={{
          fontFamily: (theme) => theme.typography.fontFamily,
          '&:hover': { backgroundColor: 'transparent', cursor: 'pointer' },
        }}
      >
        {title}
      </Button>
      <Menu
        id="long-menu"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        slotProps={{
          paper: {
            style: {
              maxHeight: ITEM_HEIGHT,
              width: '20ch',
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
        }}
      >
        {options.map((option) => (
          <MenuItem
            key={option}
            selected={option === 'Pyxis'}
            onClick={handleClose}
          >
            {option}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
