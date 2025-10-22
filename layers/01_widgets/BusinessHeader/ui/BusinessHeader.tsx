import { Box } from '@mui/material';
import { MobileBusinessHeader } from '@/layers/02_features/MobileBusinessHeader/ui/MobileBusinessHeader';
import { AppBreadcrumbs } from '@/layers/04_shared/ui/AppBreadcrumbs';
import { BusinessHeroDesktop } from '@/layers/02_features/BusinessHeroDesktop/ui/BusinessHeroDesktop';

export const MOCK_BUSINESS_DATA = {
  id: 1,
  name: 'Osteria del Borgo',
  category: 'Restaurants',
  description:
    'Experience traditional flavors with modern presentation in our cozy winter atmosphere.',
  rating: 4.9,
  reviews: 847,
  tags: ['Traditional Italian', 'Restaurant'],
  priceRange: '€€€',
  distance: '0.8 km',
  isOpen: true,
  isFavorite: true,
  statusText: '11:00 PM',
  imageUrl: 'business.jpg',
  district: 'Navigli',
  address: 'Via Naviglio Grande, 12 - 20144 Milano, Italy',
  phone: '+39 02 1234 5678',
  email: 'info@osteriadelborgo.it',
  website: 'https://example.com',
  views: 2847,
  saves: 156,
};

const BREADCRUMBS = [
  { label: 'Home', href: '/' },
  { label: 'Restaurants', href: '/restaurants' },
  { label: MOCK_BUSINESS_DATA.name },
];

export default function BusinessHeader() {
  return (
    <Box
      component="section"
      sx={{
        bgcolor: 'var(--color-surface)',
        padding: '2rem 1rem',
      }}
    >
      <AppBreadcrumbs items={BREADCRUMBS} />
      <BusinessHeroDesktop data={MOCK_BUSINESS_DATA} />
      <MobileBusinessHeader data={MOCK_BUSINESS_DATA} />
    </Box>
  );
}
