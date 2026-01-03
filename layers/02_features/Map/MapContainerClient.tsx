'use client';

import { useEffect } from 'react';
import L, { LatLngTuple } from 'leaflet';
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
import { MILAN_CENTER } from '@/layers/04_shared/utils/constants';
import { ZOOM } from '@/layers/04_shared/utils/constants';
import { ResizeHandler } from './ResizeHandler';
import { Business } from '@/layers/04_shared/types/types';

interface MapContainerClientProps {
  centerBusiness?: Business;
  businesses?: Business[];
  showMapControls?: boolean;
  activeSlug?: string;
  onFilterClick?: () => void;
}

const toLatLngTuple = (b: Business): LatLngTuple => [
  b.coordinates.lat,
  b.coordinates.lon,
];

const MapContainerClient: React.FC<MapContainerClientProps> = ({
  centerBusiness,
  businesses,
  showMapControls = false,
  activeSlug,
  onFilterClick,
}) => {
  useEffect(() => {
    if (typeof window !== 'undefined') {
      import('leaflet-gesture-handling').then(({ GestureHandling }) => {
        L.Map.addInitHook('addHandler', 'gestureHandling', GestureHandling);
      });
    }
  }, []);

  const center = centerBusiness ? toLatLngTuple(centerBusiness) : MILAN_CENTER;

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
        zoom={ZOOM}
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
      >
        <ResizeHandler />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {showMapControls && (
          <>
            <HomeControl position="topleft" centralPosition={center} />
            <ScaleControl position="bottomright" />
            {onFilterClick && (
              <MapFilterButton position="topright" onClick={onFilterClick} />
            )}
          </>
        )}

        {centerBusiness && (
          <Marker
            icon={customDivIcon(centerBusiness.name, true)}
            position={toLatLngTuple(centerBusiness)}
          >
            <Popup offset={[0, -10]}>
              <strong>{centerBusiness.name}</strong>
              <br />
              {centerBusiness.address}, {centerBusiness.city}
              <br />⭐ {centerBusiness.average_rating} (
              {centerBusiness.approved_reviews_count} reviews)
            </Popup>
          </Marker>
        )}
        {businesses?.map((business) => (
          <Marker
            key={business.id}
            position={toLatLngTuple(business)}
            icon={customDivIcon(business.name, business.slug === activeSlug)}
          >
            <Popup offset={[0, -10]}>
              <Box sx={{ minWidth: 200 }}>
                <strong>{business.name}</strong>
                <br />
                <span>{business.category.name}</span>
                <br />⭐ {business.average_rating} (
                {business.approved_reviews_count})
                <br />
                <span>{business.address}</span>
                <br />
                {business.isOpen !== undefined && (
                  <strong
                    style={{
                      color: business.isOpen ? 'green' : 'red',
                    }}
                  >
                    {business.isOpen ? 'Open now' : 'Closed'}
                  </strong>
                )}
              </Box>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </Box>
  );
};

export default MapContainerClient;
