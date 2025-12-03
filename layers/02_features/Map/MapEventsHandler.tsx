'use client';

import { usePathname } from 'next/navigation';
import { useMapEvents } from 'react-leaflet';
import { useEffect, useRef } from 'react';

export function MapEventsHandler({
  onMapMove,
  onMapZoom,
}: {
  // 🚨 onMapMove теперь принимает zoom
  onMapMove?: (lat: number, lon: number, zoom: number) => void;
  // onMapZoom остается прежним, но его использование в родителе опционально
  onMapZoom?: (zoom: number) => void;
}) {
  const pathname = usePathname();
  // Флаг для отслеживания начала размонтирования
  const isActive = useRef(true);

  // Установка isActive в false при размонтировании
  useEffect(() => {
    return () => {
      isActive.current = false;
    };
  }, []);

  useMapEvents({
    moveend(map) {
      // 🚨 Проверка: если компонент размонтируется или мы не на странице карты, выходим
      if (!isActive.current || !pathname?.startsWith('/map')) return;

      const center = map.target.getCenter();
      const zoom = map.target.getZoom(); // Получаем актуальный зум

      onMapMove?.(center.lat, center.lng, zoom); // 🚨 Передаем все 3 параметра
    },
    zoomend(map) {
      // 🚨 Проверка: если компонент размонтируется или мы не на странице карты, выходим
      if (!isActive.current || !pathname?.startsWith('/map')) return;

      const zoom = map.target.getZoom();
      // Вызываем onMapZoom, но onMapMove (выше) часто покрывает это событие
      onMapZoom?.(zoom);
    },
  });

  return null;
}
