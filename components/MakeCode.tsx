"use client"

import { RelicsData, StatObj } from "@/data/type"
import { FC } from "react"
import { useIsClient, useReadLocalStorage } from "usehooks-ts"

import { CopyBlock, dracula } from 'react-code-blocks';
import { MainAffixPicked } from "./CharacterStat";
import { useLocale } from "next-intl";

function MyCoolCodeBlock({ code }: { code: string }) {
  return (
    <CopyBlock
      text={code}
      language={"cs"}
      // showLineNumbers
      theme={dracula}
      // codeBlock={true}
    />
  )
}

interface Props { id: string }

const MakeCode: FC<Props> = ({ id }) => {
  console.log("🚀 ~ id:", id)
  
  const locale = useLocale()

  const isVN = locale === "vn"

  const relicTop = useReadLocalStorage<RelicsData | null>(`${id}-relic-top`)
  const relicMid = useReadLocalStorage<RelicsData | null>(`${id}-relic-mid`)
  const relicBot = useReadLocalStorage<RelicsData | null>(`${id}-relic-bot`)
  const relicMainAffix = useReadLocalStorage<MainAffixPicked | null>(`${id}-main-affix`)
  
  const subAffixSteps = useReadLocalStorage<StatObj | null>(`${id}-steps`)

  const isClient = useIsClient()

  if (!isClient) return <p>Loading...</p>

  if (relicTop === null || undefined) return <div>Ko tìm thấy dữ liệu Bộ 4 Di vật Top</div>
  if (relicMid === null || undefined) return <div>Ko tìm thấy dữ liệu Bộ 4 Di vật Bot</div>
  if (relicBot === null || undefined) return <div>Ko tìm thấy dữ liệu Bộ 2 Vị diện</div>
  if (relicMainAffix === null || undefined) return <div>Ko tìm thấy dữ liệu Dòng chính</div>
  if (subAffixSteps === null || undefined) return <div>Ko tìm thấy dữ liệu Dòng phụ</div>

  console.log("🚀 ~ relicTop:", relicTop)
  console.log("🚀 ~ relicMid:", relicMid)
  console.log("🚀 ~ relicBot:", relicBot)
  console.log("🚀 ~ relicMainAffix:", relicMainAffix)
  console.log("🚀 ~ subAffixSteps:", subAffixSteps)

  const subAffixCode_HP =
  `{
          new RelicAffix{
          AffixId = 4,  // HP%
          Step = ${subAffixSteps.HP}
          }
        },`

  const subAffixCode_ATK =
  `{
          new RelicAffix{
          AffixId = 5,  // ATK%
          Step = ${subAffixSteps.ATK}
          }
        },`

  const subAffixCode_DEF =
  `{
          new RelicAffix{
          AffixId = 6,  // DEF%
          Step = ${subAffixSteps.DEF}
          }
        },`

  const subAffixCode_SPD =
  `{
          new RelicAffix{
          AffixId = 7,  // SPD
          Step = ${subAffixSteps.DEF}
          }
        },`

  const subAffixCode_CR =
  `{
          new RelicAffix{
          AffixId = 8,  // CR
          Step = ${subAffixSteps.CR}
          }
        },`

  const subAffixCode_CD =
  `{
          new RelicAffix{
          AffixId = 9,  // CD
          Step = ${subAffixSteps.CD}
          }
        },`

  const subAffixCode_EHR =
  `{
          new RelicAffix{
          AffixId = 10,  // EHR
          Step = ${subAffixSteps.EHR}
          }
        },`

  const subAffixCode_BREAK =
  `{
          new RelicAffix{
          AffixId = 12,  // BREAK
          Step = ${subAffixSteps.BREAK}
          }
        },`

  const subAffixCode_RES =
  `{
          new RelicAffix{
          AffixId = 11,  // RES
          Step = ${subAffixSteps.RES}
          }
        }`
  
  const subAffixCode_List =
  `SubAffixLists = {${subAffixSteps.HP ? subAffixCode_HP : ''}${subAffixSteps.ATK ? subAffixCode_ATK : ''}${subAffixSteps.DEF ? subAffixCode_DEF : ''}${subAffixSteps.SPD ? subAffixCode_SPD : ''}${subAffixSteps.CR ? subAffixCode_CR : ''}${subAffixSteps.CD ? subAffixCode_CD : ''}${subAffixSteps.EHR ? subAffixCode_EHR : ''}${subAffixSteps.BREAK ? subAffixCode_BREAK : ''}${subAffixSteps.RES ? subAffixCode_RES : ''}}`

  const code =
  `
  var head_${id} = new BattleRelic
    {
        Id = ${relicTop.code + 1},  // ${isVN ? relicTop["ten set"] : relicTop["set name"]}
        Level = 15,
        MainAffixId = 1,
        ${subAffixCode_List}
    };

  var arm_${id} = new BattleRelic
    {
        Id = ${relicTop.code + 2},  // ${isVN ? relicTop["ten set"] : relicTop["set name"]}
        Level = 15,
        MainAffixId = 1
    };

  var body_${id} = new BattleRelic
    {
        Id = ${relicBot.code + 3},  // ${isVN ? relicBot["ten set"] : relicBot["set name"]}
        Level = 15,
        MainAffixId = ${relicMainAffix.Body.affixId}  // ${relicMainAffix.Body.affix}
    };

  var foot_${id} = new BattleRelic
    {
        Id = ${relicBot.code + 4},  // ${isVN ? relicBot["ten set"] : relicBot["set name"]}
        Level = 15,
        MainAffixId = ${relicMainAffix.Foot.affixId}  // ${relicMainAffix.Foot.affix}
    };

  var sphere_${id} = new BattleRelic
    {
        Id = ${relicMid.code + 5},  // ${isVN ? relicMid["ten set"] : relicMid["set name"]}
        Level = 15,
        MainAffixId = ${relicMainAffix.Sphere.affixId}  // ${relicMainAffix.Sphere.affix}
    };

  var rope_${id} = new BattleRelic
    {
        Id = ${relicMid.code + 6},  // ${isVN ? relicMid["ten set"] : relicMid["set name"]}
        Level = 15,
        MainAffixId = ${relicMainAffix.Rope.affixId}  // ${relicMainAffix.Rope.affix}
    };`

  return (
    <div className="pt-8">
      <MyCoolCodeBlock code={code} />
    </div>
  )
}

export default MakeCode