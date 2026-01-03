import { divIcon } from 'leaflet';

export default function customDivIcon(name?: string, selected?: boolean) {
  return divIcon({
    iconSize: [38, 38],
    html: `
  <div style="text-align: center;">
  <img src="/favorite-place-svgrepo-com.svg" style="position: relative; width: 38px; height: auto; z-index: ${selected ? '2;' : '1'}" alt="${name}" />
  </div>
  `,
    className: '',
  });
}
