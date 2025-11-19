'use client';

import { useEffect, useRef } from 'react';
import * as L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { GestureHandling } from 'leaflet-gesture-handling';
import 'leaflet-gesture-handling/dist/leaflet-gesture-handling.css';
import Box from '@mui/material/Box';
import customDivIcon from '@/layers/04_shared/utils/customDivIcon';

interface MapContainerClientProps {
  center?: [number, number];
  zoom?: number;
}

const ZOOM = 13;
const MILAN_CENTER: [number, number] = [45.4642, 9.19];

export const MapContainerClient: React.FC<MapContainerClientProps> = ({
  center = MILAN_CENTER,
  zoom = ZOOM,
}) => {
  const mapRef = useRef(null);
  useEffect(() => {
    L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
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
        <Marker icon={customDivIcon('Milano', true)} position={MILAN_CENTER}>
          <Popup offset={[0, -10]}>Benvenuti a Milano!</Popup>
        </Marker>
      </MapContainer>
    </Box>
  );
};
