'use client';

import { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
  useMapEvents,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import Box from '@mui/material/Box';
import customDivIcon from '@/layers/04_shared/utils/customDivIcon';
import { MapFilterButton } from './MapFilterButton';
import HomeControl from './HomeControl';
import { MapUpdater } from '@/layers/04_shared/utils/MapUpdater';

interface MapContainerClientProps {
  center: [number, number];
  zoom: number;
  showMapControls?: boolean;
  onFilterClick?: () => void;

  /** New props */
  onMapMove?: (lat: number, lon: number) => void;
  onMapZoom?: (zoom: number) => void;
}

function MapEventsHandler({
  onMapMove,
  onMapZoom,
}: {
  onMapMove?: (lat: number, lon: number) => void;
  onMapZoom?: (zoom: number) => void;
}) {
  useMapEvents({
    moveend(map) {
      const center = map.target.getCenter();
      onMapMove?.(center.lat, center.lng);
    },
    zoomend(map) {
      const zoom = map.target.getZoom();
      onMapZoom?.(zoom);
    },
  });

  return null;
}

const ZOOM = 13;
const MILAN_CENTER: [number, number] = [45.4642, 9.19];

export const MapContainerClient: React.FC<MapContainerClientProps> = ({
  center = MILAN_CENTER,
  zoom = ZOOM,
  showMapControls = false,
  onFilterClick,
  onMapMove,
  onMapZoom,
}) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet-gesture-handling').then(({ GestureHandling }) => {
        L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
      });
    }
  }, []);

  return (
    <Box
      sx={{
        height: '100%',
        width: '100%',
        '& .leaflet-container': { height: '100%' },
      }}
    >
      <MapContainer
        center={center}
        zoom={zoom}
        zoomControl={false}
        gestureHandling={true}
        gestureHandlingOptions={{
          text: {
            touch: 'Please use two fingers to move the map',
            scroll: 'Please use ctrl + scroll to zoom the map',
            scrollMac: 'Please use \u2318 + scroll to zoom the map',
          },
        }}
        style={{ height: '100%', width: '100%' }}
        ref={mapRef}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Обновление позиции при изменении search params */}
        <MapUpdater newPosition={center} />

        {/* Снимаем события карты */}
        <MapEventsHandler onMapMove={onMapMove} onMapZoom={onMapZoom} />

        {showMapControls && (
          <>
            <HomeControl position="topleft" centralPosition={center} />
            <ScaleControl position="bottomright" />
            {onFilterClick && (
              <MapFilterButton position="topright" onClick={onFilterClick} />
            )}
          </>
        )}

        <Marker icon={customDivIcon('Milano', true)} position={center}>
          <Popup offset={[0, -10]}>Benvenuti a Milano!</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};
