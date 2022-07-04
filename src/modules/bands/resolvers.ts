import { BandsAPI } from "./service";
import { ApolloErrorNotFound } from "../../utils/apolloErrorNoFound";
import { bandsToOutput } from "./bandsObjectMutation";
import { Band, BandInput, BandUpdateInput } from "./types";

const bandsResolvers = {
  Query: {
    bands: async (
      _: undefined,
      __: undefined,
      { dataSources: { bandsAPI } }: { dataSources: { bandsAPI: BandsAPI } }
    ) => {
      const response = await bandsAPI.getBands();
      const artistsArray = response.map(bandsToOutput);
      return artistsArray;
    },

    band: async (
      _: undefined,
      { id }: { id: string },
      { dataSources: { bandsAPI } }: { dataSources: { bandsAPI: BandsAPI } }
    ) => {
      const response = await bandsAPI.getBandById(id);
      if (!response) {
        throw new ApolloErrorNotFound("This band was not found");
      }
      const band = bandsToOutput(response);
      return band;
    },
  },
  Mutation: {
    createBand: async (
      _: any,
      { input }: { input: BandInput },
      { dataSources: { bandsAPI } }: { dataSources: { bandsAPI: BandsAPI } }
    ) => {
      const response: Band = await bandsAPI.createBand(input);
      const newObject = bandsToOutput(response);
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
      { dataSources: { bandsAPI } }: { dataSources: { bandsAPI: BandsAPI } }
    ) => {
      const response = await bandsAPI.updateBand(id, body);
      return bandsToOutput(response);
    },
  },
};

export { bandsResolvers };
