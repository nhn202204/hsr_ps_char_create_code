import Link from "next/link";

const StickyButton = ({ ids, pathname, text }: { ids: string | string[] | undefined, pathname: string, text: string }) => {

  return (
    <Link href={{ pathname, query: { ids } }}
      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
           text-sm mx-5 px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center
           sticky bottom-4 z-20">
      {text}
    </Link>
  )
}

export default StickyButton