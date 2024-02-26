import { Locale } from '@/config'
import { atom } from 'jotai'

export const localeAtom = atom<Locale>("vn")

export const setLocaleAtom = atom<null, [locale: Locale], void>(
  null,
  (get, set, locale) => {
    set(localeAtom, locale)
  },
)

export const getLocaleAtom = atom((get) => get(localeAtom))