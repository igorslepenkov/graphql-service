import { ArtistsAPI } from "./service";
import { ArtistInput } from "./types";

const artistsResolvers = {
  Query: {
    artists: async (
      _: undefined,
      __: undefined,
      {
        dataSources: { artistsAPI },
      }: { dataSources: { artistsAPI: ArtistsAPI } }
    ) => {
      const response = await artistsAPI.getArtists();
      return response.items;
    },
  },
  Mutation: {
    createArtist: async (
      _: any,
      { input }: { input: ArtistInput },
      {
        dataSources: { artistsAPI },
      }: { dataSources: { artistsAPI: ArtistsAPI } }
    ) => {
      const response = await artistsAPI.createArtist(input);
      console.log(response);
      return response;
    },
  },
};

export { artistsResolvers };
