const { ApolloServer, gql } = require("apollo-server");
import { pokemons, dresseurs } from "./data";
import { typeDefs } from "./gqlTypes";

const resolvers = {
  Query: {
    pokemons: () => {
      return [pokemons[1]];
    },
    dresseurs: () => {
      return dresseurs;
    },
    paginatedPokemons(parent, args, context, info) {
      return pokemons.slice(args.offset, args.offset + args.limit);
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
});

server.listen().then(({ url }: { url: string }) => {
  console.log(`🚀  Server ready at ${url}`);
});
