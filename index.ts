const { ApolloServer, gql } = require("apollo-server");
import { pokemons, dresseurs } from "./data";
import { typeDefs } from "./gqlTypes";

let pokemonsInMemory = pokemons;
let dresseursInMemory = dresseurs;

const resolvers = {
  Query: {
    pokemons: () => {
      return pokemonsInMemory;
    },
    dresseurs: () => {
      return dresseurs;
    },
    paginatedPokemons(parent, args, context, info) {
      return pokemonsInMemory.slice(args.offset, args.offset + args.limit);
    },
  },
  Mutation: {
    updatePokemon: (parent, args) => {
      console.log(args);

      const objIndex = pokemonsInMemory.findIndex((obj) => obj.id == args.id);

      const pokemonToUpdate = pokemonsInMemory[objIndex];
      if (pokemonToUpdate) {
        pokemonToUpdate.name = args.name ?? pokemonToUpdate.name;
        pokemonToUpdate.id = args.id ?? pokemonToUpdate.id;
      }

      return pokemonToUpdate;
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
