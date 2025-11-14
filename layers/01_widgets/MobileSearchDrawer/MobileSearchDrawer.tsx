'use client';

import { useState, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  Box,
  IconButton,
  InputBase,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  ListItem,
  Grid,
  Button,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SearchIcon from '@mui/icons-material/Search';
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';

import {
  selectIsSearchDrawerOpen,
  closeSearchDrawer,
  selectRecentSearches,
  addRecentSearch,
  clearRecentSearches,
} from '@/layers/03_entities/search/model/slice';

export const MobileSearchDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const isOpen = useSelector(selectIsSearchDrawerOpen);
  const recentSearches = useSelector(selectRecentSearches);
  const [currentQuery, setCurrentQuery] = useState('');
  const [historyKey, updateHistoryKey] = useState(42);

  const handleSearchSubmit = (event: FormEvent | string) => {
    const queryToSearch = typeof event === 'string' ? event : currentQuery;
    const trimmedQuery = queryToSearch.trim();

    if (trimmedQuery) {
      const encodedQuery = encodeURIComponent(trimmedQuery);
      dispatch(addRecentSearch(trimmedQuery));
      router.push(`/search?q=${encodedQuery}`);
      dispatch(closeSearchDrawer());
      setCurrentQuery('');
    }
    if (typeof event !== 'string') {
      event.preventDefault();
    }
  };

  const handleClose = () => {
    dispatch(closeSearchDrawer());
  };

  const isRecentSearchListVisible = recentSearches.length > 0;

  function handleClearRecentSearches(): void {
    dispatch(clearRecentSearches());
    updateHistoryKey((prev) => prev + 1);
  }

  return (
    <Drawer
      anchor="top"
      open={isOpen}
      onClose={handleClose}
      slotProps={{
        paper: {
          sx: { width: '100%', height: '100vh', zIndex: 10 },
        },
      }}
    >
      <Box sx={{ pt: 1, px: 2, height: '100%' }}>
        <Box
          component="form"
          onSubmit={handleSearchSubmit}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            mb: 2,
            p: 0.5,
            borderRadius: '8px',
            border: '1px solid var(--color-border-grey)',
            bgcolor: 'background.paper',
          }}
        >
          <IconButton onClick={handleClose} aria-label="back">
            <ArrowBackIcon />
          </IconButton>

          <InputBase
            autoFocus
            fullWidth
            placeholder="Find shops, restaurants, and more..."
            value={currentQuery}
            onChange={(e) => setCurrentQuery(e.target.value)}
            type="search"
          />

          {currentQuery.length > 0 ? (
            <IconButton onClick={() => setCurrentQuery('')} aria-label="clear">
              <CloseIcon />
            </IconButton>
          ) : (
            <IconButton type="submit" aria-label="search">
              <SearchIcon />
            </IconButton>
          )}
        </Box>

        {isRecentSearchListVisible && (
          <Box>
            <Grid container>
              <Grid size={6} sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="subtitle2" color="text.secondary">
                  Recent Searches
                </Typography>
              </Grid>
              <Grid
                size={6}
                sx={{ display: 'flex', justifyContent: 'flex-end' }}
              >
                <Button
                  onClick={() => handleClearRecentSearches()}
                  size="small"
                  startIcon={<CloseIcon />}
                  color="statusFeatured"
                  variant="outlined"
                  sx={{ textTransform: 'capitalize', alignSelf: 'flex-end' }}
                >
                  Clear history
                </Button>
              </Grid>
            </Grid>
            <List key={historyKey}>
              {recentSearches.map((query) => (
                <ListItem disablePadding key={query}>
                  <ListItemButton onClick={() => handleSearchSubmit(query)}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <HistoryIcon color="action" />
                    </ListItemIcon>
                    <ListItemText primary={query} />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};
