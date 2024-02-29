'use client'

import { RELIC_MAIN_AFFIX_BONUS, RELIC_MAIN_AFFIX_ID, STATS } from "@/data/constant"
import { CharacterData, LightconeData, LightconeDatas, RelicsData, RelicsDatas, StatObj, ValidMainAffix } from "@/data/type"
import { MouseEventHandler, PointerEventHandler, useEffect, useLayoutEffect, useState } from "react"

import Image from "next/image"
import ColorTag from "./ColorTag"

import { useLocalStorage } from 'usehooks-ts'
import { useIsClient } from 'usehooks-ts'
import InputNumberWithStepHandler, { ChangedFunc, StepFunc } from "./InputNumberWithStepHandler"

import { Dropdown } from "flowbite-react"
import { useTranslations } from 'next-intl'
import { useLocale } from "next-intl";
import CharacterEidolonInput, { EidolonChangedFunc } from "./CharacterEidolonInput"

const initialStatObj: StatObj = {
  ATK: 0,
  HP: 0,
  SPD: 0,
  DEF: 0,
  CR: 0,
  EHR: 0,
  CD: 0,
  RES: 0,
  BREAK: 0,
  ERR: 0,
  "ELE DMG": 0,
}

const initialMainAffixPicked: {
  Body: { affix: ValidMainAffix, bonus: number, affixId: number },
  Foot: { affix: ValidMainAffix, bonus: number, affixId: number },
  Sphere: { affix: ValidMainAffix, bonus: number, affixId: number },
  Rope: { affix: ValidMainAffix, bonus: number, affixId: number }
} = {
  Body: { affix: "ATK", bonus: RELIC_MAIN_AFFIX_BONUS.ATK, affixId: RELIC_MAIN_AFFIX_ID["Body"][1].id },
  Foot: { affix: "SPD", bonus: RELIC_MAIN_AFFIX_BONUS.SPD, affixId: RELIC_MAIN_AFFIX_ID["Foot"][3].id },
  Sphere: { affix: "ATK", bonus: RELIC_MAIN_AFFIX_BONUS.ATK, affixId: RELIC_MAIN_AFFIX_ID["Sphere"][1].id },
  Rope: { affix: "ATK", bonus: RELIC_MAIN_AFFIX_BONUS.ATK, affixId: RELIC_MAIN_AFFIX_ID["Rope"][3].id }
}

export type MainAffixPicked = typeof initialMainAffixPicked

interface Props {
  charObj: CharacterData, relicsDatas: RelicsDatas, lightconeDatas: LightconeDatas
}

