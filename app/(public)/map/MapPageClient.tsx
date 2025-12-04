'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState, useCallback } from 'react';

import Box from '@mui/material/Box';
import { useToggleDrawer } from '@/layers/04_shared/hooks/useToggleDrawer';
import MapSidebar from '@/layers/02_features/Map/MapSidebar';
import MapFilterDrawer from '@/layers/02_features/Map/MapFilterDrawer';
import { MapContainerClient } from '@/layers/02_features/Map';

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

  // Реф для debounce таймаута (browser setTimeout возвращает number)
  const timeoutRef = useRef<number | null>(null);

  // Вспомогательная функция — обновить URL (без эффектов)
  const replaceUrl = useCallback(
    (lat: number, lon: number, zoomLevel: number) => {
      if (isNavigatingAway.current) return;
      const params = new URLSearchParams();
      // console.log('[replaceUrl] raw coords:', lat, lon, zoomLevel);
      params.set('lat', lat.toFixed(6));
      params.set('lon', lon.toFixed(6));
      params.set('zoom', String(zoomLevel));
      const newUrl = `/map?${params.toString()}`;

      // console.log('[MapPageClient] router.replace ->', newUrl);
      // используем router.replace (App Router)
      router.replace(newUrl, { scroll: false });
    },
    [router],
  );

  // Debounced handler — гарантированно доступен сразу (нет useEffect гонок)
  const debouncedReplace = useCallback(
    (lat: number, lon: number, zoomLevel: number, delay = 50) => {
      if (timeoutRef.current) {
        window.clearTimeout(timeoutRef.current);
      }
      // setTimeout возвращает number в браузере
      timeoutRef.current = window.setTimeout(() => {
        replaceUrl(lat, lon, zoomLevel);
        timeoutRef.current = null;
      }, delay) as unknown as number;
    },
    [replaceUrl],
  );

  // Обработчики, которые передаются в MapContainerClient
  const handleMapMove = useCallback(
    (lat: number, lon: number, newZoom: number) => {
      // console.log('[MapPageClient] handleMapMove', lat, lon, newZoom);
      // console.log('[handleMapMove] args:', {
      //   lat,
      //   lon,
      //   newZoom,
      //   isLatNumber: typeof lat,
      //   isLonNumber: typeof lon,
      // });
      if (
        !Number.isFinite(lat) ||
        !Number.isFinite(lon) ||
        !Number.isFinite(newZoom)
      ) {
        console.warn(
          '[handleMapMove] skipping invalid coords',
          lat,
          lon,
          newZoom,
        );
        return;
      }
      setCenter([lat, lon]);
      setZoom(newZoom);
      debouncedReplace(lat, lon, newZoom);
    },
    [debouncedReplace],
  );

  const handleMapZoom = useCallback(
    (newZoom: number) => {
      const [lat, lon] = center;
      // console.log('[MapPageClient] handleMapZoom', newZoom);
      setZoom(newZoom);
      debouncedReplace(lat, lon, newZoom);
    },
    [center, debouncedReplace],
  );

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
