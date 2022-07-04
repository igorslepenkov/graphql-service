import { ArtistsAPI } from "./service";
import { Artist, ArtistInput, ArtistUpdateInput } from "./types";
import { artistToOutput } from "./artistsObjectMutation";
import { ApolloErrorNotFound } from "../../utils/apolloErrorNoFound";

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
      const artistsArray = response.map(artistToOutput);
      return artistsArray;
    },

    artist: async (
      _: undefined,
      { id }: { id: string },
      {
        dataSources: { artistsAPI },
      }: { dataSources: { artistsAPI: ArtistsAPI } }
    ) => {
      const response = await artistsAPI.getArtistById(id);
      if (!response) {
        throw new ApolloErrorNotFound("This artist was not found");
      }
      const artist = artistToOutput(response);
      return artist;
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
      const response: Artist = await artistsAPI.createArtist(input);
      const newObject = artistToOutput(response);
      return newObject;
    },
    deleteArtist: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: { artistsAPI },
      }: { dataSources: { artistsAPI: ArtistsAPI } }
    ) => {
      const response = await artistsAPI.deleteArtist(id);
      return response.acknowledged;
    },
    updateArtist: async (
      _: any,
      { id, body }: { id: string; body: ArtistUpdateInput },
      {
        dataSources: { artistsAPI },
      }: { dataSources: { artistsAPI: ArtistsAPI } }
    ) => {
      const response = await artistsAPI.updateAtrist(id, body);
      return artistToOutput(response);
    },
  },
};

export { artistsResolvers };
