// 'use client'

import CharacterSelector from '@/components/CharacterSelector';
import { CharacterDatas } from '@/data/type';

import { promises as fs } from 'fs';

export default async function CharacterPage() {

  const file = await fs.readFile(process.cwd() + '/data/characters.json', 'utf8');
  const datas: CharacterDatas = JSON.parse(file);

  return (
    <CharacterSelector {...{ datas }} />
  )
}


