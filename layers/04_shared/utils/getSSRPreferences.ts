import { cookies } from 'next/headers';
import {
  LanguageCode,
  CurrencyCode,
} from '@/layers/04_shared/configs/settings';

export async function getSSRPreferences() {
  const store = await cookies();
  return {
    lang: (store.get('lang')?.value as LanguageCode) || 'en',
    currency: (store.get('currency')?.value as CurrencyCode) || 'EUR',
  };
}
