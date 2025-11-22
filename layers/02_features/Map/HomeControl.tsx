'use client';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useMap } from 'react-leaflet';
import NearMeIcon from '@mui/icons-material/NearMe';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createControl = (
  position: L.ControlPosition,
  map: L.Map,
  centralPosition?: L.LatLngTuple,
) => {
  const CustomControl = L.Control.extend({
    onAdd: function (map: L.Map) {
      const container = L.DomUtil.create(
        'div',
        'leaflet-bar leaflet-control leaflet-control-zoom',
      );
      const zoomInButton = L.DomUtil.create(
        'a',
        'leaflet-control-zoom-in',
        container,
      );
      zoomInButton.innerHTML = '+';
      zoomInButton.href = '#';
      zoomInButton.title = 'Zoom in';
      zoomInButton.style.color = 'var(--color-brand-primary)';

      const homeButton = L.DomUtil.create(
        'a',
        'leaflet-control-button',
        container,
      );
      const root = createRoot(homeButton);
      root.render(
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            cursor: 'pointer',
            color: 'var(--color-brand-primary)',
          }}
        >
          <NearMeIcon fontSize="small" />
        </span>,
      );
      homeButton.href = '#';
      homeButton.title = 'Back on track';

      const zoomOutButton = L.DomUtil.create(
        'a',
        'leaflet-control-zoom-out',
        container,
      );
      zoomOutButton.innerHTML = '−';
      zoomOutButton.href = '#';
      zoomOutButton.title = 'Zoom out';
      zoomOutButton.style.color = 'var(--color-brand-primary)';

      L.DomEvent.disableClickPropagation(container);

      L.DomEvent.on(zoomInButton, 'click', (e) => {
        L.DomEvent.stop(e);
        map.zoomIn();
      });

      L.DomEvent.on(homeButton, 'click', (e) => {
        L.DomEvent.stop(e);
        map.flyTo(centralPosition || [46.8523, -121.7605], 16);
      });

      L.DomEvent.on(zoomOutButton, 'click', (e) => {
        L.DomEvent.stop(e);
        map.zoomOut();
      });

      return container;
    },
  });

  return new CustomControl({ position: position });
};

export default function HomeControl({
  position,
  centralPosition,
}: {
  position: L.ControlPosition;
  centralPosition?: L.LatLngTuple;
}) {
  const map = useMap();

  useEffect(() => {
    const control = createControl(position, map, centralPosition);
    map.addControl(control);

    return () => {
      map.removeControl(control);
    };
  }, [map, position, centralPosition]);

  return null;
}