const CharacterStat: React.FC<Props> = ({ charObj, lightconeDatas, relicsDatas }) => {

  const locale = useLocale()

  const t = useTranslations('EquipmentPage');

  const [eidolon, setEidolon] = useState<number>(charObj.E)

  const [persitEidolon, setPersitEidolon] = useLocalStorage<number>(`${charObj.id}-eidolon`, charObj.E)

  const [persitSteps, setPersitSteps] = useLocalStorage<StatObj>(`${charObj.id}-steps`, initialStatObj)

  const [steps, setSteps] = useState<StatObj>(initialStatObj)

  const [persitStatBonus, setPersitStatBonus] = useLocalStorage<StatObj>(`${charObj.id}-stat-bonus`, initialStatObj)

  const [statBonus, setStatBonus] = useState<StatObj>(initialStatObj)

  const [edit, setEdit] = useState<boolean>(false)

  const [totalStep, setTotalStep] = useState<number>(0)

  const isClient = useIsClient()

  const handleIncrement: StepFunc = ({ label }) => {
    setSteps((oldStep) => ({ ...oldStep, ...{ [label]: oldStep[label] + 1 } }))
  }

  const handleDecrement: StepFunc = ({ label }) => {
    setSteps((oldStep) => ({ ...oldStep, ...{ [label]: oldStep[label] - 1 } }))
  }

  const handleStepChanged: ChangedFunc = ({ label, value }) => {
    setSteps((oldStep) => ({ ...oldStep, ...{ [label]: value } }))
  }

  const handleStatBonusChanged: ChangedFunc = ({ label, value }) => {
    setStatBonus((oldStatBonus) => ({ ...oldStatBonus, ...{ [label]: value } }))
  }

  const [openLCList, setOpenLCList] = useState<boolean>(false)

  const lightconeList = lightconeDatas.filter(lc => lc.path.includes(charObj.path))

  const [lightcone, setLightcone] = useLocalStorage<LightconeData>(`${charObj.id}-lightcone`, () => lightconeList.find(_lc => _lc.note.includes(charObj.lc)) || lightconeList[0])

  const handleLCClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    setOpenLCList(!openLCList)
  }

  const handlePickLC: PointerEventHandler<HTMLButtonElement> = (e) => {
    const newLC = lightconeList.find(_lc => _lc.id.toString() === e.currentTarget.id)
    newLC && setLightcone(newLC)
  }

  const handlePickLC_S: PointerEventHandler<HTMLButtonElement> = (e) => {
    setLightcone(old => ({ ...old, ...{ S: parseInt(e.currentTarget.id) } }))
  }

  const [openRelicSet4HeadArmList, setOpenRelicSet4HeadArmList] = useState<boolean>(false)
  const [openRelicSet4BodyFootList, setOpenRelicSet4BodyFootList] = useState<boolean>(false)
  const [openRelicSet2List, setOpenRelicSet2List] = useState<boolean>(false)

  const relicSet2List = relicsDatas.filter(rl => rl.set === 2)

  const relicSet4List = relicsDatas.filter(rl => rl.set === 4)

  const relicSet4SetList = relicSet4List.filter((value, index, self) => self.findIndex(vl => vl.code === value.code) === index)

  const relicSet2SetList = relicSet2List.filter((value, index, self) => self.findIndex(vl => vl.code === value.code) === index)

  const [relicSet4HeadArm, setRelicSet4HeadArm] = useLocalStorage<RelicsData>(`${charObj.id}-relic-top`,
    () => relicSet4List.find(_rl => _rl["ten set"].includes(charObj.set_4_top)) || relicSet4List[0])

  const handlePickRelicSet4HeadArmList: PointerEventHandler<HTMLButtonElement> = (e) => {
    const newRL4 = relicSet4List.find(_rl => _rl.id.toString() === e.currentTarget.id)
    newRL4 && setRelicSet4HeadArm(newRL4)
  }

  const [relicSet4BodyFoot, setRelicSet4BodyFoot] = useLocalStorage<RelicsData>(`${charObj.id}-relic-bot`,
    () => relicSet4List.find(_rl => _rl["ten set"].includes(charObj.set_4_bot)) || relicSet4List[0])

  const handlePickRelicSet4BodyFootList: PointerEventHandler<HTMLButtonElement> = (e) => {
    const newRL4 = relicSet4List.find(_rl => _rl.id.toString() === e.currentTarget.id)
    newRL4 && setRelicSet4BodyFoot(newRL4)
  }

  const [mainAffixPickedBonus, setMainAffixPickedBonus] = useState(initialStatObj)

  const [mainAffixPicked, setMainAffixPicked] = useLocalStorage(`${charObj.id}-main-affix`, initialMainAffixPicked)

  const handlePickMainAffix: PointerEventHandler<HTMLButtonElement> = (e) => {
    const [relic, affix] = e.currentTarget.id.split("-") as [keyof typeof mainAffixPicked, ValidMainAffix]
    const bonus = RELIC_MAIN_AFFIX_BONUS[affix]
    const affixId = RELIC_MAIN_AFFIX_ID[relic].find(ele => ele.affix === affix)?.id
    setMainAffixPicked(oldAffix => ({ ...oldAffix, ...{ [relic]: { affix, bonus, affixId } } }))
  }

  const [relicSet2, setRelicSet2] = useLocalStorage<RelicsData>(`${charObj.id}-relic-mid`,
    () => relicSet2List.find(_rl => _rl["ten set"].includes(charObj.set_2)) || relicSet2List[0])

  const handlePickRelicSet2List: PointerEventHandler<HTMLButtonElement> = (e) => {
    const newRL2 = relicSet2List.find(_rl => _rl.id.toString() === e.currentTarget.id)
    newRL2 && setRelicSet2(newRL2)
  }

  const handleRelicClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault()
    const targetId = e.currentTarget.id
    if (targetId.includes("4H")) {
      setOpenRelicSet4HeadArmList(!openRelicSet4HeadArmList)
    } else if (targetId.includes("4B")) {
      setOpenRelicSet4BodyFootList(!openRelicSet4BodyFootList)
    } else if (targetId.includes("Set2")) {
      setOpenRelicSet2List(!openRelicSet2List)
    }
  }

  const handleClick = (act: "save" | "cancel" | 'edit') => {
    if (act === "save") {
      setPersitSteps(steps)
      setPersitStatBonus(statBonus)
      setPersitEidolon(eidolon)
    } else if (act === "edit") {
      // setPersitSteps(steps)
    } else if (act === "cancel") {
      setSteps(persitSteps)
      setStatBonus(persitStatBonus)
      setEidolon(persitEidolon)
    }
    setEdit(!edit)
  }

  useEffect(() => {
    const relicLoop = ["Body", "Foot", "Rope", "Sphere"] as const
    const newAffixPickedBonus = relicLoop.reduce((acc, relic) => {
      const affixObj = mainAffixPicked[relic]
      if (!(affixObj.affix.includes("HEAL") || affixObj.affix.includes("DMG"))) {
        acc[affixObj.affix] += affixObj.bonus
        acc[affixObj.affix] = parseFloat(acc[affixObj.affix].toFixed(1))
      } else if (affixObj.affix.includes("DMG")) {
        acc["ELE DMG"] += affixObj.bonus
        acc["ELE DMG"] = parseFloat(acc["ELE DMG"].toFixed(1))
      }
      return acc
    }, {
      ATK: 0,
      HP: 0,
      SPD: 0,
      DEF: 0,
      CR: 0,
      EHR: 0,
      CD: 0,
      RES: 0,
      BREAK: 0,
      ERR: 0,
      "ELE DMG": 0,
    })
    setMainAffixPickedBonus(newAffixPickedBonus)
  }, [mainAffixPicked])

  useEffect(() => {
    setSteps(persitSteps)
    setStatBonus(persitStatBonus)
    setPersitSteps(persitSteps)
    setPersitStatBonus(persitStatBonus)
    setPersitEidolon(persitEidolon)
    setLightcone(lightcone)
    setRelicSet4HeadArm(relicSet4HeadArm)
    setRelicSet4BodyFoot(relicSet4BodyFoot)
    setRelicSet2(relicSet2)
    setMainAffixPicked(mainAffixPicked)
  }, [])

  useEffect(() => {
    setTotalStep(() => STATS.reduce((acc, curr) => (acc + steps[curr]), 0))
  }, [steps])

  const handleEidolonChanged: EidolonChangedFunc = (e) => {
    setEidolon(e)
  }

  if (!isClient) return <p>Loading...</p>

  return (
    <form className="w-full p-1 grid grid-cols-2 gap-x-2 gap-y-1 relative">
      {STATS.map(stat =>
        <div className="grid grid-cols-7" key={stat}>
          {edit ?
            <InputNumberWithStepHandler
              initStat={steps[stat]} initStatBonus={statBonus[stat]} maxStep={36}
              label={stat} id={charObj.id + stat} totalStep={totalStep}
              statBonusChanged={handleStatBonusChanged} stepChanged={handleStepChanged}
              increment={handleIncrement} decrement={handleDecrement} />
            :
            <>
              <label className={`h-full flex items-center text-gray-900 dark:text-white col-span-2`}>{stat}</label>
              <label className={`h-full flex items-center text-gray-900 dark:text-white`}>
                {`${steps[stat] > 0 ? "+" : ""}${steps[stat]}`}
              </label>
              <label className={`h-full flex items-center text-gray-900 dark:text-white col-span-4`}>
                {`(${statBonus[stat] > 0 ? "+" : ""}${statBonus[stat]}) ${mainAffixPickedBonus[stat] > 0 ? `(+${mainAffixPickedBonus[stat]})` : ""}`}
              </label>
            </>
          }
        </div>
      )}

      {edit &&
        <div className="grid grid-cols-7">
          <CharacterEidolonInput
            initStat={eidolon} maxStep={6}
            label={"Eidolon"} id={charObj.id.toString()}
            stepChanged={handleEidolonChanged}
          />
        </div>
      }
      {!edit &&
        <>
          <div className="grid grid-cols-7" id={"ERR"}>
            <label className={`h-full flex items-center text-gray-900 dark:text-white col-span-3`}>{`ERR`}</label>
            <label className={`h-full flex items-center text-gray-900 dark:text-white col-span-4`}>
              {`(+${mainAffixPickedBonus[`ERR`] > 0 ? `${mainAffixPickedBonus[`ERR`]}` : 0})`}
            </label>
          </div>
          <div className="grid grid-cols-7" id={"ELE DMG"}>
            <label className={`h-full flex items-center text-gray-900 dark:text-white col-span-3`}>{`ELE DMG`}</label>
            <label className={`h-full flex items-center text-gray-900 dark:text-white col-span-4`}>
              {`(+${mainAffixPickedBonus[`ELE DMG`] > 0 ? `${mainAffixPickedBonus[`ELE DMG`]}` : 0})`}
            </label>
          </div>
          <div className="grid grid-cols-7" id={"EIDOLON"}>
            <label className={`h-full flex items-center text-gray-900 dark:text-white col-span-3`}>{`EIDOLON`}</label>
            <label className={`h-full flex items-center text-gray-900 dark:text-white col-span-4`}>
              {persitEidolon}
            </label>
          </div>
        </>
      }

      <ColorTag label={`${t('Btn-total-step')}: ${totalStep}/36`} className={`bg-opacity-100 col-span-2 ${edit ? 'sm:col-span-2' : 'sm:col-span-1'}`} />
      {!edit &&
        <button type="button" onClick={() => handleClick(edit ? 'save' : 'edit')}
          className="text-white bg-green-600 hover:bg-green-800 focus:ring-4 focus:ring-green-300 hidden sm:block
                    font-medium rounded-lg text-sm py-2 dark:bg-green-600 
                    dark:hover:bg-green-700 focus:outline-none dark:focus:ring-green-800"
        >
          {`Edit - Chỉnh sửa`}
        </button>
      }

      {edit ?
        <>
          <button type="button" onClick={() => handleClick('save')}
            className={`text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 
                        font-medium rounded-lg text-sm py-2 dark:bg-blue-600 
                        dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`}
          >
            {`Save - Lưu`}
          </button>
          <button type="button" onClick={() => handleClick('cancel')}
            className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 
            font-medium rounded-lg text-sm py-2 dark:bg-red-600 
            dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
          >
            {`Cancel`}
          </button>
        </>
        :
        <button type="button" onClick={() => handleClick(edit ? 'save' : 'edit')}
          className="absolute -top-10 right-1 sm:invisible text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none
                    focus:ring-blue-300 font-medium rounded-full text-sm p-2.5 text-center inline-flex items-center
                    dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
          <svg className="w-4 h-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#FFFFFF">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 20H5a1 1 0 0 0 0 2h14a1 1 0 0 0 0-2zM5 18h.09l4.17-.38a2 2 0 0 0 1.21-.57l9-9a1.92 1.92 0 
                                      0 0-.07-2.71L16.66 2.6A2 2 0 0 0 14 2.53l-9 9a2 2 0 0 0-.57 1.21L4 16.91a1 1 0 0 0 .29.8A1 1 0 0 0 5 18zM15.27 4 18 6.73l-2 
                                      1.95L13.32 6zm-8.9 8.91L12 7.32l2.7 2.7-5.6 5.6-3 .28z" />
          </svg>
        </button>
      }

      <div className="grid grid-cols-4 col-span-2 mb-2 gap-1 mt-1">

        <button type="button" className={`flex flex-col items-stretch hover:none hover:outline-none focus:none focus:outline-none${openLCList ? " ring-4 ring-blue-600" : ""}`}
          onClick={handleLCClick}
        >
          <Image src={`/lightcones/${lightcone.id}.webp`} alt={`LC ${lightcone.ten}`} width="70" height="70"
            style={{ width: 'auto', height: 'auto' }}
          />
        </button>

        <button type="button" id="RelicSet4HeadArm" className={`relative flex flex-col items-stretch items-center hover:none hover:outline-none focus:none focus:outline-none${openRelicSet4HeadArmList ? " ring-4 ring-blue-600" : ""}`}
          onClick={handleRelicClick}
        >
          <Image src={`/relics/${relicSet4HeadArm.code}.webp`} alt={`Relic ${relicSet4HeadArm["ten set"]}`} width="70" height="70"
            style={{ width: 'auto', height: 'auto' }} />
          <h1 className="absolute bottom-0 left-0 w-full px-1">{t('description_top')}</h1>
        </button>

        <button type="button" id="RelicSet2" className={`relative flex flex-col items-stretch items-center hover:none hover:outline-none focus:none focus:outline-none${openRelicSet2List ? " ring-4 ring-blue-600" : ""}`}
          onClick={handleRelicClick}
        >
          <Image src={`/relics/${relicSet2.code}.webp`} alt={`Relic ${relicSet2["ten set"]}`} width="70" height="70" style={{ width: 'auto', height: 'auto' }} />
          <h1 className="absolute bottom-0 left-0 w-full px-1">{t('description_mid')}</h1>
        </button>

        <button type="button" id="RelicSet4BodyFoot" className={`relative flex flex-col items-stretch items-center hover:none hover:outline-none focus:none focus:outline-none${openRelicSet4BodyFootList ? " ring-4 ring-blue-600" : ""}`}
          onClick={handleRelicClick}
        >
          <Image src={`/relics/${relicSet4BodyFoot.code}.webp`} alt={`Relic ${relicSet4BodyFoot["ten set"]}`} width="70" height="70" style={{ width: 'auto', height: 'auto' }} />
          <h1 className="absolute bottom-0 left-0 w-full px-1">{t('description_bot')}</h1>
        </button>

      </div>

      {openLCList &&
        <div className="w-full col-span-2 grid grid-cols-7 gap-1" >
          <div className="w-full col-span-6" id="Lightcone">
            <Dropdown
              className="h-[20rem] overflow-auto"
              label={"LC: " + lightcone[`${locale === "vn" ? "ten" : "name"}`]}
              theme={{ floating: { target: "w-full" } }}
            >
              <div className="w-full h-28" >
                {lightconeList.map(lc => (
                  <Dropdown.Item className="pl-2 pb-0 pt-1" key={lc.id} id={lc.id.toString()} onPointerDown={handlePickLC}>
                    <Image src={`/lightcones/${lc.id}.webp`} alt={`LC ${locale === "vn" ? lc.ten : lc.name}`} width="30" height="30"
                      style={{ width: 'auto', height: 'auto' }}
                    />
                    <span className="pl-2">{locale === "vn" ? lc.ten : lc.name}</span>
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          </div>
          <div className="w-full" id="Lightcone S">
            <Dropdown
              className="h-[8.5rem] overflow-auto"
              label={`S${lightcone.S || 1}`}
              theme={{ floating: { target: "w-full" } }}
            >
              <div className="w-full h-28" >
                {[1, 2, 3, 4, 5].map(s => (
                  <Dropdown.Item className="pl-2 pb-0 pt-1" key={"lsc" + s} id={s.toString()} onPointerDown={handlePickLC_S}>
                    <span className="pl-2">{s}</span>
                  </Dropdown.Item>
                ))}
              </div>
            </Dropdown>
          </div>
        </div>
      }

      {openRelicSet4HeadArmList &&
        <div className="w-full col-span-2" id={`Set4Top`}>
          <Dropdown
            className="h-[20rem] overflow-auto"
            label={"Top: " + relicSet4HeadArm[`${locale === "vn" ? "ten set" : "set name"}`]}
            theme={{ floating: { target: "w-full" } }}
          >
            {relicSet4SetList.map(rl => (
              <Dropdown.Item className="pl-2 py-0" key={rl.id} id={rl.id.toString()} onPointerDown={handlePickRelicSet4HeadArmList}>
                <Image src={`/relics/${rl.code}.webp`} alt={`Relic ${rl["ten set"]}`} width="30" height="30"
                  style={{ width: 'auto', height: 'auto' }} />
                <span className="pl-2">{locale === "vn" ? rl["ten set"] : rl["set name"]}</span>
              </Dropdown.Item>
            ))}
          </Dropdown>
        </div>
      }

      {openRelicSet2List &&
        <>
          <div className="w-full col-span-2" id={`Set2`}>
            <Dropdown
              className="h-[20rem] overflow-auto"
              label={"Mid: " + relicSet2[`${locale === "vn" ? "ten set" : "set name"}`]}
              theme={{ floating: { target: "w-full" } }}
            >
              {relicSet2SetList.map(rl => (
                <Dropdown.Item className="pl-2 py-0" key={rl.id} id={rl.id.toString()} onPointerDown={handlePickRelicSet2List}>
                  <Image src={`/relics/${rl.code}.webp`} alt={`Relic ${rl["ten set"]}`} width="30" height="30"
                    style={{ width: 'auto', height: 'auto' }} />
                  <span className="pl-2">{locale === "vn" ? rl["ten set"] : rl["set name"]}</span>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="w-full" id={`Sphere`}>
            <Dropdown label={`${t('Btn-affix-sphere')}: ${mainAffixPicked.Sphere.affix}`} theme={{ floating: { target: "w-full" } }}>
              {RELIC_MAIN_AFFIX_ID.Sphere.map(affixs => (
                <Dropdown.Item key={affixs.id} id={"Sphere-" + affixs.affix} onPointerDown={handlePickMainAffix}>
                  {affixs.affix}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="w-full" id={`Rope`}>
            <Dropdown label={`${t('Btn-affix-rope')}: ${mainAffixPicked.Rope.affix}`} theme={{ floating: { target: "w-full" } }}>
              {RELIC_MAIN_AFFIX_ID.Rope.map(affixs => (
                <Dropdown.Item key={affixs.id} id={"Rope-" + affixs.affix} onPointerDown={handlePickMainAffix}>
                  {affixs.affix}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
        </>
      }

      {openRelicSet4BodyFootList &&
        <>
          <div className="w-full col-span-2" id={`Set4Bot`}>
            <Dropdown
              className="h-[20rem] overflow-auto"
              label={"Bot: " + relicSet4BodyFoot[`${locale === "vn" ? "ten set" : "set name"}`]}
              theme={{ floating: { target: "w-full" } }}
            >
              {relicSet4SetList.map(rl => (
                <Dropdown.Item className="pl-2 py-0" key={rl.id} id={rl.id.toString()} onPointerDown={handlePickRelicSet4BodyFootList}>
                  <Image src={`/relics/${rl.code}.webp`} alt={`Relic ${rl["ten set"]}`} width="30" height="30"
                    style={{ width: 'auto', height: 'auto' }} />
                  <span className="pl-2">{locale === "vn" ? rl["ten set"] : rl["set name"]}</span>
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="w-full" id={`Body`}>
            <Dropdown label={"Áo: " + mainAffixPicked.Body.affix} theme={{ floating: { target: "w-full" } }}>
              {RELIC_MAIN_AFFIX_ID.Body.map(affixs => (
                <Dropdown.Item key={affixs.id} id={"Body-" + affixs.affix} onPointerDown={handlePickMainAffix}>
                  {affixs.affix}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
          <div className="w-full" id={`Foot`}>
            <Dropdown label={"Giày: " + mainAffixPicked.Foot.affix} theme={{ floating: { target: "w-full" } }}>
              {RELIC_MAIN_AFFIX_ID.Foot.map(affixs => (
                <Dropdown.Item key={affixs.id} id={"Foot-" + affixs.affix} onPointerDown={handlePickMainAffix}>
                  {affixs.affix}
                </Dropdown.Item>
              ))}
            </Dropdown>
          </div>
        </>
      }
    </form>
  )
}

export default CharacterStat