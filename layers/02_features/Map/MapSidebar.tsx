'use client';

export default function MapSidebar({ activeSlug }: { activeSlug?: string }) {
  console.log('activeSlug from sidebar', activeSlug ?? 'undefined');
  return (
    <div style={{ padding: 16 }}>Sidebar (business list will be here)</div>
  );
}
