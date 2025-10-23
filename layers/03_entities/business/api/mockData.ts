// --- Мок-данные ---

// Amenities
import WifiIcon from '@mui/icons-material/Wifi';
import AccessibleIcon from '@mui/icons-material/Accessible';
import DriveEtaIcon from '@mui/icons-material/DriveEta';
import CreditCardIcon from '@mui/icons-material/CreditCard';

interface HourEntry {
  day: string;
  hours: string;
  isToday: boolean;
}

interface BusinessDetails {
  id: number;
  name: string;
  category: string;
  description: string;
  rating: number;
  reviews: number;
  tags: string[];
  priceRange: string;
  distance: string;
  isOpen: boolean;
  isFavorite: boolean;
  statusText: string;
  imageUrl: string;
  district: string;
  address: string;
  phone: string;
  email: string;
  website: string;
  views: number;
  saves: number;
  hours: HourEntry[];
  amenities: { icon: React.ElementType; label: string; isAvailable: boolean }[];
}

export const MOCK_BUSINESS_DETAILS: BusinessDetails = {
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
  address: 'Via Naviglio Grande, 12 - 20144 Milano, Italy', // from source 1
  phone: '+39 02 1234 5678',
  email: 'info@osteriadelborgo.it', // from source 1
  website: 'https://example.com', // from source 1
  views: 2847,
  saves: 156,
  hours: [
    { day: 'Monday', hours: 'Closed', isToday: true },
    { day: 'Tuesday', hours: '7:00 PM - 11:00 PM', isToday: false },
    { day: 'Wednesday', hours: '7:00 PM - 11:00 PM', isToday: false },
    { day: 'Thursday', hours: '7:00 PM - 11:00 PM', isToday: false },
    { day: 'Friday', hours: '7:00 PM - 11:30 PM', isToday: false },
    { day: 'Saturday', hours: '7:00 PM - 11:30 PM', isToday: false },
    { day: 'Sunday', hours: '7:00 PM - 10:30 PM', isToday: false },
  ],
  amenities: [
    { icon: WifiIcon, label: 'Free Wifi', isAvailable: true },
    { icon: AccessibleIcon, label: 'Wheelchair Accessible', isAvailable: true },
    { icon: DriveEtaIcon, label: 'Valet Parking', isAvailable: true },
    { icon: CreditCardIcon, label: 'Cards Accepted', isAvailable: true },
  ],
};
