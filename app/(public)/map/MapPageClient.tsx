'use client';

import Box from '@mui/material/Box';
import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';
import MapSidebar from '@/layers/02_features/Map/MapSidebar';
import MapFilterDrawer from '@/layers/02_features/Map/MapFilterDrawer';
import { MapContainerClient } from '@/layers/02_features/Map';

interface Props {
  initialCenter?: [number, number];
  activeSlug?: string;
}

export default function MapPageClient({ initialCenter, activeSlug }: Props) {
  const { open, setOpen, toggleDrawer } = useToggleDrawer();
  const handleFilterToggle = () => setOpen(true);

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          position: { xs: 'fixed', md: 'static' },
          flexDirection: { xs: 'column', md: 'row' },
          height: 'calc(100vh - 64px)',
          width: '100%',
        }}
      >
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 60%' } }}>
          <MapContainerClient
            center={initialCenter}
            showMapControls
            activeSlug={activeSlug}
            onFilterClick={handleFilterToggle}
          />
        </Box>

        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '1 1 40%' },
            height: { xs: '80%', md: 'auto' },
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <MapSidebar activeSlug={activeSlug} />
        </Box>
      </Box>

      <MapFilterDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}
