'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import Box from '@mui/material/Box';
import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';
import MapSidebar from '@/layers/02_features/Map/MapSidebar';
import MapFilterDrawer from '@/layers/02_features/Map/MapFilterDrawer';
import { MapContainerClient } from '@/layers/02_features/Map';

function debounce<F extends (...args: number[]) => void>(fn: F, delay: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => fn(...args), delay);
  };
}

export default function MapPageClient() {
  const { open, setOpen, toggleDrawer } = useToggleDrawer();
  const router = useRouter();

  const isNavigatingAway = useRef(false);

  useEffect(() => {
    return () => {
      isNavigatingAway.current = true;
    };
  }, []);

  // Начальные значения
  const [center, setCenter] = useState<[number, number]>([45.4642, 9.19]);
  const [zoom, setZoom] = useState(13);

  // Функция обновления URL
  const updateURL = useRef<
    ((lat: number, lon: number, zoom: number) => void) | null
  >(null);

  useEffect(() => {
    updateURL.current = debounce(
      (lat: number, lon: number, zoomLevel: number) => {
        if (isNavigatingAway.current) return;

        const params = new URLSearchParams();
        params.set('lat', lat.toFixed(6));
        params.set('lon', lon.toFixed(6));
        params.set('zoom', String(zoomLevel));

        router.replace(`/map?${params.toString()}`, { scroll: false });
      },
      50,
    );

    return () => {
      updateURL.current = null;
    };
  }, [router]);

  const handleMapMove = (lat: number, lon: number, newZoom: number) => {
    setCenter([lat, lon]);
    setZoom(newZoom);
    updateURL.current?.(lat, lon, newZoom);
  };

  const handleMapZoom = (newZoom: number) => {
    const [lat, lon] = center;
    setZoom(newZoom);
    updateURL.current?.(lat, lon, newZoom);
  };

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
            center={center}
            zoom={zoom}
            onMapMove={handleMapMove}
            onMapZoom={handleMapZoom}
            showMapControls
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
          <MapSidebar />
        </Box>
      </Box>

      <MapFilterDrawer open={open} toggleDrawer={toggleDrawer} />
    </>
  );
}
