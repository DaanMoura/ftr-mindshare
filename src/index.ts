import express from 'express'
import { ApolloServer } from '@apollo/server'
import { buildSchema } from 'graphql'
import { expressMiddleware } from '@as-integrations/express5'

async function bootstrap() {
  const app = express()

  const schema = await buildSchema({
    resolvers: [],
    validate: false,
    emitSchemaFile: 'schema.graphql'
  })

  const server = new ApolloServer({ schema })

  await server.start()

  app.use('/graphql', express.json(), expressMiddleware(server))

  app.listen({ port: 4000 }, () => {
    console.log(`🚀 Server ready at http://localhost:4000/graphql`)
  })
}

bootstrap()
