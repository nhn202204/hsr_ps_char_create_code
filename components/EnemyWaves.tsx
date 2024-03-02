'use client'

import { EnemyWaveType, EnemyWavesType } from "@/data/type"
import { FC, useEffect, useState } from "react"
import { useIsClient, useLocalStorage } from "usehooks-ts"
import EnemyWaveComp from "@/components/EnemyWave"
import { Button } from "flowbite-react"
import { useTranslations } from "next-intl"

const _waves: EnemyWavesType = [
  { id: 1, mobIds: [3013010, 3012010, 3013010, 3001010, 3012010], level: 90 },
  { id: 2, mobIds: [8034010], level: 90 },
  { id: 3, mobIds: [3014022], level: 90 }
]

const EnemyWavesComp: FC = () => {

  const t = useTranslations('EnemyPage');

  const [persitWaves, setPersitWaves] = useLocalStorage<EnemyWavesType>('enemy-waves', _waves)

  const [waves, setWaves] = useState<EnemyWavesType>(_waves)

  const isClient = useIsClient()

  const handleSaveEnemyWave = (w: EnemyWaveType, type: "save" | "remove") => {
    const idx = waves.findIndex(wave => wave.id === w.id)
    const newWaves = ([...waves])
    if (type === "save") {
      newWaves.splice(idx, 1, w)
    } else {
      newWaves.splice(idx, 1)
    }
    setWaves(newWaves)
  }

  const handleWavePosition = (w: EnemyWaveType, type: "up" | "down") => {
    const idx = waves.findIndex(wave => wave.id === w.id)
    if (type === "up" && idx === 0) return
    if (type === "down" && idx === waves.length) return
    const newWaves = ([...waves])
    newWaves.splice(idx, 1)
    const step = type === "up" ? -1 : 1
    newWaves.splice(idx + step, 0, w)
    setWaves(newWaves)
  }

  const handleAddWave = () => {
    const newWaves = [...waves].concat([{ id: waves.length + 1, mobIds: [3013010, 3012010, 3013010, 3001010, 3012010], level: 90 }])
    setWaves(newWaves)
  }

  useEffect(() => {
    setWaves(persitWaves)
  }, [])

  useEffect(() => {
    setPersitWaves(waves)
  }, [waves])

  if (!isClient) return <p className="w-full flex justify-center">Loading...</p>

  return (
    <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-3 md:gap-3">
      {waves.map((wave, i) =>
        <EnemyWaveComp index={i} length={waves.length}
          goDown={(w) => handleWavePosition(w, "down")} goUp={(w) => handleWavePosition(w, "up")}
          key={wave.id} parentWave={wave} saveWaveFn={handleSaveEnemyWave}
        />)
      }
      <Button color={"success"} className="" onClick={() => { handleAddWave() }}>
        {t(`add-wave`)}
      </Button>
    </div>
  )
}

export default EnemyWavesComp