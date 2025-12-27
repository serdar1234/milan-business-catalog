import Box from '@mui/material/Box';
import MapSidebar from '@/app/(public)/map/MapSidebar';
import { MapContainerClient } from '@/layers/02_features/Map';
import { BASE_URL } from '@/layers/03_entities/api/baseApi';

type SP = { lat?: string; lon?: string; slug?: string };

export default async function MapPage({
  searchParams,
}: {
  searchParams: SP | Promise<SP>;
}) {
  const params = await searchParams;
  const lat = parseFloat(params.lat ?? '');
  const lon = parseFloat(params.lon ?? '');
  const slug = params.slug;
  const initialCenter: [number, number] | undefined =
    lat && lon ? [lat, lon] : undefined;

  let businessData = null;

  if (slug) {
    try {
      const response = await fetch(`${BASE_URL}/companies/${slug}`, {
        next: { revalidate: 60 },
      });
      if (response.ok) {
        const result = await response.json();
        businessData = result.data;
        console.log('Business data:', businessData);
      }
    } catch (error) {
      console.error('Error fetching business data:', error);
    }
  }

  return (
    <Box
      sx={{
        display: 'flex',
        position: { xs: 'fixed', md: 'static' },
        flexDirection: { xs: 'column', md: 'row' },
        height: 'calc(100vh - 64px)',
        width: '100%',
      }}
    >
      <Box sx={{ flex: { xs: '1 1 100%', md: '1 1 60%' } }}>
        <MapContainerClient
          center={initialCenter}
          showMapControls
          activeSlug={slug}
        />
      </Box>

      <Box
        sx={{
          flex: { xs: '1 1 auto', md: '1 1 40%' },
          height: { xs: '80%', md: 'auto' },
          overflowY: 'auto',
          scrollbarWidth: 'thin',
        }}
      >
        <MapSidebar business={businessData} />
      </Box>
    </Box>
  );
}
