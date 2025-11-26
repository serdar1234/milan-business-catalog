'use client';

import { useSyncExternalStore, useCallback } from 'react';

// Функция для чтения значения из localStorage
function getSnapshot<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  try {
    const storedValue = window.localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  } catch (error) {
    console.error(`Error reading localStorage key "${key}": `, error);
    return defaultValue;
  }
}

// Хук для подписки на изменения (например, в другой вкладке или принудительно)
function subscribe(callback: () => void) {
  if (typeof window === 'undefined') {
    return () => {};
  }
  // Подписываемся на событие storage, чтобы реагировать на изменения из других вкладок
  window.addEventListener('storage', callback);
  // Подписываемся на кастомное событие, чтобы реагировать на изменения в этой же вкладке
  window.addEventListener('local-storage-update', callback);

  return () => {
    window.removeEventListener('storage', callback);
    window.removeEventListener('local-storage-update', callback);
  };
}

// Кастомное событие для уведомления об изменениях внутри приложения
function emitChange() {
  if (typeof window !== 'undefined') {
    window.dispatchEvent(new Event('local-storage-update'));
  }
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  // 🚨 useSyncExternalStore - синхронизирует состояние
  const value = useSyncExternalStore(
    subscribe,
    () => getSnapshot<T>(key, defaultValue),
    () => defaultValue, // 🚨 getSnapshot для сервера (возвращает значение по умолчанию)
  );

  // Функция для обновления значения
  const setValue = useCallback(
    (newValue: T) => {
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(key, JSON.stringify(newValue));
          // Уведомляем другие подписанные хуки об изменении
          emitChange();
        } catch (error) {
          console.error(`Error setting localStorage key "${key}": `, error);
        }
      }
    },
    [key],
  );

  // Возвращаем значение и сеттер
  return [value, setValue] as const;
}
