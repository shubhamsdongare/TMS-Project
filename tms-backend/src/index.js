const { ApolloServer } = require("apollo-server");
const typeDefs = require("./schema/typeDefs");
const resolvers = require("./resolvers/shipmentResolver");
const auth = require("./auth/auth");

const PORT = process.env.PORT || 4000;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user = auth(req);
    return { user };
  },
});

server.listen({ port: PORT }).then(({ url }) => {
  console.log(`TMS GraphQL running at ${url}`);
});
