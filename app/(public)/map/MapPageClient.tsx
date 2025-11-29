'use client';

import dynamic from 'next/dynamic';
import { useRouter } from 'next/navigation';

import Box from '@mui/material/Box';
import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';
import MapSidebar from '@/layers/02_features/Map/MapSidebar';
import MapFilterDrawer from '@/layers/02_features/Map/MapFilterDrawer';
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

export default function MapPageClient({
  initialSearchParams,
}: {
  initialSearchParams: Record<string, string>;
}) {
  const { open, setOpen, toggleDrawer } = useToggleDrawer();
  const router = useRouter();

  const initialLat = parseFloat(initialSearchParams.lat ?? '45.4642');
  const initialLon = parseFloat(initialSearchParams.lon ?? '9.19');
  const initialZoom = parseInt(initialSearchParams.zoom ?? '13');

  function updateURL(lat: number, lon: number, zoom?: number) {
    const params = new URLSearchParams();

    params.set('lat', lat.toFixed(6));
    params.set('lon', lon.toFixed(6));
    if (zoom !== undefined) params.set('zoom', String(zoom));

    router.replace(`/map?${params.toString()}`);
  }

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
            center={[initialLat, initialLon]}
            zoom={initialZoom}
            onMapMove={(lat, lon) => updateURL(lat, lon)}
            onMapZoom={(zoom) => updateURL(initialLat, initialLon, zoom)}
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
