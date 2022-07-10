import { ApolloErrorNotFound } from "../../utils/apolloErrorNoFound";
import { ArtistsAPI } from "../artists/service";
import { BandsAPI } from "../bands/service";
import { GenresAPI } from "../genres/service";
import { TracksAPI } from "../tracks/service";
import { Album, AlbumInput, AlbumOutput, AlbumUpdateInput } from "./types";
import { albumToOutput } from "./albumObjectMutation";
import { AlbumsAPI } from "./service";
import { Track } from "../tracks/types";

const albumsResolvers = {
  Query: {
    albums: async (
      _: undefined,
      { limit, offset }: { limit: number; offset: number },
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
      const params = {
        limit,
        offset,
      };
      const response = await albumsAPI.getAlbums(params);
      const albumsArray = await Promise.all(
        response.map(async (album: Album) => {
          return await albumToOutput(
            album,
            artistsAPI,
            bandsAPI,
            tracksAPI,
            genresAPI,
            albumsAPI
          );
        })
      );
      return albumsArray;
    },

    album: async (
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
      const response = await albumsAPI.getAlbumById(id);
      if (!response) {
        throw new ApolloErrorNotFound("This album was not found");
      }
      return await albumToOutput(
        response,
        artistsAPI,
        bandsAPI,
        tracksAPI,
        genresAPI,
        albumsAPI
      );
    },
  },
  Mutation: {
    createAlbum: async (
      _: any,
      { input }: { input: AlbumInput },
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
      const response: Album = await albumsAPI.createAlbum(input);

      if (response.trackIds) {
        const tracks = await Promise.all(
          response.trackIds.map(async (trackId) => {
            return await tracksAPI.getTrackById(trackId);
          })
        );

        tracks.forEach(async (track: Track) => {
          if (!track.albumId) {
            await tracksAPI.updateTrack(track._id, { albumId: response._id });
          }
        });
      }

      return await albumToOutput(
        response,
        artistsAPI,
        bandsAPI,
        tracksAPI,
        genresAPI,
        albumsAPI
      );
    },
    deleteAlbum: async (
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
      const response = await albumsAPI.deleteAlbum(id);
      return response.acknowledged;
    },
    updateAlbum: async (
      _: any,
      { id, body }: { id: string; body: AlbumUpdateInput },
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
      const response = await albumsAPI.updateAlbum(id, body);
      return await albumToOutput(
        response,
        artistsAPI,
        bandsAPI,
        tracksAPI,
        genresAPI,
        albumsAPI
      );
    },
  },
};

export { albumsResolvers };
