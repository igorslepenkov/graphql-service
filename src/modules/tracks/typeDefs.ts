import { gql } from "apollo-server";

const tracksTypeDefs = gql`
  type Track {
    id: ID!
    title: String!
    album: Album
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  type TrackAlbumOutput {
    id: ID!
    title: String!
    album: String
    artists: [Artist]
    bands: [Band]
    duration: Int
    released: Int
    genres: [Genre]
  }

  input TrackInput {
    title: String!
    albumId: String
    artistsIds: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  input TrackUpdateInput {
    title: String
    albumId: String
    artistsIds: [String]
    bandsIds: [String]
    duration: Int
    released: Int
    genresIds: [String]
  }

  type Query {
    tracks(limit: Int, offset: Int): [Track]
    track(id: ID!): Track
  }

  type Mutation {
    createTrack(input: TrackInput!): Track
    deleteTrack(id: ID!): Boolean
    updateTrack(id: ID!, body: TrackUpdateInput!): Track
  }
`;

export { tracksTypeDefs };
