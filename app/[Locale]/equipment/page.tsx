
import { promises as fs } from 'fs'

import ClippedImage from '@/components/ClippedImage'
import { CharacterDatas, LightconeDatas, RelicsDatas } from "@/data/type"
import CharacterStat from "@/components/CharacterStat"
import ColorTag from "@/components/ColorTag"
import path from 'path'
import EquipmentStickyButton from '@/components/EquipmentStickyButton'
import { useTranslations } from 'next-intl'
import Link from 'next/link'

const AlertPickChar: React.FC = () => {

  const t = useTranslations('EquipmentPage')

  return (
    <div className="flex flex-col gap-2">
      <h1 className="w-full flex justify-center">{t('alert_char')}</h1>
      <div className="w-full flex justify-center">
        <Link href={"/characters"}
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg mt-3
             text-sm px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center">
          {t('Btn-alert_char')}
        </Link>
      </div>
    </div>
  )
}

const EquipmentPage = async ({ params, searchParams }: {
  params: { slug: string }, searchParams: { ids: string | string[] | undefined }
}) => {

  let { ids } = searchParams

  if (ids === undefined) return (<AlertPickChar />)

  if (typeof (ids) === "string") {
    ids = ids.split(", ")
  }

  if (!Array.isArray(ids)) return (<h1 className="w-full flex justify-center">Bạn chưa chọn Char / Char not picked yet</h1>)

  if (ids.length < 1) return (<h1 className="w-full flex justify-center">Bạn chưa chọn Char / Char not picked yet</h1>)

  const fileCharacters = await fs.readFile(path.resolve() + '/data/characters.json', 'utf8')
  const datasCharacters: CharacterDatas = JSON.parse(fileCharacters)

  const relicsFile = await fs.readFile(path.resolve() + '/data/relics.json', 'utf8')
  const relicsDatas: RelicsDatas = JSON.parse(relicsFile)

  const lightconeFile = await fs.readFile(path.resolve() + '/data/lightcones.json', 'utf8')
  const lightconeDatas: LightconeDatas = JSON.parse(lightconeFile)

  const charObjs = datasCharacters.filter(char => ((ids as Array<string>).some(id => id === char.id.toString())))

  return (
    <div className="relative grid grid-cols-1 gap-1">
      {charObjs.map((charObj) =>
        <div key={charObj.id} className="grid grid-cols-1 sm:grid-cols-2 sm:gap-1 md:gap-2 font-medium text-xs">
          <div className="relative overflow-hidden">
            <ColorTag label={charObj.name + " - id " + charObj.id} className="absolute bottom-4 left-4" />
            <ClippedImage src={`/characters/${charObj.id}.webp`} alt={charObj.name + " image"}
              {...{ top: charObj.pos_top, left: charObj.pos_left, scale: charObj.scale }} />
          </div>

          <CharacterStat {...{ charObj, relicsDatas, lightconeDatas }} />
        </div>
      )}

      <EquipmentStickyButton ids={ids} />
    </div>
  )
}

export default EquipmentPage

