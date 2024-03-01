// 'use client'

import CharacterSelector from '@/components/CharacterSelector';
import { CharacterDatas } from '@/data/type';
import { Navbar } from 'flowbite-react';

import { promises as fs } from 'fs';
// import path from 'path';

export default async function CharacterPage() {

  const fileCharacters = await fs.readFile(process.cwd() + '/data/characters.json', 'utf8');
  const datas = (JSON.parse(fileCharacters) as CharacterDatas).sort((a, b) => a.stt - b.stt)

  return (
    <>
      <CharacterSelector {...{ datas }} />
    </>
  )
}


