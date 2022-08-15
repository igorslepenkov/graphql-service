import { gql } from "apollo-server";

const albumsTypeDefs = gql`
  type Album {
    id: ID!
    name: String
    released: Int
    artists: [Artist]
    bands: [Band]
    tracks: [TrackAlbumOutput]
    genres: [Genre]
    image: String
  }

  input AlbumInput {
    name: String!
    released: Int
    artistsIds: [ID]
    bandsIds: [ID]
    trackIds: [ID]
    genresIds: [ID]
    image: String
  }

  input AlbumUpdateInput {
    name: String!
    released: Int
    artistsIds: [ID]
    bandsIds: [ID]
    trackIds: [ID]
    genresIds: [ID]
    image: String
  }

  type Query {
    albums(limit: Int, offset: Int): [Album]
    album(id: ID!): Album
  }

  type Mutation {
    createAlbum(input: AlbumInput!): Album
    deleteAlbum(id: ID!): Boolean
    updateAlbum(id: ID!, body: AlbumUpdateInput!): Album
  }
`;

export { albumsTypeDefs };
