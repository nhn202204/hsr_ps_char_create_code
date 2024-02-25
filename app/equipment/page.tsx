
// import Image from "next/image"

import { promises as fs } from 'fs';

import ClippedImage from '@/components/ClippedImage';
import { CharacterDatas, LightconeDatas, RelicsDatas } from "@/data/type";
import CharacterStat from "@/components/CharacterStat";
import ColorTag from "@/components/ColorTag";
import path from 'path';

const EquipmentPage = async ({ params, searchParams }: {
  params: { slug: string }, searchParams: { ids: string[] | undefined }
}) => {

  const { ids } = searchParams
  console.log("🚀 ~ ids:", ids)

  if (ids === undefined) return null

  const fileCharacters = await fs.readFile(path.resolve() + '/data/characters.json', 'utf8');
  const datasCharacters: CharacterDatas = JSON.parse(fileCharacters);
  console.log("🚀 ~ datasCharacters:", datasCharacters)

  const relicsFile = await fs.readFile(path.resolve() + '/data/relics.json', 'utf8');
  const relicsDatas: RelicsDatas = JSON.parse(relicsFile);
  console.log("🚀 ~ relicsDatas:", relicsDatas)

  const lightconeFile = await fs.readFile(path.resolve() + '/data/lightcones.json', 'utf8');
  const lightconeDatas: LightconeDatas = JSON.parse(lightconeFile);
  console.log("🚀 ~ lightconeDatas:", lightconeDatas)

  const charObjs = ids.map(id => datasCharacters.find(_data => _data.id.toString() === id)) as unknown as typeof datasCharacters

  return (
    <div className=" grid grid-cols-1 gap-1">
      {charObjs.map((charObj) =>
        <div key={charObj.id} className="grid grid-cols-1  sm:grid-cols-2 sm:gap-1 md:gap-2 font-medium text-xs">
          <div className="relative overflow-hidden">
            <ColorTag label={charObj.name + " - id " + charObj.id} className="absolute bottom-4 left-4"/>
            <ClippedImage src={`/characters/${charObj.id}.webp`} alt={charObj.name + " image"}
              {...{ top: charObj.top, left: charObj.left, scale: charObj.scale }} />
          </div>

          <CharacterStat {...{charObj, relicsDatas, lightconeDatas}} />
        </div>
      )}
    </div>
  )
}

export default EquipmentPage

