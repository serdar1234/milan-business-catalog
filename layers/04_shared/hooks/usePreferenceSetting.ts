'use client';

import { useCallback } from 'react';
import { useClientSetting } from './useClientSetting';
import { setServerLang, setServerCurrency } from '@/app/actions/preferences';

export function usePreferenceSetting(
  key: 'language' | 'currency',
  defaultValue: string,
) {
  const [value, setValue] = useClientSetting(key, defaultValue);

  const update = useCallback(
    async (newValue: string) => {
      setValue(newValue);

      if (key === 'language') {
        setServerLang(newValue);
      }
      if (key === 'currency') {
        setServerCurrency(newValue);
      }
    },
    [key, setValue],
  );

  return [value, update] as const;
}
