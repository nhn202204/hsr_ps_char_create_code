import Link from 'next/link'
import Image from "next/image"
import { useTranslations } from 'next-intl'

export default function Page() {

  const t = useTranslations('IndexPage');

  return (
    <div className="flex flex-col w-full text-center items-center">
      <h1 className="px-5 mt-2">{t('desc_1')}</h1>
      <h1 className="px-5 mt-2">{t('desc_2')}</h1>
      <h1 className="px-5 mt-2">{t('desc_3')}</h1>
      <h1 className="px-5 mt-2">{t('desc_4')}</h1>
      <h1 className="px-5 mt-2">{t('desc_5')}</h1>
      <h1 className="px-5 mt-2">{t('desc_6')}</h1>
      <Image src={`/path.jpg`} alt={`Path`} width="1250" height="1140" style={{ width: 'auto', height: 'auto' }} />
      <h1 className="px-5 mt-2">{t('desc_7')}</h1>
      <Image src={`/file.jpg`} alt={`File`} width="650" height="1140" style={{ width: 'auto', height: 'auto' }} />
      <h1 className="px-5 mt-2">{t('desc_8')}</h1>
      <h1 className="px-5 mt-2">{t('desc_9')}</h1>
      <Link href={"/characters"}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg mt-3
               text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center">
        {t('Btn_to_pick_char')}
      </Link>
    </div>
  )
}


