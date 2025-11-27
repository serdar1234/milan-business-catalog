'use client';

import { useEffect } from 'react';
import { Box, Button, Typography, Paper, Grid } from '@mui/material';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import Link from 'next/link';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error('Business page error:', error);
  }, [error]);

  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        px: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          maxWidth: 480,
          width: '100%',
          p: 4,
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <ReportProblemIcon
          sx={{
            fontSize: 64,
            color: 'statusError.main',
            mb: 2,
          }}
        />

        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600 }}>
          Something went wrong
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          We couldn’t load this business page. Please try again or return home.
        </Typography>

        <Grid container spacing={2} justifyContent="center">
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={reset}
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.2,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Try again
          </Button>

          <Button
            component={Link}
            href="/"
            variant="outlined"
            color="primary"
            size="large"
            sx={{
              borderRadius: 2,
              px: 4,
              py: 1.2,
              textTransform: 'none',
              fontSize: '1rem',
            }}
          >
            Return Home
          </Button>
        </Grid>
      </Paper>
    </Box>
  );
}
