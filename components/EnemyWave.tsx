'use client'

import { Button } from "flowbite-react"
import { FC, useState, memo, ChangeEventHandler, ChangeEvent } from "react"

import type { EnemyWaveType } from '@/data/type'
import ColorTag from "./ColorTag"
import { useTranslations } from "next-intl"

interface Props {
  parentWave: EnemyWaveType
  saveWaveFn: (w: EnemyWaveType, type: "save" | "remove") => void
  goUp: (w: EnemyWaveType) => void
  goDown: (w: EnemyWaveType) => void
  index: number, length: number
}

const EnemyWaveComp: FC<Props> = ({ parentWave, saveWaveFn, goUp, goDown, index, length }) => {

  const t = useTranslations('EnemyPage');

  const [edit, setEdit] = useState(false)

  const [wave, setWave] = useState<EnemyWaveType>(parentWave)

  const handleRemoveEnemy: (idx: number) => void = (idx) => {
    setWave(old => ({ ...old, ...{ mobIds: old.mobIds.filter((_, i) => i !== idx) } }))
  }

  const handleAddEnemy = () => {
    setWave(old => ({ ...old, ...{ mobIds: old.mobIds.concat([3002040]) } }))
  }

  const handleChangeLevel: ChangeEventHandler<HTMLInputElement> = (e) => {
    e.preventDefault()
    let newLvl = parseInt(e.currentTarget.value) || ""
    //@ts-ignore
    setWave(old => ({ ...old, ...{ level: newLvl } }))
  }

  const completeEdit = (type: "save" | "remove" | "cancel" | "") => {
    if (type === "save") {
      const newWave = { ...wave, ...{ level: wave.level < 60 ? 60 : (wave.level > 95 ? 95 : wave.level) } }
      setWave(newWave)
      saveWaveFn(newWave, type)
      setEdit(!edit)
    } else if (type === "remove") {
      saveWaveFn(wave, type)
    } else {
      setEdit(!edit)
    }
  }

  const onChangeEnemyId = ({ id, idx, e }: { id: number, idx: number, e: ChangeEvent<HTMLInputElement> }) => {
    const newWave = { ...wave }
    newWave.mobIds.splice(idx, 1, parseInt(e.currentTarget.value))
    console.log("🚀 ~ onChangeEnemyId ~ newWave:", newWave)
    setWave(newWave)
  }

  return (
    <div className="w-full flex flex-col gap-3">
      <div className="grid grid-cols-10 gap-2 w-full p-2 shadow-md bg-gray-300 rounded-xl">
        <div className={`${edit ? "col-span-10" : "col-span-9"} transition-all grid grid-cols-2 gap-2`}>
          <div className="col-span-2">
            <div className="w-full grid grid-cols-10 gap-1">
              <div className="col-span-7 flex items-center">
                {`Wave ID: ${wave.id}, level ${edit ? "(60 - 95): " : ": " + wave.level}`}
              </div>
              {edit &&
                <input type="number" id="number-input" aria-describedby="helper-text-explanation"
                  value={wave.level} onChange={handleChangeLevel}
                  className="bg-gray-50 border-none text-gray-900 text-sm focus:outline-none rounded-lg w-full p-2.5 col-span-3"
                  placeholder="Enemy Level" required
                />
              }
            </div>
          </div>

          <div className={`w-full col-span-2 grid gap-1 ${edit ? 'grid-cols-2' : 'grid-cols-5'}`}>
            {wave.mobIds.map((id, idx) => {

              return edit ?
                <InputNumber removeFn={handleRemoveEnemy} key={idx+id} id={id} idx={idx} changeFn={(e) => onChangeEnemyId({ id, idx, e })} />
                :
                <ColorTag key={id + idx} label={id.toString()} className="text-[0.7rem] px-2" />
            })}
          </div>
          {
            (edit && wave.mobIds.length < 5) &&
            <Button className="col-span-2" onClick={() => { handleAddEnemy() }}>
              {edit ? t(`add-enemy`) : t(`btn-edit`)}
            </Button>
          }

          <Button className="col-span-1" onClick={() => { completeEdit(edit ? "save" : "") }}>
            {edit ? t(`btn-save`) : t(`btn-edit`)}
          </Button>
          <Button color={"failure"} className="col-span-1" onClick={() => { completeEdit(edit ? "cancel" : "remove") }}>
            {edit ? t(`btn-cancel`) : t(`btn-remove`)}
          </Button>
        </div>

        {!edit &&
          <div className={`col-span-1 flex flex-col items-center justify-around`}>
            <button type="button" disabled={index === 0}
              className={`p-2 h-1/3 bg-blue-700 hover:bg-blue-800 shadow-lg
                        disabled:outline-none disabled:bg-gray-500 disabled:shadow-none active:outline-none
                        focus:outline-none focus:shadown-none rounded-t-full`}
              onClick={() => goUp(wave)}
            >
              <svg width="10px" height="10px" transform="scale(-1 -1)" viewBox="0 0 1024 1024" ><path d="M512 768l448-512H64z" fill="#ffffff" /></svg>
            </button>

            <button type="button" disabled={index === length - 1}
              className={`p-2 h-1/3 bg-blue-700 hover:bg-blue-800 shadow-lg
                        disabled:outline-none disabled:bg-gray-500 disabled:shadow-none active:outline-none
                        focus:outline-none focus:shadown-none rounded-b-full`}
              onClick={() => goDown(wave)}
            >
              <svg width="10px" height="10px" viewBox="0 0 1024 1024" ><path d="M512 768l448-512H64z" fill="#ffffff" /></svg>
            </button>
          </div>
        }
      </div>

    </div>
  )
}

