import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Pagination from '@mui/material/Pagination';
import BusinessCardGrid from '@/layers/02_features/BusinessCardGrid';
import { SearchResults } from '@/layers/04_shared/hooks/useSearchResults';
import { Spinner } from '@/layers/04_shared/ui/Spinner';

interface BusinessListProps extends SearchResults {
  cols?: number;
  isSmall?: boolean;
}

export const BusinessList: React.FC<BusinessListProps> = ({
  page,
  setPage,
  businessList,
  meta,
  isLoading,
  isError,
  cols = 2,
  isSmall,
}) => {
  const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  if (isLoading) {
    return <Spinner bgcolor="transparent" />;
  }

  if (isError) {
    return (
      <Typography color="error.main" sx={{ textAlign: 'center', py: 4 }}>
        Failed to load featured businesses.
      </Typography>
    );
  }

  if (businessList && businessList.length === 0) {
    return (
      <Typography color="primary.main" sx={{ textAlign: 'center', p: 4 }}>
        Oops! We couldn&apos;t find any businesses matching your search. Please
        try again with different keywords.
      </Typography>
    );
  }

  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'background.paper',
        p: 2,
        borderRadius: '1rem',
        boxShadow: 2,
      }}
    >
      <Grid container spacing={2} width={'100%'}>
        <BusinessCardGrid
          data={businessList || []}
          cols={cols}
          isSmall={isSmall}
        />
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
          }}
        >
          <Pagination
            count={meta?.pagination.total_pages || 0}
            page={page}
            onChange={handleChange}
          />
        </Box>
      </Grid>
    </Box>
  );
};
