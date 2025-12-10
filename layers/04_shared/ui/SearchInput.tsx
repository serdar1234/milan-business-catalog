'use client';

import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import CircularProgress from '@mui/material/CircularProgress';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import SearchIcon from '@mui/icons-material/Search';

interface SearchInputProps extends AutocompleteRenderInputParams {
  isLoading: boolean;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  isLoading,
  ...params
}) => (
  <>
    <TextField
      {...params}
      fullWidth
      variant="outlined"
      placeholder="Search..."
      sx={{
        '& .MuiOutlinedInput-root': {
          height: '3rem',
          minWidth: '14rem',
          padding: '0 !important',
          '& fieldset': { border: 'none' },
          '& input': { height: '100%', padding: '0 14px !important' },
        },
      }}
      slotProps={{
        input: {
          ...params.InputProps,
          endAdornment: (
            <>
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
            </>
          ),
        },
      }}
    />
  </>
);
