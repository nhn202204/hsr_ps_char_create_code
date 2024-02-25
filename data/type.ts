import { STATS } from "./constant"

export type CharacterDatas = CharacterData[]

export interface CharacterData {
  id: number
  name: string
  path: string
  "van menh": string
  type: string
  he: string
  lc: string
  set_2: string
  set_4_top: string
  set_4_bot: string
  E: number
  S: number
  top: number
  left: number
  scale: number
  HP: number
  ATK: number
  DEF: number
  SPD: number
  CR: number
  CD: number
  BREAK: number
  HEAL: number
  ERR: number
  EHR: number
  RES: number
  "ELE DMG": number
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
}

export type RelicMainAffix = {
  Body: ["HP", "ATK", "DEF", "EFR", "HEAL", "CR", "CD"],
  Foot: ["HP", "ATK", "DEF", "SPD"],
  Sphere: ["HP ", "ATK ", "DEF ", "PHYSICAL DMG", "FIRE DMG", "ICE DMG", "WIND DMG", "LIGHTNING DMG", "QUANTUM DMG", "IMAGINARY DMG"],
  Rope: ["HP ", "ATK ", "DEF ", "BREAK", "ERR"],
}

export type ValidMainAffix = "ATK" | "HP" | "SPD" | "DEF" | "CR" | "EHR" | "CD" | "BREAK" | "ERR"