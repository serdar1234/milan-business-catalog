'use client';

import dynamic from 'next/dynamic';
import { Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import { CategoryBusinessList } from '@/layers/01_widgets/CategoryBusinessList/CategoryBusinessList';

const MapContainerClient = dynamic(
  () =>
    import('@/layers/02_features/Map/MapContainerClient').then(
      (mod) => mod.MapContainerClient,
    ),
  {
    ssr: false,
    loading: () => (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '60vh',
          backgroundColor: 'var(--color-secondary-main)',
        }}
      >
        <CircularProgress size={60} color="primary" />
      </div>
    ),
  },
);

export default function MapPage() {
  return (
    <Box
      sx={{
        display: 'flex',
        position: { xs: 'fixed', md: 'static' },
        flexDirection: { xs: 'column', md: 'row' },
        height: 'calc(100vh - 64px)',
        width: '100%',
      }}
    >
      <Box
        sx={{
          flex: { xs: '1 1 100%', md: '1 1 60%' },
        }}
      >
        <MapContainerClient showMapControls />
      </Box>

      <Box
        sx={{
          flex: { xs: '1 1 auto', md: '1 1 40%' },
          height: { xs: '80%', md: 'auto' },
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        <CategoryBusinessList cols={1} />
      </Box>
    </Box>
  );
}