export default memo(EnemyWaveComp)

const InputNumber: React.FC<{ id: number, idx: number, removeFn: (id: number) => void, changeFn: ChangeEventHandler<HTMLInputElement> }> = ({ id, idx, removeFn, changeFn }) => {

  const [mobId, setMobId] = useState(id)

  return (
    <div className="grid grid-cols-5 relative">
      {/* <label htmlFor="number-input" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Select a number:</label> */}
      <input type="number" id="number-input" aria-describedby="helper-text-explanation" value={mobId} onChange={changeFn}
        className="bg-gray-50 border-none text-gray-900 text-sm focus:outline-none rounded-lg
                  block w-full p-2.5 col-span-4"
        placeholder="Enemy ID" required
      />
      <button id={"remove-enemy-button" + id.toString()} aria-describedby="remove-enemy-button" onClick={() => removeFn(idx)}
        className="bg-red-600 border-none rounded-full focus:none absolute top-1/2 -translate-y-1/2 right-[1px]
                    flex justify-center items-center p-[0.6rem] col-span-1"
      >
        <svg fill="#f2b6b6" width="10px" height="10px" viewBox="0 0 348.333 348.334">
          <g>
            <path d="M336.559,68.611L231.016,174.165l105.543,105.549c15.699,15.705,15.699,41.145,0,56.85
                    c-7.844,7.844-18.128,11.769-28.407,11.769c-10.296,0-20.581-3.919-28.419-11.769L174.167,231.003L68.609,336.563
                    c-7.843,7.844-18.128,11.769-28.416,11.769c-10.285,0-20.563-3.919-28.413-11.769c-15.699-15.698-15.699-41.139,0-56.85
                    l105.54-105.549L11.774,68.611c-15.699-15.699-15.699-41.145,0-56.844c15.696-15.687,41.127-15.687,56.829,0l105.563,105.554
                    L279.721,11.767c15.705-15.687,41.139-15.687,56.832,0C352.258,27.466,352.258,52.912,336.559,68.611z"/>
          </g>
        </svg>
      </button>
    </div>
  )
}