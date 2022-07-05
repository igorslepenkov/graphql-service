import fs from "fs";
import path from "path";

import { ApolloServer, gql } from "apollo-server";
import { mergeTypeDefs, mergeResolvers } from "@graphql-tools/merge";
import "dotenv/config";

import { artistsTypeDefs } from "./modules/artists/typeDefs";
import { genresTypeDefs } from "./modules/genres/typeDefs";
import { bandsTypeDefs } from "./modules/bands/typeDefs";
import { usersTypeDefs } from "./modules/users/typeDefs";
import { jwtTypeDefs } from "./modules/jwt/typeDefs";

import { artistsResolvers } from "./modules/artists/resolvers";
import { usersResolvers } from "./modules/users/resolvers";
import { jwtResolvers } from "./modules/jwt/resolvers";
import { bandsResolvers } from "./modules/bands/resolvers";
import { genresResolvers } from "./modules/genres/resolvers";

import { ArtistsAPI } from "./modules/artists/service";
import { UsersAPI } from "./modules/users/service";
import { BandsAPI } from "./modules/bands/service";
import { GenresAPI } from "./modules/genres/service";

const types = [
  artistsTypeDefs,
  genresTypeDefs,
  bandsTypeDefs,
  usersTypeDefs,
  jwtTypeDefs,
];
const typeDefs = mergeTypeDefs(types);
const rawResolvers = [
  artistsResolvers,
  usersResolvers,
  jwtResolvers,
  bandsResolvers,
  genresResolvers,
];
const resolvers = mergeResolvers(rawResolvers);

const server = new ApolloServer({
  typeDefs,
  resolvers,
  csrfPrevention: true,
  cache: "bounded",
  dataSources: () => {
    return {
      artistsAPI: new ArtistsAPI(),
      usersAPI: new UsersAPI(),
      bandsAPI: new BandsAPI(),
      genresAPI: new GenresAPI(),
    };
  },
  context: ({ req }) => {
    const jwt = fs.readFileSync(
      path.join(__dirname, "./modules/jwt/token.json")
    );
    const token = JSON.parse(jwt.toString()).jwt;
    const authToken = req.headers.authorization || token || "";
    return { authToken };
  },
});

server.listen(process.env.APOLLO_PORT).then(({ url }) => {
  console.log(`🚀  Server ready at ${url}`);
});
