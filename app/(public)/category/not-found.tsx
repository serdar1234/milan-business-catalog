import Link from 'next/link';
import { Box, Button, Typography, Paper } from '@mui/material';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

export default function NotFound() {
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
        <ErrorOutlineIcon
          sx={{
            fontSize: 64,
            color: 'statusError.main',
            mb: 2,
          }}
        />

        <Typography variant="h4" component="h1" sx={{ mb: 1, fontWeight: 600 }}>
          Sorry, this category was not found
        </Typography>

        <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
          The page you’re looking for doesn’t exist or may have been removed.
        </Typography>

        <Button
          component={Link}
          href="/"
          variant="contained"
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
      </Paper>
    </Box>
  );
}
