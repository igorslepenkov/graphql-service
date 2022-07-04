import { gql } from "apollo-server";

const bandsTypeDefs = gql`
  type Member {
    artist: String
    instrument: String
    years: String
  }

  input MemberInput {
    artist: String
    instrument: String
    years: String
  }

  type Band {
    id: ID!
    name: String
    origin: String
    members: [Member]
    website: String
    genres: [Genre]
  }

  input BandInput {
    name: String!
    origin: String
    membersIds: [MemberInput]
    website: String
    genresIds: [String]
  }

  input BandUpdateInput {
    name: String
    origin: String
    membersIds: [MemberInput]
    website: String
    genres: [String]
  }

  type Query {
    bands: [Band]
    band(id: ID!): Band
  }

  type Mutation {
    createBand(input: BandInput!): Band
    deleteBand(id: ID!): Boolean
    updateBand(id: ID!, body: BandUpdateInput!): Band
  }
`;

export { bandsTypeDefs };
