'use client';

import { Box, Typography } from '@mui/material';
import { redirect } from 'next/navigation';

export const FooterLogo: React.FC = () => {
  return (
    <Box
      sx={{ mb: 2, display: 'flex', alignItems: 'center', cursor: 'pointer' }}
      onClick={() => redirect('/')}
    >
      <Typography
        variant="h5"
        component="h6"
        fontWeight="bold"
        sx={{ color: 'brandAccent.main', mr: 1 }}
      >
        M
      </Typography>
      <Typography variant="h5" component="h6" fontWeight="bold">
        MilanoDiscover
      </Typography>
    </Box>
  );
};
