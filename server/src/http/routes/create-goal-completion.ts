import { createGoalCompletion } from '@/app/functions/create-goal-completion'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const createGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.post(
    '/completions',
    {
      schema: {
        tags: ['completion'],
        summary: 'Create a new goal completion',
        description: 'Creates a new goal completion',
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body

      const { goalCompletion } = await createGoalCompletion({
        goalId,
      })

      return { goalCompletionId: goalCompletion.id }
    }
  )
}
