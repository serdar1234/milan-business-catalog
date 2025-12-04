'use client';

import { useMapEvents } from 'react-leaflet';
import { useEffect, useRef } from 'react';

export function MapEventsHandler({
  onMapMove,
  onMapZoom,
}: {
  onMapMove?: (lat: number, lon: number, zoom: number) => void;
  onMapZoom?: (zoom: number) => void;
}) {
  const isActive = useRef(true);

  useEffect(() => {
    return () => {
      isActive.current = false;
    };
  }, []);

  useMapEvents({
    moveend(e) {
      const center = e.target.getCenter();
      const zoom = e.target.getZoom();
      onMapMove?.(center.lat, center.lng, zoom);
    },
    zoomend(e) {
      const zoom = e.target.getZoom();
      onMapZoom?.(zoom);
    },
  });

  return null;
}
