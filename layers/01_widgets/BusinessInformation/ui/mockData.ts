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
  address: string;
  phone: string;
  website: string;
  priceRange: string;
  hours: HourEntry[];
  amenities: { icon: React.ElementType; label: string; isAvailable: boolean }[];
}

export const MOCK_BUSINESS_DETAILS: BusinessDetails = {
  address: 'Via del Borgo, 23\n20121 Milano, Italy',
  phone: '+39 02 1234 5678',
  website: 'osteriadelborgo.it',
  priceRange: '€€€ (€30-50 per person)',
  hours: [
    { day: 'Monday', hours: 'Closed', isToday: true }, // Monday is today, it's closed
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
