// 'use client'

import CharacterSelector from '@/components/CharacterSelector';
import { CharacterDatas } from '@/data/type';

import { promises as fs } from 'fs';
import path from 'path';

export default async function CharacterPage() {

  const fileCharacters = await fs.readFile(path.resolve() + '/data/characters.json', 'utf8');
  const datas: CharacterDatas = JSON.parse(fileCharacters)

  return (
    <CharacterSelector {...{ datas }} />
  )
}


