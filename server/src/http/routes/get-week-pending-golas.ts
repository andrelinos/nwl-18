import { getWeekPendingGoals } from '@/app/functions/get-week-pending-goals'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getWeekPendingGoalsRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/pending',
    {
      schema: {
        tags: ['goal'],
        summary: 'Get pending goals for the week',
        description: 'Retrieves pending goals for the week',
      },
    },
    async () => {
      const { pendingGoals } = await getWeekPendingGoals()

      return { pendingGoals }
    }
  )
}
