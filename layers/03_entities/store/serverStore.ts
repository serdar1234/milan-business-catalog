import { makeStore } from '@/layers/03_entities/store';

export function createServerStore(
  preloadedState?: Parameters<typeof makeStore>[0],
) {
  return makeStore(preloadedState);
}
