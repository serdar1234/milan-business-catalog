'use client';

import { useDispatch } from 'react-redux';
import IconButton from '@mui/material/IconButton';
import { SharedIcon } from '@/layers/04_shared/ui/Icon';
import { openSearchDrawer } from '@/layers/03_entities/search/model/slice';

export const SearchButton = () => {
  const dispatch = useDispatch();

  const handleSearchClick = (e: React.MouseEvent) => {
    e.preventDefault();
    dispatch(openSearchDrawer());
  };

  return (
    <IconButton
      onClick={handleSearchClick}
      sx={{
        display: { xs: 'block', md: 'none' },
        color: 'primary.contrastText',
      }}
    >
      <SharedIcon iconName="Search" />
    </IconButton>
  );
};
