export type LanguageCode = 'en' | 'es' | 'it' | 'sk';
export type CurrencyCode = 'EUR' | 'USD' | 'GBP';

export const LANGUAGES: { code: LanguageCode; name: string }[] = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Español' },
  { code: 'it', name: 'Italiano' },
  { code: 'sk', name: 'Slovenský' },
];

export const CURRENCIES: { code: CurrencyCode; name: string }[] = [
  { code: 'EUR', name: 'EUR' },
  { code: 'USD', name: 'USD' },
];

export const LANGUAGE_STORAGE_KEY = 'language';
export const DEFAULT_LANGUAGE_CODE = 'en';
