import { ArtistsAPI } from "./service";
import { Artist, ArtistInput, ArtistUpdateInput } from "./types";
import { artistToOutput } from "./artistsObjectMutation";
import { ApolloErrorNotFound } from "../../utils/apolloErrorNoFound";
import { BandsAPI } from "../bands/service";
import { GenresAPI } from "../genres/service";

const artistsResolvers = {
  Query: {
    artists: async (
      _: undefined,
      __: undefined,
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
        };
      }
    ) => {
      const response = await artistsAPI.getArtists();
      const artistsArray = response.map(async (artist: Artist) => {
        return await artistToOutput(artist, bandsAPI, genresAPI, artistsAPI);
      });
      return artistsArray;
    },

    artist: async (
      _: undefined,
      { id }: { id: string },
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
        };
      }
    ) => {
      const response = await artistsAPI.getArtistById(id);
      if (!response) {
        throw new ApolloErrorNotFound("This artist was not found");
      }
      const artist = artistToOutput(response, bandsAPI, genresAPI, artistsAPI);
      return artist;
    },
  },
  Mutation: {
    createArtist: async (
      _: any,
      { input }: { input: ArtistInput },
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
        };
      }
    ) => {
      const response: Artist = await artistsAPI.createArtist(input);
      const newObject = artistToOutput(
        response,
        bandsAPI,
        genresAPI,
        artistsAPI
      );
      return newObject;
    },
    deleteArtist: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
        };
      }
    ) => {
      const response = await artistsAPI.deleteArtist(id);
      return response.acknowledged;
    },
    updateArtist: async (
      _: any,
      { id, body }: { id: string; body: ArtistUpdateInput },
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
        };
      }
    ) => {
      const response = await artistsAPI.updateAtrist(id, body);
      return artistToOutput(response, bandsAPI, genresAPI, artistsAPI);
    },
  },
};

export { artistsResolvers };
