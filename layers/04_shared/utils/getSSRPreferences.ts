import { cookies } from 'next/headers';
import {
  LanguageCode,
  CurrencyCode,
} from '@/layers/04_shared/configs/settings';

export async function getSSRPreferences() {
  const store = cookies();
  return {
    lang: ((await store).get('lang')?.value as LanguageCode) || 'en',
    currency: ((await store).get('currency')?.value as CurrencyCode) || 'EUR',
  };
}
