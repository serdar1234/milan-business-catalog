import { AutocompleteResult } from '@/layers/04_shared/types/types';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

interface SearchOptionItemProps {
  props: React.HTMLAttributes<HTMLLIElement> & { key: React.Key };
  option: AutocompleteResult;
}

export const SearchOptionItem: React.FC<SearchOptionItemProps> = ({
  props,
  option,
}) => {
  const { key, ...noKeyProps } = props;
  return (
    <li {...noKeyProps} key={key}>
      <Box>
        <Typography variant="body1">{option.name}</Typography>
        <Typography variant="caption" color="text.secondary">
          {option.city}
        </Typography>
      </Box>
    </li>
  );
};
