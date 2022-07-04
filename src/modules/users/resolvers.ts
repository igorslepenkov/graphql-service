import { UsersAPI } from "./service";
import { UserOutput, UserInput } from "./types";

const usersResolvers = {
  Query: {
    user: async (
      _: any,
      { id }: { id: string },
      { dataSources: { usersAPI } }: { dataSources: { usersAPI: UsersAPI } }
    ): Promise<UserOutput> => {
      const response = await usersAPI.getUserById(id);
      const {
        _id,
        firstName,
        lastName,
        password,
        email,
      }: {
        _id: string;
        firstName: string;
        lastName: string;
        password: string;
        email: string;
      } = response;
      const userOutput: UserOutput = {
        id: _id,
        firstName,
        secondName: lastName,
        password,
        email,
      };
      return userOutput;
    },
  },
  Mutation: {
    createUser: async (
      _: any,
      { data }: { data: UserInput },
      { dataSources: { usersAPI } }: { dataSources: { usersAPI: UsersAPI } }
    ) => {
      const response = await usersAPI.createNewUser(data);
      return response;
    },
  },
};

export { usersResolvers };
