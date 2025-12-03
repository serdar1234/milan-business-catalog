'use client';

import { useEffect } from 'react';
import L from 'leaflet';
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  ScaleControl,
} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import Box from '@mui/material/Box';
import customDivIcon from '@/layers/04_shared/utils/customDivIcon';
import { MapFilterButton } from './MapFilterButton';
import HomeControl from './HomeControl';
import { MapUpdater } from '@/layers/04_shared/utils/MapUpdater';
import { MILAN_CENTER, ZOOM } from '@/layers/04_shared/utils/constants';
import { MapEventsHandler } from './MapEventsHandler';
import { ResizeHandler } from './ResizeHandler';

interface MapContainerClientProps {
  center?: [number, number];
  zoom?: number;
  showMapControls?: boolean;

  onFilterClick?: () => void;

  onMapMove?: (lat: number, lon: number, zoom: number) => void;
  onMapZoom?: (zoom: number) => void;
}

const MapContainerClient: React.FC<MapContainerClientProps> = ({
  center = MILAN_CENTER,
  zoom = ZOOM,
  showMapControls = false,
  onFilterClick,
  onMapMove,
  onMapZoom,
}) => {
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
        scrollWheelZoom={false}
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
      >
        <ResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <MapUpdater newPosition={center} />
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

export default MapContainerClient;
