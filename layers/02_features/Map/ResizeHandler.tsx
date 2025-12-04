import { useEffect } from 'react';
import { useMap } from 'react-leaflet';

/**
 * Automatically refreshes the map when the window is resized
 * @returns null
 */
export function ResizeHandler() {
  const map = useMap();

  useEffect(() => {
    const container = map.getContainer();
    const observer = new ResizeObserver(() => {
      map.invalidateSize(false);
    });

    observer.observe(container);

    return () => observer.disconnect();
  }, [map]);

  return null;
}
