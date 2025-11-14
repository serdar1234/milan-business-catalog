import Box from '@mui/material/Box';
import {
  SearchHeaderMobile,
  SearchHeaderDesktop,
} from '@/layers/02_features/SearchHeaderVersions';
import type { ViewType } from '@/layers/02_features/SearchHeaderVersions';

interface SearchHeaderProps {
  totalResults: number;
  currentView: ViewType;
  onViewChange: (view: ViewType) => void;
  onFilterClick: () => void;
  pageTitle: string;
}

export const SearchHeader: React.FC<SearchHeaderProps> = (props) => {
  return (
    <>
      <Box sx={{ display: { xs: 'block', md: 'none' } }}>
        <SearchHeaderMobile {...props} />
      </Box>
      <Box sx={{ display: { xs: 'none', md: 'block' } }}>
        <SearchHeaderDesktop {...props} />
      </Box>
    </>
  );
};
