import { gql } from "apollo-server";

const genresTypeDefs = gql`
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }

  input GenreInput {
    name: String!
    description: String
    country: String
    year: Int
  }

  input GenreUpdateInput {
    name: String
    description: String
    country: String
    year: Int
  }

  type Query {
    genres(limit: Int, offset: Int): [Genre]
    genre(id: ID!): Genre
  }

  type Mutation {
    createGenre(input: GenreInput!): Genre
    deleteGenre(id: ID!): Boolean
    updateGenre(id: ID!, body: GenreUpdateInput!): Genre
  }
`;

export { genresTypeDefs };
