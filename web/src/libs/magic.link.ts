import { env } from '@/env'
import { Magic } from 'magic-sdk'

export const magic = new Magic(env.VITE_MAGIC_LINK_PUBLIC_API_KEY, {
  // testMode: true,
})
