'use client';

import { useState } from 'react';
import Link from 'next/link';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MenuItem from '@mui/material/MenuItem';
import { useScrollLock } from '../hooks/useScrollLock';
import { Category, useGetCategoriesQuery } from '../api/categoriesApi';

const ITEM_HEIGHT = '50vh';

export default function LongMenu({ title }: { title: string }) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const [mobileOpen, setMobileOpen] = useState(false);
  useScrollLock(mobileOpen);
  const { data: options, error, isLoading } = useGetCategoriesQuery('en');

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    setMobileOpen(true);
  };
  const handleClose = () => {
    setAnchorEl(null);
    setMobileOpen(false);
  };
  if (error) return <div>error</div>;
  if (isLoading) return <div>loading</div>;

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
              width: '20ch',
            },
          },
          list: {
            'aria-labelledby': 'long-button',
          },
        }}
      >
        {isLoading && <p>Loading...</p>}
        {error && null}
        {(options &&
          options.data.map((option: Category) => (
            <Link
              key={option.id}
              href={`/category/${option.name.toLocaleLowerCase().replace(' ', '-')}`}
            >
              <MenuItem key={option.id} selected={option.id === 1}>
                {option.name}
              </MenuItem>
            </Link>
          ))) ||
          null}
      </Menu>
    </Box>
  );
}
