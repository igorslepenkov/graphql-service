import { gql } from "apollo-server";

const bandsTypeDefs = gql`
  type Member {
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

  type Query {
    bands: [Band]
  }
`;

export { bandsTypeDefs };
