import { gql } from "apollo-server";

const bandsTypeDefs = gql`
  type Member {
    artist: ArtistMemberOutput
    instrument: String
    years: String
  }

  input MemberInput {
    artist: ID!
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
    members: [MemberInput]
    website: String
    genresIds: [String]
  }

  input BandUpdateInput {
    name: String
    origin: String
    members: [MemberInput]
    website: String
    genresIds: [String]
  }

  type Query {
    bands(limit: Int, offset: Int): [Band]
    band(id: ID!): Band
  }

  type Mutation {
    createBand(input: BandInput!): Band
    deleteBand(id: ID!): Boolean
    updateBand(id: ID!, body: BandUpdateInput!): Band
  }
`;

export { bandsTypeDefs };
