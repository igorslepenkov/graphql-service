import { gql } from "apollo-server";

const usersTypeDefs = gql`
  type User {
    id: ID!
    firstName: String
    lastName: String
    password: String
    email: String
  }

  input UserInput {
    firstName: String!
    lastName: String!
    password: String!
    email: String!
  }

  type Query {
    user(id: String): User
  }

  type Mutation {
    register(data: UserInput!): User
  }
`;

export { usersTypeDefs };
