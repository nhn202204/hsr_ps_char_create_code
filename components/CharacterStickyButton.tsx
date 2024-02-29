"use client"

import useScrollToTop from "@/hook/useScrollToTop";
import Link from "next/link";

const CharacterStickyButton = ({ ids, pathname, text }: { ids: string | string[] | undefined, pathname: string, text: string }) => {
  

  const { shown } = useScrollToTop(300)

  return (
    <Link href={{ pathname, query: { ids } }}
      className={`${shown ? 'mr-[4.1rem]' : 'mr-5'} transition-all duration-200 transform mt-6
            text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
            text-sm mx-5 px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center
            sticky bottom-4 z-20`}>
      {text}
    </Link>
  )
}

export default CharacterStickyButton