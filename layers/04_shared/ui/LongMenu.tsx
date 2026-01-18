'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import { useScrollLock } from '../hooks/useScrollLock';
import { Category } from '@/layers/04_shared/types/types';

const ITEM_HEIGHT = '50vh';

interface LongMenuProps {
  title: string;
  categories: Category[] | null;
}

export function LongMenu({ title, categories }: LongMenuProps) {
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
        variant="text"
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
              minWidth: 300,
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
        }}
      >
        {categories?.map((option) => (
          <MenuItem
            key={option.id}
            selected={option.id === 1}
            component="a"
            href={`/category/${option.slug}`}
          >
            {option.name}
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}
