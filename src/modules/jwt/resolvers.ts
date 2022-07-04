import fs from "fs/promises";
import path from "path";

import { UsersAPI } from "../users/service";
import { LoginInput } from "./types";

const jwtResolvers = {
  Mutation: {
    loginUser: async (
      _: any,
      { data }: { data: LoginInput },
      { dataSources: { usersAPI } }: { dataSources: { usersAPI: UsersAPI } }
    ) => {
      const response = await usersAPI.logInUser(data);
      console.log(response);
      await fs.writeFile(
        path.join(__dirname, "token.json"),
        JSON.stringify(response)
      );

      return response;
    },
  },
};

export { jwtResolvers };
