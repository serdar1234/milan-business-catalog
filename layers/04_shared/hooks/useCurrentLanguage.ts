'use client';

import { useLocalStorage } from './useLocalStorage';
import {
  LANGUAGE_STORAGE_KEY,
  DEFAULT_LANGUAGE_CODE,
  LanguageCode,
} from '@/layers/04_shared/configs/settings';

// Предполагаем, что useLocalStorage правильно реализован для SSR (как обсуждалось ранее)

export const useCurrentLanguage = () => {
  const [lang] = useLocalStorage<LanguageCode>(
    LANGUAGE_STORAGE_KEY,
    DEFAULT_LANGUAGE_CODE,
  );
  return lang;
};
