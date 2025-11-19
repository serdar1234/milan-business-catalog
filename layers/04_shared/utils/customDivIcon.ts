import { divIcon } from 'leaflet';

export default function customDivIcon(name?: string, selected?: boolean) {
  return divIcon({
    iconSize: [38, 38],
    html: `
  <div style="text-align: center;">
  <img src="/${selected ? 'favorite-place-svgrepo-com' : 'next'}.svg" style="position: relative; width: 38px; height: 38px; z-index: ${selected ? '2;' : '1'}" alt="${name}" />
  </div>
  `,
    className: '',
  });
}
