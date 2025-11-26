'use client';

import { useState, useRef, FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import {
  Drawer,
  Box,
  IconButton,
  Typography,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Grid,
  Button,
  Autocomplete,
  TextField,
  ListItem,
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

import {
  AutocompleteResult,
  useGetAutocompleteSuggestionsQuery,
} from '@/layers/03_entities/search/api/searchApi';

import { useDebounce } from '@/layers/04_shared/hooks/useDebounce';
import { useCurrentLanguage } from '@/layers/04_shared/hooks/useCurrentLanguage';
import { SearchOptionItem } from '@/layers/04_shared/ui/SearchOptionItem';

export const MobileSearchDrawer: React.FC = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const isOpen = useSelector(selectIsSearchDrawerOpen);
  const recentSearches = useSelector(selectRecentSearches);

  const [query, setQuery] = useState('');
  const [selectedOption, setSelectedOption] =
    useState<AutocompleteResult | null>(null);
  const [historyKey, updateHistoryKey] = useState(42);

  const ref = useRef<HTMLInputElement>(null);
  const currentLang = useCurrentLanguage();
  const debouncedQuery = useDebounce(query, 500);

  const { data: suggestions, isFetching } = useGetAutocompleteSuggestionsQuery(
    { q: debouncedQuery, limit: 10, lang: currentLang },
    { skip: debouncedQuery.trimStart() === '' },
  );

  const localOptions = query === '' ? [] : (suggestions ?? []);

  const setInputFocus = () => {
    ref.current?.focus();
  };

  const handleCloseDrawer = () => {
    dispatch(closeSearchDrawer());
  };

  const runSearch = (searchValue: string) => {
    const trimmed = searchValue.trim();
    if (!trimmed) return;
    const encodedQuery = encodeURIComponent(trimmed);
    dispatch(addRecentSearch(trimmed));
    router.push(`/search?q=${encodedQuery}`);
    dispatch(closeSearchDrawer());
    setQuery('');
    setSelectedOption(null);
  };

  const handleClearRecentSearches = () => {
    dispatch(clearRecentSearches());
    updateHistoryKey((prev) => prev + 1);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const finalValue = selectedOption?.name || query.trim();
    if (finalValue) runSearch(finalValue);
  };

  const handleClearInput = () => {
    setQuery('');
    setSelectedOption(null);
  };

  return (
    <Drawer
      anchor="top"
      open={isOpen}
      onClose={handleCloseDrawer}
      slotProps={{
        paper: {
          sx: { width: '100%', height: '100vh', zIndex: 10 },
        },
        transition: {
          onEntered: setInputFocus,
        },
      }}
    >
      <Box
        sx={{ pt: 1, px: 2, height: '100%' }}
        component="form"
        onSubmit={handleSubmit}
      >
        <Autocomplete<AutocompleteResult, false, false, true>
          freeSolo
          options={localOptions}
          inputValue={query}
          onInputChange={(_, value) => setQuery(value)}
          onChange={(_, value) => {
            if (typeof value === 'string') setQuery(value);
            else if (value) runSearch(value.name);
          }}
          onClose={handleClearInput}
          loading={isFetching}
          loadingText="Searching..."
          getOptionLabel={(opt) => (typeof opt === 'string' ? opt : opt.name)}
          isOptionEqualToValue={(a, b) => a.id === b.id}
          renderInput={(params) => (
            <TextField
              {...params}
              inputRef={ref}
              placeholder="Find shops, restaurants, and more..."
              variant="outlined"
              fullWidth
              sx={{
                '& .MuiOutlinedInput-root': {
                  height: '3rem',
                  padding: 0,
                  '& fieldset': {
                    border: '1px solid var(--color-border-grey)',
                  },
                  '& input': { height: '100%', padding: '0 14px !important' },
                },
              }}
              slotProps={{
                input: {
                  ...params.InputProps,
                  startAdornment: (
                    <>
                      <IconButton onClick={handleCloseDrawer}>
                        <ArrowBackIcon />
                      </IconButton>
                      {params.InputProps?.startAdornment}
                    </>
                  ),
                  endAdornment:
                    query.length > 0 ? (
                      <>
                        <IconButton onClick={handleClearInput}>
                          <CloseIcon />
                        </IconButton>
                      </>
                    ) : (
                      <>
                        <IconButton type="submit">
                          <SearchIcon />
                        </IconButton>
                        {params.InputProps?.endAdornment}
                      </>
                    ),
                },
              }}
            />
          )}
          renderOption={(props, option) => (
            <SearchOptionItem props={props} option={option} key={option.id} />
          )}
        />

        {recentSearches.length > 0 && (
          <Box sx={{ mt: 2 }}>
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
                  onClick={handleClearRecentSearches}
                  size="small"
                  startIcon={<CloseIcon />}
                  variant="outlined"
                  sx={{ textTransform: 'capitalize' }}
                >
                  Clear history
                </Button>
              </Grid>
            </Grid>

            <List key={historyKey}>
              {recentSearches.map((q) => (
                <ListItem disablePadding key={q}>
                  <ListItemButton onClick={() => runSearch(q)}>
                    <ListItemIcon sx={{ minWidth: 40 }}>
                      <HistoryIcon color="action" />
                    </ListItemIcon>
                    <ListItemText primary={q} />
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
