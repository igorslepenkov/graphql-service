import { ApolloErrorNotFound } from "../../utils/apolloErrorNoFound";
import { ArtistsAPI } from "../artists/service";
import { BandsAPI } from "../bands/service";
import { GenresAPI } from "../genres/service";
import { TracksAPI } from "./service";
import { Track, TrackInput, TrackOutput, TrackUpdateInput } from "./types";
import { trackToOutput } from "./tracksObjectMutation";
import { AlbumsAPI } from "../albums/service";

const tracksResolvers = {
  Query: {
    tracks: async (
      _: undefined,
      __: undefined,
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI, tracksAPI, albumsAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
        };
      }
    ) => {
      const response = await tracksAPI.getTracks();
      const tracksArray = await Promise.all(
        response.map(async (track: Track) => {
          return await trackToOutput(
            track,
            artistsAPI,
            bandsAPI,
            genresAPI,
            albumsAPI,
            tracksAPI
          );
        })
      );
      return tracksArray;
    },

    track: async (
      _: undefined,
      { id }: { id: string },
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI, tracksAPI, albumsAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
        };
      }
    ) => {
      const response = await tracksAPI.getTrackById(id);
      if (!response) {
        throw new ApolloErrorNotFound("This track was not found");
      }
      return await trackToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        albumsAPI,
        tracksAPI
      );
    },
  },
  Mutation: {
    createTrack: async (
      _: any,
      { input }: { input: TrackInput },
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI, tracksAPI, albumsAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
        };
      }
    ) => {
      const response: Track = await tracksAPI.createTrack(input);
      return await trackToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        albumsAPI,
        tracksAPI
      );
    },
    deleteTrack: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI, tracksAPI, albumsAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
        };
      }
    ) => {
      const response = await tracksAPI.deleteTrack(id);
      return response.acknowledged;
    },
    updateTrack: async (
      _: any,
      { id, body }: { id: string; body: TrackUpdateInput },
      {
        dataSources: { artistsAPI, bandsAPI, genresAPI, tracksAPI, albumsAPI },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
        };
      }
    ) => {
      const response = await tracksAPI.updateTrack(id, body);
      return await trackToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        albumsAPI,
        tracksAPI
      );
    },
  },
};

export { tracksResolvers };
