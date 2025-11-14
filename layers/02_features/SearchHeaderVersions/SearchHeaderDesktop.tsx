'use client';

import React from 'react';
import {
  Box,
  Typography,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { List as ListIcon, Apps as GridIcon } from '@mui/icons-material';

type ViewType = 'list' | 'map' | 'grid'; // Используем 'list' и 'map' для consistency, но здесь добавим 'grid'

interface SearchHeaderDesktopProps {
  totalResults: number;
  pageTitle: string;
  // Предполагаем, что десктоп может иметь 3 вида: List (карта внизу), Map (карта слева), Grid (карта внизу)
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
}

// Опции для переключения вида List/Grid
// const DESKTOP_VIEW_OPTIONS: { value: 'list' | 'grid'; label: string }[] = [
//   { value: 'list', label: 'List' },
//   { value: 'grid', label: 'Grid' },
// ];

// Опции сортировки (могут быть взяты из shared/api/mocks или Redux)
const SORT_OPTIONS: { value: string; label: string }[] = [
  { value: 'distance', label: 'Distance' },
  { value: 'rating', label: 'Rating' },
  { value: 'price', label: 'Price' },
  { value: 'popular', label: 'Popular' },
];

export const SearchHeaderDesktop: React.FC<SearchHeaderDesktopProps> = ({
  totalResults,
  pageTitle,
  currentView,
  onViewChange,
}) => {
  // 🚨 Заглушка для текущей сортировки (должно управляться Redux/URL)
  const [currentSort, setCurrentSort] = React.useState('distance');

  const handleSortChange = (event: { target: { value: unknown } }) => {
    // 🚨 В реальном проекте: dispatch(setSort(event.target.value as string));
    setCurrentSort(event.target.value as string);
  };

  // Функция для переключения List/Grid
  const handleViewChange = (
    event: React.MouseEvent<HTMLElement>,
    newView: 'list' | 'grid' | null,
  ) => {
    if (newView !== null) {
      // Если выбран Map, можно использовать 'map' из пропсов, но пока ограничимся List/Grid
      onViewChange(newView);
    }
  };

  return (
    <Box
      sx={{
        py: 2,
        px: 3,
        borderBottom: '1px solid var(--color-border-grey)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">
          {pageTitle}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Found {totalResults} places
        </Typography>
      </Box>

      <Box display="flex" alignItems="center" gap={2}>
        <FormControl variant="outlined" size="small" sx={{ minWidth: 120 }}>
          <InputLabel id="sort-by-label">Sort by:</InputLabel>
          <Select
            labelId="sort-by-label"
            value={currentSort}
            onChange={handleSortChange}
            label="Sort by:"
          >
            {SORT_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <ToggleButtonGroup
          value={currentView === 'map' ? 'list' : currentView}
          exclusive
          onChange={handleViewChange}
          size="small"
          sx={{
            bgcolor: 'background.paper',
            borderRadius: '8px',
            border: '1px solid var(--color-border-grey)',
            '& .MuiToggleButtonGroup-grouped': {
              border: 'none',
              borderRadius: '8px !important',
              '&.Mui-selected': {
                bgcolor: 'brandAccent.main',
                color: 'white',
                '&:hover': { bgcolor: 'brandAccent.dark' },
              },
            },
          }}
        >
          <ToggleButton value="list" aria-label="list view">
            <ListIcon
              sx={{ color: currentView === 'list' ? 'white' : 'text.primary' }}
            />
            List
          </ToggleButton>
          <ToggleButton value="grid" aria-label="grid view">
            <GridIcon
              sx={{ color: currentView === 'grid' ? 'white' : 'text.primary' }}
            />
            Grid
          </ToggleButton>
        </ToggleButtonGroup>
      </Box>
    </Box>
  );
};
