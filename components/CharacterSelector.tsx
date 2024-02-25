'use client'

import Image from "next/image"
import CheckBoxButton from '@/components/CheckBoxButton'
import { ChangeEventHandler, useEffect, useState } from "react"
import Link from "next/link"
import { useLocalStorage } from 'usehooks-ts'
import { useIsClient } from 'usehooks-ts'
import ColorTag from "./ColorTag"

const CharacterSelector: React.FC<{ data: { id: number, name: string }[] }> = ({ data }) => {

  const [charListSelected, setListSelected] = useLocalStorage<number[]>("selected", [])

  const isClient = useIsClient()

  useEffect(() => {
    console.log("🚀 ~ charListSelected:", charListSelected)
  }, [charListSelected])

  if (!isClient) return <p>Loading...</p>

  const onCharacterSelect: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { id, checked } = e.target
    const numberID = parseInt(id)
    const idExisted = charListSelected.indexOf(numberID) > -1
    // console.log(`${id} is ${checked ? "checked" : "unchecked"}`)
    if (checked === true && idExisted === false) {
      setListSelected([...charListSelected, numberID])
    } else if (checked === false && idExisted === true) {
      setListSelected(charListSelected.filter(_id => _id !== numberID))
    }
  }

  return (
    <div className="flex flex-col w-full relative px-2 pb-4">
      <p className="flex w-full justify-center">Select your characters</p>
      <div className="relative grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1 sm:gap-2 lg:gap-3">
        {data.map(({ id, name }) =>
          <CheckBoxButton key={id} id={id} onChange={onCharacterSelect} checked={charListSelected.indexOf(id) > -1}>
          <ColorTag label={name + " - id " + id} className="absolute bottom-4 left-4"/>
            <Image src={`/characters/${id}.webp`} alt={name + " image"} width="500" height="500" priority />
          </CheckBoxButton>)}
      </div>

      <Link href={{ pathname: "/equipment", query: { ids: charListSelected } }}
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg
               text-sm mx-5 px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 text-center
               sticky bottom-4">
        {'Tới trang set di vật, stat'}
      </Link>
    </div>
  )

}

export default CharacterSelector