import { createGoal } from '@/app/functions/create-goal'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import z from 'zod'

export const createGoalRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/goals',
    {
      schema: {
        tags: ['goal'],
        summary: 'Create a new goal',
        description: 'Creates a new goal',
        body: z.object({
          title: z.string().min(1).max(100),
          desiredWeeklyFrequency: z.number().min(1).max(52),
        }),
      },
    },
    async request => {
      const { title, desiredWeeklyFrequency } = request.body

      await createGoal({
        title,
        desiredWeeklyFrequency,
      })
    }
  )
}
