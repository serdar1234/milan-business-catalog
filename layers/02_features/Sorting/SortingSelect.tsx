'use client';

import React from 'react';
import {
  FormControl,
  Select,
  MenuItem,
  SelectChangeEvent,
  Typography,
  Box,
} from '@mui/material';

const SORT_OPTIONS = [
  { value: 'rating_desc', label: 'By Rating (Highest)' },
  { value: 'distance_asc', label: 'By Distance (Nearest)' },
  { value: 'price_asc', label: 'By Price (Lowest)' },
  { value: 'name_asc', label: 'Alphabetical (A-Z)' },
];

interface SortingSelectProps {
  currentSort: string;
  onSortChange: (sortKey: string) => void;
}

export const SortingSelect: React.FC<SortingSelectProps> = ({
  currentSort,
  onSortChange,
}) => {
  const handleChange = (event: SelectChangeEvent) => {
    onSortChange(event.target.value as string);
  };

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography
        variant="body2"
        color="text.secondary"
        sx={{ whiteSpace: 'nowrap' }}
      >
        Sort By:
      </Typography>
      <FormControl variant="outlined" size="small" sx={{ minWidth: 160 }}>
        <Select
          value={currentSort}
          onChange={handleChange}
          displayEmpty
          inputProps={{ 'aria-label': 'Sort options' }}
        >
          {SORT_OPTIONS.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};
