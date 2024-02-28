import { Pathnames } from 'next-intl/navigation';

export const locales = ['vn', 'en'] as const;

export type Locale = typeof locales[number]

export const pathnames = {
  '/': '/',
  '/characters': {
    vn: '/characters',
    en: '/characters'
  },
  '/equipment': {
    vn: '/equipment',
    en: '/equipment'
  },
  '/code': {
    vn: '/code',
    en: '/code'
  }
} satisfies Pathnames<typeof locales>;

// Use the default: `always`
export const localePrefix = undefined;

export type AppPathnames = keyof typeof pathnames;