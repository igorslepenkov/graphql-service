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
    instruments: [String]
  }

  type ArtistMemberOutput {
    id: ID!
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    instruments: [String]
  }

  input AtristInput {
    firstName: String!
    secondName: String!
    middleName: String
    birthDate: String
    birthPlace: String
    country: String!
    bandsIds: [ID]
    instruments: [String]
  }

  input ArtistUpdateInput {
    firstName: String
    secondName: String
    middleName: String
    birthDate: String
    birthPlace: String
    country: String
    bandsIds: [ID]
    instruments: [String]
  }

  type Query {
    artists(limit: Int, offset: Int): [Artist]
    artist(id: ID!): Artist
  }

  type Mutation {
    createArtist(input: AtristInput!): Artist
    deleteArtist(id: ID!): Boolean
    updateArtist(id: ID!, body: ArtistUpdateInput!): Artist
  }
`;

export { artistsTypeDefs };
