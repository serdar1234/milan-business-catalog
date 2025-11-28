'use server';

import { cookies } from 'next/headers';

export async function setServerLang(lang: string) {
  (await cookies()).set('lang', lang, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}

export async function setServerCurrency(currency: string) {
  (await cookies()).set('currency', currency, {
    path: '/',
    maxAge: 60 * 60 * 24 * 30, // 30 days
  });
}
