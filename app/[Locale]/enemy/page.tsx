// 'use client'

import EnemyWavesComp from "@/components/EnemyWaves"
import { NextPage } from "next"
import { useTranslations } from "next-intl";
import { Alert } from 'flowbite-react';

const EnemyPage: NextPage = (context) => {

  const t = useTranslations('EnemyPage');

  return (
    <div className="w-full flex flex-col p-2 gap-1">
      <Alert color="failure">
        <span className="font-medium">{t(`notice`)}</span>
      </Alert>
      <Alert color="failure">
        <span className="font-medium">{t(`notice-enemy-id`)}</span>
      </Alert>
      <Alert color="failure">
        <span className="font-medium">{t(`notice-careful-add-enemy-id`)}</span>
      </Alert>
      <EnemyWavesComp />


      {/* <div>
        <div>
          {t(`number-of-wave`)}
        </div>
      </div> */}
    </div>
  )
}

export default EnemyPage
