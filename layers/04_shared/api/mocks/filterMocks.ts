const MAX_RADIUS = 50;
const PRICE_OPTIONS = [
  { value: '1', label: '€' },
  { value: '2', label: '€€' },
  { value: '3', label: '€€€' },
  { value: '4', label: '€€€€' },
];

const ATMOSPHERE_OPTIONS = ['Cozy', 'Lively', 'Romantic', 'Quiet'];

const FEATURE_OPTIONS = [
  'Canal View',
  'Happy Hour',
  'Outdoor Seating',
  'Live Music',
  'Private Dining',
];

const DISTANCE_OPTIONS = [
  { value: '1km', label: 'Within 1km', count: 127 },
  { value: '2km', label: 'Within 2km', count: 91 },
  { value: '5km', label: 'Within 5km', count: 89 },
];

const PRICE_OPTIONS_VERBOSE = [
  { value: '€', label: '€ (Budget-friendly)', count: 34 },
  { value: '€€', label: '€€ (Mid-range)', count: 67 },
  { value: '€€€', label: '€€€ (Upscale)', count: 22 },
];

const RATING_OPTIONS = [
  { value: '5.0+', label: '5.0+', count: 22 },
  { value: '4.5+', label: '4.5+', count: 67 },
  { value: '4.0+', label: '4.0+', count: 34 },
];

const FEATURES_OPTIONS_VERBOSE = [
  { value: 'wifi', label: 'Wifi', count: 34 },
  { value: 'parking', label: 'Parking', count: 67 },
  { value: 'pets', label: 'Pets Allowed', count: 22 },
  { value: 'outdoor_seating', label: 'Outdoor Seating', count: 13 },
  { value: 'live_music', label: 'Live Music', count: 45 },
  { value: 'private_dining', label: 'Private Dining', count: 19 },
];

const ATMOSPHERE_OPTIONS_COUNT = [
  { value: 'casual', label: 'Casual', count: 34 },
  { value: 'romantic', label: 'Romantic', count: 67 },
  { value: 'intimate', label: 'Intimate', count: 22 },
  { value: 'classy', label: 'Classy', count: 13 },
  { value: 'hipster', label: 'Hipster', count: 45 },
  { value: 'divey', label: 'Divey', count: 19 },
];

export {
  DISTANCE_OPTIONS,
  PRICE_OPTIONS_VERBOSE,
  RATING_OPTIONS,
  FEATURES_OPTIONS_VERBOSE,
  ATMOSPHERE_OPTIONS_COUNT,
  MAX_RADIUS,
  PRICE_OPTIONS,
  ATMOSPHERE_OPTIONS,
  FEATURE_OPTIONS,
};
