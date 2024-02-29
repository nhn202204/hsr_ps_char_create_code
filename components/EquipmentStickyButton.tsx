"use client"

import useScrollToTop from "@/hook/useScrollToTop";
import { useTranslations } from "next-intl";
import Link from "next/link";

const EquipmentStickyButton = ({ ids }: { ids: string | string[] | undefined }) => {

  const t = useTranslations('StickyButton');

  const { shown } = useScrollToTop(300)

  return (
    <Link href={{ pathname: "/code", query: { ids } }}
      className={`${shown ? 'mr-[4.4rem]' : 'mr-5'} transition-all duration-200 transform mt-6
           text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
           text-sm ml-5 px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center
           sticky bottom-4 z-[1]`}>
      {t("equipment-page")}
    </Link>
  )
}

export default EquipmentStickyButton