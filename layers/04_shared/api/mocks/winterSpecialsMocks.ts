import { SpecialCardProps } from '@/layers/02_features/SpecialCard/ui/SpecialCard';
import WineBarOutlinedIcon from '@mui/icons-material/WineBarOutlined';
import RestaurantOutlinedIcon from '@mui/icons-material/RestaurantOutlined';
import CardGiftcardOutlinedIcon from '@mui/icons-material/CardGiftcardOutlined';

export const TOP_EVENTS: SpecialCardProps[] = [
  {
    title: 'Christmas Markets',
    subtitle:
      "Experience the magic of Milano's Christmas markets with mulled wine, local crafts, and holiday treats throughout the city center.",
    link: '#',
    bgColor: 'var(--color-dark-red)' as const,
    isLarge: true,
    chipLabel: 'Limited Time',
    date: 'Dec 1 - Jan 6',
    location: 'Various locations',
    buttonText: 'Explore',
  },
  {
    title: 'La Scala Season',
    subtitle:
      'Immerse yourself in world-class opera and ballet performances at the legendary Teatro alla Scala during the winter season.',
    link: '#',
    bgColor: 'var(--color-status-featured)' as const,
    isLarge: true,
    chipLabel: 'Winter Special',
    date: 'Dec 7 - Mar 15',
    location: 'Teatro alla Scala',
    buttonText: 'Book Now',
  },
];

export const MINOR_EVENTS: SpecialCardProps[] = [
  {
    title: 'Winter Aperitivo',
    subtitle:
      'Warm up with special winter cocktails and heated terraces at selected bars.',
    link: '#',
    bgColor: 'var(--color-background)' as const,
    icon: WineBarOutlinedIcon,
    date: 'Available at 45+ venues',
  },
  {
    title: 'Truffle Season',
    subtitle: "Indulge in fresh truffle menus at Milano's finest restaurants.",
    link: '#',
    bgColor: 'var(--color-background)' as const,
    icon: RestaurantOutlinedIcon,
    date: 'Nov - Feb special menus',
  },
  {
    title: 'Shopping Specials',
    subtitle: 'Exclusive winter sales and experiences in the fashion capital.',
    link: '#',
    bgColor: 'var(--color-background)' as const,
    icon: CardGiftcardOutlinedIcon,
    date: 'Dec - Jan promotions',
  },
];
