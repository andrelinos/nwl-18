import { getWeekSummary } from '@/app/functions/get-week-summary'
import type { FastifyPluginAsyncZod } from 'fastify-type-provider-zod'

export const getWeekSummaryRoute: FastifyPluginAsyncZod = async app => {
  app.get(
    '/summary',
    {
      schema: {
        tags: ['summary'],
        summary: 'Get weekly summary',
        description: 'Retrieves weekly summary',
      },
    },
    async () => {
      const { summary } = await getWeekSummary()

      return { summary }
    }
  )
}
