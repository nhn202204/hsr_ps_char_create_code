import { STATS } from "./constant"

export type CharacterDatas = CharacterData[]

export interface CharacterData {
  id: number
  stt: number
  name: string
  path: string
  "van menh": string
  type: string
  he: string
  start: number
  rank: number
  role: string
  lc: string
  mid: string
  top: string
  bot: string
  shpere: string
  rope: string
  body: string
  foot: string
  pos_top: number
  pos_left: number
  scale: number
}

export type StatObj = { [Key in typeof STATS[number]]: number } & {"ERR": number, "ELE DMG": number}

export type RelicsDatas = RelicsData[]

export interface RelicsData {
  id: number
  name: string
  code: number
  "set name": string
  "ten set": string
  set: number
}

export type LightconeDatas = LightconeData[]

export interface LightconeData {
  id: number
  name: string
  ten: string
  path: string
  "van menh": string
  note: string
  star: number
  rank: number
}

export type RelicMainAffix = {
  Body: ["HP", "ATK", "DEF", "EFR", "HEAL", "CR", "CD"],
  Foot: ["HP", "ATK", "DEF", "SPD"],
  Sphere: ["HP ", "ATK ", "DEF ", "PHYSICAL DMG", "FIRE DMG", "ICE DMG", "WIND DMG", "LIGHTNING DMG", "QUANTUM DMG", "IMAGINARY DMG"],
  Rope: ["HP ", "ATK ", "DEF ", "BREAK", "ERR"],
}

export type ValidMainAffix = "ATK" | "HP" | "SPD" | "DEF" | "CR" | "EHR" | "CD" | "BREAK" | "ERR"

export type EnemyWaveType = { id: number, mobIds: number[], level: number }

export type EnemyWavesType = EnemyWaveType[]