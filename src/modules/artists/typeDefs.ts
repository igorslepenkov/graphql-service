import { gql } from "apollo-server";

const artistsTypeDefs = gql`
  type Artist {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [Band]
    instruments: String
  }

  input AtristInput {
    firstName: String!
    secondName: String!
    middleName: String
    birthDate: String
    birthPlace: String
    country: String!
    bands: [String]
    instruments: [String]
  }

  input ArtistUpdateInput {
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bands: [String]
    instruments: [String]
  }

  type Query {
    artists: [Artist]
    artist(id: ID!): Artist
  }

  type Mutation {
    createArtist(input: AtristInput!): Artist
    deleteArtist(id: ID!): Boolean
    updateArtist(id: ID!, body: ArtistUpdateInput!): Artist
  }
`;

export { artistsTypeDefs };
