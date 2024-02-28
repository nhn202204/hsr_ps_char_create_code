'use client'

import Image from "next/image"
import CheckBoxButton from '@/components/CheckBoxButton'
import { ChangeEventHandler, useEffect, useState } from "react"
import { useLocalStorage } from 'usehooks-ts'
import { useIsClient } from 'usehooks-ts'
import ColorTag from "./ColorTag"
import { useTranslations } from "next-intl"
import { CharacterDatas } from "@/data/type"
import StickyButton from "./StickyButton"

const CharacterSelector: React.FC<{ datas: CharacterDatas }> = ({ datas }) => {

  const t = useTranslations('StickyButton');

  const [charObjSelected, setCharObjSelected] = useLocalStorage<CharacterDatas>("char-obj-selected", [])

  const isClient = useIsClient()

  if (!isClient) return <div className="w-full flex justify-center">Loading...</div>

  const onCharacterSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, checked } = e.target
    const isExited = charObjSelected.some(char => char.id.toString() === id)
    const charObj = datas.find(char => char.id.toString() === id) as CharacterDatas[number]
    if (checked === true && isExited === false) {
      setCharObjSelected([...charObjSelected, charObj])
    } else if (checked === false && isExited) {
      setCharObjSelected(charObjSelected.filter(char => char.id.toString() !== id))
    }
  }

  return (
    <div className="flex flex-col w-full relative px-2">
      <p className="flex w-full justify-center">Select your characters</p>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2 lg:gap-3">
        {datas.map(({ id, name }) =>
          <CheckBoxButton key={id} id={id} onChange={onCharacterSelect} checked={charObjSelected.find(char => (char.id === id)) !== undefined}>
            <ColorTag label={name + " - id " + id} className="absolute bottom-4 left-4" />
            <Image src={`/characters/${id}.webp`} alt={name + " image"} width="500" height="500" priority />
          </CheckBoxButton>)}
      </div>

      <StickyButton
        pathname={"/equipment"}
        ids={charObjSelected.map(char => char.id.toString())}
        text={t('character-page')}
      />
    </div>
  )

}

export default CharacterSelector