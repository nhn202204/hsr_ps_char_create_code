import type { LightconeData, LightconeDatas } from '@/data/type'
import { Atom, atom } from 'jotai'
import { atomFamily, atomWithStorage } from 'jotai/utils'

export type PickedLC = { lc: LightconeData, charID: number }

export const pickedLCsAtom = atomWithStorage<PickedLC[]>('pickedLCsAtom', [])

export const ssrLightconeDatasAtom = atomWithStorage<LightconeDatas | null>('pickedLCAtom', null)

export const setPickLCsAtom = atom(
  null,
  (get, set, newPickedLC: PickedLC) => {
    console.log("🚀 ~ newPickedLC:", newPickedLC)
    const oldPickedLCs = get(pickedLCsAtom).slice(0)
    const idx = oldPickedLCs.findIndex(picked => picked.charID === newPickedLC.charID)
    if (idx > -1) {
      set(pickedLCsAtom, oldPickedLCs.splice(idx, 1, newPickedLC))
    } else set(pickedLCsAtom, oldPickedLCs.concat([newPickedLC]))
  },
)

export const getPickedLCAtomFamily = atomFamily<number, Atom<PickedLC | undefined>>(
  (charID) => atom((get) => {
    const pickedLCs = get(pickedLCsAtom)
    const pickedLC = pickedLCs.find(picked => picked.charID === charID)
    if (pickedLC === undefined) {

    }
    return pickedLC
  })
)

