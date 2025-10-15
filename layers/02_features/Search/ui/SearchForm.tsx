'use client';

import { Box, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

export const SearchForm: React.FC = () => {
  return (
    <Box
      component="form"
      sx={{
        display: 'flex',
        alignItems: 'center',
        width: '100%',
        maxWidth: 360,
        height: '3rem',
        borderRadius: '0.5rem',
        overflow: 'hidden',
        bgcolor: 'surface.main',
      }}
    >
      <TextField
        fullWidth
        variant="outlined"
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
                <SearchIcon />
              </IconButton>
            ),
          },
        }}
      />
    </Box>
  );
};
