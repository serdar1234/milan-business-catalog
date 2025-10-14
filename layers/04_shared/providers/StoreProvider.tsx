'use client';

import { useRef } from 'react';
import { Provider } from 'react-redux';
import { makeStore } from '../lib/store';
import type { AppStore } from '../lib/store';

export function StoreProvider({ children }: { children: React.ReactNode }) {
  // useRef гарантирует, что Store создается только один раз
  const storeRef = useRef<AppStore | null>(null);
  if (!storeRef.current) {
    storeRef.current = makeStore();
  }

  return <Provider store={storeRef.current}>{children}</Provider>;
}
