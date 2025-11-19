import { Box, Typography, Paper } from '@mui/material';

export const MapSidebar: React.FC = () => {
  return (
    <Paper
      elevation={3}
      sx={{
        p: 2,
        height: '100%',
        overflowY: 'auto',
      }}
    >
      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Filters and places
      </Typography>
      <Typography variant="body2" color="text.secondary">
        There will be filters and places here
      </Typography>

      {Array.from({ length: 20 }).map((_, i) => (
        <Box
          key={i}
          sx={{
            mt: 2,
            p: 1,
            border: '1px dashed var(--color-border-grey)',
            borderRadius: '4px',
          }}
        >
          <Typography variant="body2">Element #{i + 1}</Typography>
        </Box>
      ))}
    </Paper>
  );
};
