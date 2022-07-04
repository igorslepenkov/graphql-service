import { gql } from "apollo-server";

const jwtTypeDefs = gql`
  type JWT {
    jwt: String!
  }

  input loginInput {
    password: String!
    email: String!
  }

  type Mutation {
    loginUser(data: loginInput!): JWT
  }
`;

export { jwtTypeDefs };
