'use client';

import { LatLngTuple } from 'leaflet';
import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

export function MapUpdater({ newPosition }: { newPosition?: LatLngTuple }) {
  const map = useMap();

  useEffect(() => {
    if (newPosition && Array.isArray(newPosition) && newPosition.length === 2) {
      map.setView(newPosition);
    }
  }, [newPosition, map]);

  return null;
}
