'use client';

import dynamic from 'next/dynamic';

export const LanguageCurrencySwitcher = dynamic(
  () =>
    import('@/layers/01_widgets/LanguageCurrencySwitcher/CurrencySwitch').then(
      (m) => m.CurrencySwitch,
    ),
  { ssr: false },
);
