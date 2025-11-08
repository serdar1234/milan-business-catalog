export interface Business {
  id: number;
  name: string;
  category: string;
  rating: number;
  address: string;
  isFavorite: boolean;
  imageUrl: string;
  tag?: {
    label: string;
    color: string;
  };
}

export const BUSINESS_MOCKS: Business[] = [
  {
    id: 1,
    name: 'Il Duomo Secret Café',
    category: 'Cafes',
    rating: 4.8,
    address: 'Piazza del Duomo, 1',
    isFavorite: true,
    imageUrl: '/r1.jpg',
    tag: { label: 'Closing Soon', color: 'statusError.main' },
  },
  {
    id: 2,
    name: 'Navigli Aperitivo Bar',
    category: 'Aperitivo Bars',
    rating: 4.5,
    address: 'Alzaia Naviglio Grande, 56',
    isFavorite: false,
    imageUrl: '/r2.jpg',
    tag: { label: 'Featured', color: 'statusFeatured.main' },
  },
  {
    id: 3,
    name: 'Cozy Trattoria Milanese',
    category: 'Restaurants',
    rating: 4.9,
    address: 'Via Montenapoleone, 12',
    isFavorite: true,
    imageUrl: '/r3.jpg',
    tag: { label: 'New', color: 'brandAccent.main' },
  },
  {
    id: 4,
    name: 'Luna Café Milano',
    category: 'Cafes',
    rating: 4.6,
    address: 'Corso Como, 15',
    isFavorite: false,
    imageUrl: '/r4.jpg',
    tag: { label: 'Popular', color: 'success.main' },
  },
  {
    id: 5,
    name: 'Brew & Chill',
    category: 'Cafes',
    rating: 4.7,
    address: 'Via Torino, 22',
    isFavorite: true,
    imageUrl: '/r8.webp',
    tag: { label: 'New', color: 'brandAccent.main' },
  },
  {
    id: 6,
    name: 'Espresso Express',
    category: 'Cafes',
    rating: 4.4,
    address: 'Viale Pasubio, 8',
    isFavorite: false,
    imageUrl: '/r6.jpg',
    tag: { label: 'Closing Soon', color: 'statusError.main' },
  },
  {
    id: 7,
    name: 'Caffè Milano Arte',
    category: 'Cafes',
    rating: 4.8,
    address: 'Via Dante, 7',
    isFavorite: true,
    imageUrl: '/r7.jpg',
    tag: { label: 'Featured', color: 'statusFeatured.main' },
  },
  {
    id: 8,
    name: 'Morning Brew Milano',
    category: 'Cafes',
    rating: 4.5,
    address: 'Corso Venezia, 30',
    isFavorite: false,
    imageUrl: '/r5.jpg',
    tag: { label: 'Popular', color: 'success.main' },
  },
];
