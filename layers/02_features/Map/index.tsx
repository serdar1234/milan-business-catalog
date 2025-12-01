'use client';

import { Spinner } from '@/layers/04_shared/ui/Spinner';
import dynamic from 'next/dynamic';

export const MapContainerClient = dynamic(
  () => import('@/layers/02_features/Map/MapContainerClient'),
  {
    ssr: false,
    loading: () => {
      return <Spinner />;
    },
  },
);
