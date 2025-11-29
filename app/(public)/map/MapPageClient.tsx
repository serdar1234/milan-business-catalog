'use client';

import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';

import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';
import MapSidebar from './components/MapSidebar';
import MapFilterDrawer from './components/MapFilterDrawer';
import { Spinner } from '@/layers/04_shared/ui/Spinner';

const MapContainerClient = dynamic(
  () =>
    import('@/layers/02_features/Map/MapContainerClient').then(
      (mod) => mod.MapContainerClient,
    ),
  {
    ssr: false,
    loading: () => <Spinner height="100%" />,
  },
);

interface Props {
  searchParams: {
    lat: string;
    lon: string;
    zoom: string;
  };
}

export default function MapPageClient({ searchParams }: Props) {
  const { open, setOpen, toggleDrawer } = useToggleDrawer();

  // параметры карты из URL
  const lat = parseFloat(searchParams.lat ?? '45.4641');
  const lon = parseFloat(searchParams.lon ?? '9.1919');
  const zoom = parseInt(searchParams.zoom ?? '13');

  console.log('lat', lat, 'lon', lon, 'zoom', zoom);

  const handleFilterToggle = () => {
    setOpen(true);
  };

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
        {/* MAP */}
        <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 60%' } }}>
          <MapContainerClient
            // lat={lat}
            // lon={lon}
            // zoom={zoom}
            showMapControls
            onFilterClick={handleFilterToggle}
          />
        </Box>

        {/* SIDEBAR (пока пустой) */}
        <Box
          sx={{
            flex: { xs: '1 1 auto', md: '1 1 40%' },
            height: { xs: '80%', md: 'auto' },
            overflowY: 'auto',
            scrollbarWidth: 'thin',
          }}
        >
          <MapSidebar />
        </Box>
      </Box>

      {/* DRAWER */}
      <MapFilterDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}
