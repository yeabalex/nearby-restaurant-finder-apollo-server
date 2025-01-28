import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { mergedTypeDefs } from "./graphql/schemas";
import { restaurantResolvers } from "./graphql/resolvers/restaurant.resolver";

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: restaurantResolvers,
});
async function startServer() {
  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`${url}`);
}

startServer();
