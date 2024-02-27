'use client'

import Image from "next/image"
import CheckBoxButton from '@/components/CheckBoxButton'
import { ChangeEventHandler, useEffect, useState } from "react"
import Link from "next/link"
import { useLocalStorage } from 'usehooks-ts'
import { useIsClient } from 'usehooks-ts'
import ColorTag from "./ColorTag"
import { useTranslations } from "next-intl"
import { CharacterDatas } from "@/data/type"

const CharacterSelector: React.FC<{ datas: CharacterDatas }> = ({ datas }) => {

  const t = useTranslations('StickyButton');

  const [charObjSelected, setCharObjSelected] = useLocalStorage<CharacterDatas>("char-obj-selected", [])

  const isClient = useIsClient()

  if (!isClient) return <div className="w-full flex justify-center">Loading...</div>

  const onCharacterSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, checked } = e.target
    console.log("🚀 ~ checked:", checked)
    console.log("🚀 ~ id:", id)
    const isExited = charObjSelected.some(char => char.id.toString() === id)
    const charObj = datas.find(char => char.id.toString() === id) as CharacterDatas[number]
    console.log("🚀 ~ charObj:", charObj)
    // console.log(`${id} is ${checked ? "checked" : "unchecked"}`)
    if (checked === true && isExited === false) {
      setCharObjSelected([...charObjSelected, charObj])
    } else if (checked === false && isExited) {
      setCharObjSelected(charObjSelected.filter(char => char.id.toString() !== id))
    }
  }

  return (
    <div className="flex flex-col w-full relative px-2 pb-4 pt-5">
      <p className="flex w-full justify-center">Select your characters</p>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2 lg:gap-3">
        {datas.map(({ id, name }) =>
          <CheckBoxButton key={id} id={id} onChange={onCharacterSelect} checked={charObjSelected.find(char => (char.id === id)) !== undefined}>
            <ColorTag label={name + " - id " + id} className="absolute bottom-4 left-4" />
            <Image src={`/characters/${id}.webp`} alt={name + " image"} width="500" height="500" priority />
          </CheckBoxButton>)}
      </div>

      <Link href={{ pathname: "/equipment", query: { ids: charObjSelected.map(char => char.id) } }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
               text-sm mx-5 px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center
               sticky bottom-4 z-20">
        {t('character-page')}
      </Link>
    </div>
  )

}

export default CharacterSelector