'use server'

import { cookies } from 'next/headers'

export const cookiesSet = (search: string) => {
  cookies().set('query', search)

  console.log("🚀 ~ cookies():", cookies().get('query'))
}