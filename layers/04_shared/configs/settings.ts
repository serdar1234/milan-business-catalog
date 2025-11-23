export type LanguageCode = 'en' | 'es' | 'it';
export type CurrencyCode = 'EUR' | 'USD' | 'GBP';

export const LANGUAGES: { code: LanguageCode; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
];

export const CURRENCIES: { code: CurrencyCode; name: string }[] = [
  { code: 'EUR', name: 'EUR' },
  { code: 'USD', name: 'USD' },
];
