import { Divider, Typography } from '@mui/material';

const FilterHeader = ({ title }: { title: string }) => (
  <>
    <Divider sx={{ mb: 2 }} />
    <Typography variant="subtitle1" fontWeight="bold" sx={{ mt: 1, mb: 1 }}>
      {title}
    </Typography>
  </>
);

export { FilterHeader };
