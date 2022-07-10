import { BandsAPI } from "./service";
import { GenresAPI } from "../genres/service";
import { ArtistsAPI } from "../artists/service";

import { ApolloErrorNotFound } from "../../utils/apolloErrorNoFound";
import { bandsToOutput } from "./bandsObjectMutation";
import { Band, BandInput, BandUpdateInput } from "./types";
import { Artist } from "../artists/types";

const bandsResolvers = {
  Query: {
    bands: async (
      _: undefined,
      { limit, offset }: { limit: number; offset: number },
      {
        dataSources: { bandsAPI, genresAPI, artistsAPI },
      }: {
        dataSources: {
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          artistsAPI: ArtistsAPI;
        };
      }
    ) => {
      const params = {
        limit,
        offset,
      };
      const response = await bandsAPI.getBands(params);
      const bandsArray = response.map(
        async (band: Band) =>
          await bandsToOutput(band, genresAPI, artistsAPI, bandsAPI)
      );
      return bandsArray;
    },

    band: async (
      _: undefined,
      { id }: { id: string },
      {
        dataSources: { bandsAPI, genresAPI, artistsAPI },
      }: {
        dataSources: {
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          artistsAPI: ArtistsAPI;
        };
      }
    ) => {
      const response = await bandsAPI.getBandById(id);
      if (!response) {
        throw new ApolloErrorNotFound("This band was not found");
      }
      const band = await bandsToOutput(
        response,
        genresAPI,
        artistsAPI,
        bandsAPI
      );
      return band;
    },
  },
  Mutation: {
    createBand: async (
      _: any,
      { input }: { input: BandInput },
      {
        dataSources: { bandsAPI, genresAPI, artistsAPI },
      }: {
        dataSources: {
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          artistsAPI: ArtistsAPI;
        };
      }
    ) => {
      const response: Band = await bandsAPI.createBand(input);
      const newObject = await bandsToOutput(
        response,
        genresAPI,
        artistsAPI,
        bandsAPI
      );
      newObject.members?.map(async (member) => {
        const artistId = member.artist.id;
        const artist: Artist = await artistsAPI.getArtistById(artistId);
        let bands = artist.bandsIds;
        if (!bands) {
          bands = [];
          bands.push(newObject.id);
        } else if (!bands.includes(artistId)) {
          bands.push(newObject.id);
        }
        await artistsAPI.updateAtrist(artistId, { bandsIds: bands });
      });
      return newObject;
    },
    deleteBand: async (
      _: any,
      { id }: { id: string },
      { dataSources: { bandsAPI } }: { dataSources: { bandsAPI: BandsAPI } }
    ) => {
      const response = await bandsAPI.deleteBand(id);
      return response.acknowledged;
    },
    updateBand: async (
      _: any,
      { id, body }: { id: string; body: BandUpdateInput },
      {
        dataSources: { bandsAPI, genresAPI, artistsAPI },
      }: {
        dataSources: {
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          artistsAPI: ArtistsAPI;
        };
      }
    ) => {
      const response = await bandsAPI.updateBand(id, body);
      return await bandsToOutput(response, genresAPI, artistsAPI, bandsAPI);
    },
  },
};

export { bandsResolvers };
