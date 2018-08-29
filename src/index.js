const { GraphQLServer } = require('graphql-yoga')
const resolvers = require('./resolvers')
const { Prisma } = require('./generated/prisma')

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  resolvers,
  context: request => ({
    ...request,
    prisma: new Prisma({
      debug: true,
      endpoint: 'https://eu1.prisma.sh/nikolas-burk/hackernews-node-pc/dev',
    })
  }),
})

server.start({port: 4001},() => console.log(`Server is running on http://localhost:4001`))
