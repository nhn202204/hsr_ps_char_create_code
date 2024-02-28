'use client'

import clsx from 'clsx'
import { useSelectedLayoutSegment } from 'next/navigation'
import { ComponentProps } from 'react'
import type { AppPathnames } from '@/config'
import { Link } from '@/navigation'
import { CharacterDatas } from '@/data/type'
import { useIsClient, useReadLocalStorage } from 'usehooks-ts'

export default function NavigationLink<Pathname extends AppPathnames>({
  href,
  ...rest
}: ComponentProps<typeof Link<Pathname>>) {
  const selectedLayoutSegment = useSelectedLayoutSegment()

  const charObjSelected = useReadLocalStorage<CharacterDatas>("char-obj-selected")

  const isClient = useIsClient()

  if (!isClient) return <div className="w-full flex justify-center">Loading...</div>

  const pathname = selectedLayoutSegment ? `/${selectedLayoutSegment}` : '/'
  const isActive = pathname === href

  const query = charObjSelected?.map(char => char.id).map(id => `ids=${id}`).join("&")

  let _href = href

  if ((href === "/equipment" || href === "/code") && typeof href === "string") {
    _href = href + "?" + query as unknown as typeof href
  }

  return (
    <Link
      aria-current={isActive ? 'page' : undefined}
      className={clsx(
        'inline-block px-2 py-2 transition-colors text-sm',
        isActive ? 'text-gray-900' : 'text-gray-400 hover:text-gray-200'
      )}
      href={_href}
      {...rest}
    />
  )
}