'use client';

import dynamic from 'next/dynamic';

const RecentlyViewed = dynamic(
  () => import('@/layers/01_widgets/RecentlyViewed/RecentlyViewed'),
  { ssr: false },
);

export default RecentlyViewed;
