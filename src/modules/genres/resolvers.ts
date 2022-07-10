import { GenresAPI } from "./service";
import { ApolloErrorNotFound } from "../../utils/apolloErrorNoFound";
import { genresToOutput } from "./genresObjectMutation";
import { Genre, GenreInput, GenreUpdateInput } from "./types";

const genresResolvers = {
  Query: {
    genres: async (
      _: undefined,
      { limit, offset }: { limit: number; offset: number },
      { dataSources: { genresAPI } }: { dataSources: { genresAPI: GenresAPI } }
    ) => {
      const params = {
        limit,
        offset,
      };
      const response = await genresAPI.getGenres(params);
      const genresArray = response.map(genresToOutput);
      return genresArray;
    },

    genre: async (
      _: undefined,
      { id }: { id: string },
      { dataSources: { genresAPI } }: { dataSources: { genresAPI: GenresAPI } }
    ) => {
      const response = await genresAPI.getGenreById(id);
      if (!response) {
        throw new ApolloErrorNotFound("This band was not found");
      }
      const band = genresToOutput(response);
      return band;
    },
  },
  Mutation: {
    createGenre: async (
      _: any,
      { input }: { input: GenreInput },
      { dataSources: { genresAPI } }: { dataSources: { genresAPI: GenresAPI } }
    ) => {
      const response: Genre = await genresAPI.createGenre(input);
      const newObject = genresToOutput(response);
      return newObject;
    },
    deleteGenre: async (
      _: any,
      { id }: { id: string },
      { dataSources: { genresAPI } }: { dataSources: { genresAPI: GenresAPI } }
    ) => {
      const response = await genresAPI.deleteGenre(id);
      return response.acknowledged;
    },
    updateGenre: async (
      _: any,
      { id, body }: { id: string; body: GenreUpdateInput },
      { dataSources: { genresAPI } }: { dataSources: { genresAPI: GenresAPI } }
    ) => {
      const response = await genresAPI.updateGenre(id, body);
      return genresToOutput(response);
    },
  },
};

export { genresResolvers };
