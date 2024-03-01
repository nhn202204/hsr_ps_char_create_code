'use client'

import clsx from 'clsx'
import { useParams, useSearchParams } from 'next/navigation'
import { ChangeEvent, ReactNode, useTransition } from 'react'
import { useRouter, usePathname } from '../navigation'
import { AppPathnames, Locale } from '@/config'
import { useSetAtom } from 'jotai'
import { localeAtom } from '@/jotai/GlobalAtom'

type Props = {
  children: ReactNode
  defaultValue: string
  label: string
}

export default function LocaleSwitcherSelect({
  children,
  defaultValue,
  label
}: Props) {
  const router = useRouter()
  const [isPending, startTransition] = useTransition()
  const _pathname = usePathname()
  // const params = useParams()
  const searchParams = useSearchParams()
  const pathname = `${_pathname}?${searchParams.toString()}` as AppPathnames

  const setCount = useSetAtom(localeAtom)

  function onSelectChange(event: ChangeEvent<HTMLSelectElement>) {
    const nextLocale = event.target.value as Locale
    setCount(nextLocale)
    startTransition(() => {
      router.replace(
        { pathname },
        { locale: nextLocale },
      )
    })
  }

  return (
    <label
      className={clsx(
        'relative text-gray-900',
        isPending && 'transition-opacity [&:disabled]:opacity-30'
      )}
    >
      <p className="sr-only">{label}</p>
      <select
        className="inline-flex text-sm sm:text-lg p-1 w-21 border-none active:outline-none focus:outline-none focus:border-none"
        defaultValue={defaultValue}
        disabled={isPending}
        onChange={onSelectChange}
      >
        {children}
      </select>
      {/* <span className="pointer-events-none absolute right-2 top-[8px]">⌄</span> */}
    </label>
  )
}
