import { createGoalRoute } from '@/http/routes/create-goal'
import { createGoalCompletionRoute } from '@/http/routes/create-goal-completion'
import { getWeekPendingGoalsRoute } from '@/http/routes/get-week-pending-golas'
import { getWeekSummaryRoute } from '@/http/routes/get-week-summary'
import { undoGoalCompletionRoute } from '@/http/routes/undo-goal-completion'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUI from '@fastify/swagger-ui'
import fastify from 'fastify'
import {
  type ZodTypeProvider,
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.register(fastifyCors, { origin: '*' })

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'io.orbit',
      description: 'Full-stack goals app',
      version: '0.1.0',
    },
    servers: [],
  },

  transform: jsonSchemaTransform,
})

app.register(fastifySwaggerUI, {
  routePrefix: '/docs',
})

app.register(createGoalRoute)
app.register(createGoalCompletionRoute)
app.register(undoGoalCompletionRoute)
app.register(getWeekSummaryRoute)
app.register(getWeekPendingGoalsRoute)

app.listen({ port: 3333 }).then(() => {
  console.log('HTTP Server running 3333!')
})
