'use client';

import { useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { useMap } from 'react-leaflet';
import { FilterList as FilterIcon } from '@mui/icons-material';
import * as L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const createFilterControl = (
  position: L.ControlPosition,
  onFilterClick?: () => void,
) => {
  const FilterControl = L.Control.extend({
    onAdd: function () {
      const container = L.DomUtil.create('div', 'leaflet-bar leaflet-control');

      const button = L.DomUtil.create('a', 'leaflet-control-button', container);

      const root = createRoot(button);
      root.render(
        <span
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            width: '100%',
            color: 'var(--color-brand-primary)',
            cursor: 'pointer',
          }}
        >
          <FilterIcon fontSize="small" />
        </span>,
      );
      button.title = 'Toggle filters';

      L.DomEvent.on(button, 'click', (e) => {
        L.DomEvent.stop(e);
        if (onFilterClick) onFilterClick();
      });

      L.DomEvent.disableClickPropagation(container);

      return container;
    },
  });

  return new FilterControl({ position });
};

export function MapFilterButton({
  position,
  onClick,
}: {
  position: L.ControlPosition;
  onClick?: () => void;
}) {
  const map = useMap();

  useEffect(() => {
    const control = createFilterControl(position, onClick);
    map.addControl(control);
    return () => {
      map.removeControl(control);
    };
  }, [map, position, onClick]);

  return null;
}
