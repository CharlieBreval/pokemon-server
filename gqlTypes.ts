import { gql } from "apollo-server";

export const typeDefs = gql`
  enum Cartouche {
    BLUE
    RED
    GOLD
  }

  type Pokemon {
    id: ID
    name: String
    type: String
    cartouche: Cartouche
  }

  type Dresseur {
    id: ID
    name: String
    pokemons: [Pokemon]
  }

  type Query {
    pokemons: [Pokemon]
    dresseurs: [Dresseur]
    pokemon(id: ID!): Pokemon
    paginatedPokemons(offset: Int!, limit: Int!): [Pokemon]
  }

  type Mutation {
    updatePokemon(id: ID!, name: String, type: String): Pokemon!
  }
`;
