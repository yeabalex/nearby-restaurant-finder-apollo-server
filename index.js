"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const server_1 = require("@apollo/server");
const standalone_1 = require("@apollo/server/standalone");
const schemas_1 = require("./graphql/schemas");
const restaurant_resolver_1 = require("./graphql/resolvers/restaurant.resolver");
const server = new server_1.ApolloServer({
    typeDefs: schemas_1.mergedTypeDefs,
    resolvers: restaurant_resolver_1.restaurantResolvers,
});
async function startServer() {
    const { url } = await (0, standalone_1.startStandaloneServer)(server, {
        listen: { port: 4000 },
    });
    console.log(`${url}`);
}
startServer();
