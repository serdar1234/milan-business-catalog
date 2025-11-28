'use client';

import { useEffect } from 'react';
import { setServerLang, setServerCurrency } from '@/app/actions/preferences';
import { CurrencyCode, LanguageCode } from '../configs/settings';

interface Props {
  serverLang: LanguageCode;
  serverCurrency: CurrencyCode;
}
export default function SyncPreferences({ serverLang, serverCurrency }: Props) {
  useEffect(() => {
    const storedLang = localStorage.getItem('language')?.replace(/"/g, '');
    const storedCurrency = localStorage.getItem('currency')?.replace(/"/g, '');

    if (!storedLang && !storedCurrency) return;
    if (storedLang && storedLang !== serverLang) {
      setServerLang(storedLang);
    }

    if (storedCurrency && storedCurrency !== serverCurrency) {
      setServerCurrency(storedCurrency);
    }
  }, [serverLang, serverCurrency]);

  return null;
}
