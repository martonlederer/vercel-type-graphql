import 'reflect-metadata'
import { NowRequest, NowResponse } from '@vercel/node'
import { ApolloServer } from 'apollo-server-micro'
import { buildSchema } from 'type-graphql'
import { ExampleResolver } from './utils/resolvers'

// creates an apollo handler
// we don't have express with serverless functions, so we can just return the handler to vercel
export default async (req: NowRequest, res: NowResponse) => {
  const serverHandler = await loadApolloHandler()
  return serverHandler(req, res)
}

// we need bodyParser disabled for this
export const config = {
  api: { bodyParser: false }
}

let apolloHandler: (req: any, res: any) => Promise<void>

// load the apollo handler if it is not yet defined
async function loadApolloHandler() {
  if (!apolloHandler) {
    const 
      schema = await buildSchema({ resolvers: [ExampleResolver] }),
      server = new ApolloServer({ 
        schema, 
        playground: true, // can be disabled for production by deleting this line (playground will still work with vc dev)
        introspection: true // this is NEEDED for serverless functions, unless it will throw a 400 error
      })

    // create the actual handler
    // IMPORTANT: 
    // if you change the path of this file, make sure to update the path above
    apolloHandler = server.createHandler({ path: '/api' })
  }

  return apolloHandler
}