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

interface Feature {
  label: string;
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
  shortDescription: string;
  fullDescription: string;
  specialties: Feature[];
  features: Feature[];
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
  address: 'Via Naviglio Grande, 12 - 20144 Milano, Italy',
  phone: '+39 02 1234 5678',
  email: 'info@osteriadelborgo.it',
  website: 'https://example.com',
  views: 2847,
  saves: 156,
  shortDescription:
    "Experience authentic Italian cuisine in the heart of Milan's historic Navigli district. Our family-run restaurant has been serving traditional recipes with a modern twist since 1987, offering an intimate dining experience with canal views.",
  fullDescription:
    "Nestled in the heart of Milano's historic district, Osteria del Borgo has been serving authentic Lombard cuisine for over three decades. Our chef, Marco Antonelli, brings together traditional recipes passed down through generations with contemporary techniques to create an unforgettable dining experience.\n\n" +
    'During the winter months, our restaurant transforms into a cozy haven where the warmth of our wood-fired oven and carefully curated wine selection create the perfect atmosphere for intimate dinners and celebrations.', //

  specialties: [
    { label: 'Risotto alla Milanese with winter truffles' },
    { label: 'Osso Buco with saffron polenta' },
    { label: 'Handmade pasta with seasonal ingredients' },
    { label: 'Curated selection of Lombard wines' },
  ],
  features: [
    //
    { label: 'Heated terrace for winter dining' },
    { label: 'Private dining rooms available' },
    { label: 'Wheelchair accessible' },
    { label: 'Sommelier wine pairings' },
  ],
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
