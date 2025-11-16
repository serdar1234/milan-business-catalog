'use client';

import { Box, TextField, IconButton, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useRouter } from 'next/navigation';
import { useState, FormEvent } from 'react';
import { useDispatch } from 'react-redux';
import { addRecentSearch } from '@/layers/03_entities/search/model/slice';

export const SearchForm: React.FC<{
  hasBorder?: boolean;
  handleDrawerClose?: () => void;
}> = ({ hasBorder = false, handleDrawerClose }) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [query, setQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedQuery = query.trim();

    if (trimmedQuery) {
      setIsLoading(true);
      const encodedQuery = encodeURIComponent(trimmedQuery);
      router.push(`/search?q=${encodedQuery}`);
      dispatch(addRecentSearch(trimmedQuery));
      setQuery('');
      if (handleDrawerClose) handleDrawerClose();
      setIsLoading(false);
    }
  };
  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 360,
        height: '3rem',
        borderRadius: '0.5rem',
        border: hasBorder ? '1px solid var(--color-brand-accent)' : 'none',
        overflow: 'hidden',
        bgcolor: 'surface.main',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Find shops, restaurants, and more"
        sx={{
          '& .MuiOutlinedInput-root': {
            height: '3rem',
            padding: 0,
            '& fieldset': { border: 'none' },
            '& input': { height: '100%', padding: '0 14px' },
          },
        }}
        slotProps={{
          input: {
            endAdornment: (
              <IconButton
                type="submit"
                aria-label="search"
                sx={{
                  height: '100%',
                  width: '3rem',
                  borderRadius: 0,
                  bgcolor: 'brandAccent.main',
                  color: 'white',
                  '&:hover': {
                    bgcolor: 'brandAccent.main',
                    opacity: 0.9,
                  },
                }}
              >
                {isLoading ? (
                  <CircularProgress color="secondary" size={24} />
                ) : (
                  <SearchIcon />
                )}
              </IconButton>
            ),
          },
        }}
      />
    </Box>
  );
};
