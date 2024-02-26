// 'use client'

import CharacterSelector from '@/components/CharacterSelector';

import { promises as fs } from 'fs';

export default async function CharacterPage() {

  const file = await fs.readFile(process.cwd() + '/data/characters.json', 'utf8');
  const data: { id: number, name: string }[] = JSON.parse(file);

  return (
    <CharacterSelector {...{ data }} />
  )
}


