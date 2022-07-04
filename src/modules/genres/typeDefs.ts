import { gql } from "apollo-server";

const genresTypeDefs = gql`
  type Genre {
    id: ID!
    name: String
    description: String
    country: String
    year: Int
  }
  type Query {
    genres: [Genre]
  }
`;

export { genresTypeDefs };
