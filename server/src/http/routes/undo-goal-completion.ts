import { undoGoalCompletion } from '@/app/functions/undo-goal-completion'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const undoGoalCompletionRoute: FastifyPluginAsyncZod = async app => {
  app.delete(
    '/completions',
    {
      schema: {
        tags: ['completion'],
        summary: 'Remove a goal completion',
        description: 'Removes a goal completion',
        body: z.object({
          goalId: z.string(),
        }),
      },
    },
    async request => {
      const { goalId } = request.body

      await undoGoalCompletion({
        goalId,
      })

      return {
        message: 'Goal removed success!',
      }
    }
  )
}
