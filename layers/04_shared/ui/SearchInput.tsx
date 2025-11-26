import { AutocompleteRenderInputParams } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';

export const SearchInput = (params: AutocompleteRenderInputParams) => (
  <TextField
    {...params}
    fullWidth
    variant="outlined"
    placeholder="Find shops, restaurants, and more"
    sx={{
      '& .MuiOutlinedInput-root': {
        height: '3rem',
        minWidth: 200,
        padding: 0,
        '& fieldset': { border: 'none' },
        '& input': { height: '100%', padding: '0 14px !important' },
      },
    }}
  />
);
