import { useMapEvents } from 'react-leaflet';

export function MapEventsHandler({
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
