import { z } from 'zod'

console.log(JSON.stringify(import.meta.env))

const envSchema = z.object({
  VITE_MAGIC_LINK_PUBLIC_API_KEY: z.string(),
})

export const env = envSchema.parse(import.meta.env)
