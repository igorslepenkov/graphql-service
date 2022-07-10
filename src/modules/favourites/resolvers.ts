import { ApolloErrorNotFound } from "../../utils/apolloErrorNoFound";
import { ArtistsAPI } from "../artists/service";
import { BandsAPI } from "../bands/service";
import { GenresAPI } from "../genres/service";
import { TracksAPI } from "../tracks/service";
import { AlbumsAPI } from "../albums/service";
import { FavouritesAPI } from "./service";

import { favouritesToOutput } from "./favouritesObjectMutation";
import { AddFavouritsInput, Favourite, FavoriteTypeInput } from "./types";

const favouritesResolvers = {
  Query: {
    favourites: async (
      _: undefined,
      __: undefined,
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const response = await favouritesAPI.getFavourits();
      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },
  },

  Mutation: {
    addTrackToFavourites: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const favouritsTrackInput: AddFavouritsInput = {
        type: "tracks",
        id,
      };

      const response: Favourite = await favouritesAPI.addToFavourits(
        favouritsTrackInput
      );

      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },
    addBandToFavourites: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const favouritsBandInput: AddFavouritsInput = {
        type: "bands",
        id,
      };

      const response: Favourite = await favouritesAPI.addToFavourits(
        favouritsBandInput
      );

      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },
    addArtistToFavourites: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const favouritsArtistsInput: AddFavouritsInput = {
        type: "artists",
        id,
      };

      const response: Favourite = await favouritesAPI.addToFavourits(
        favouritsArtistsInput
      );

      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },
    addGenreToFavourites: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const favouritsGenreInput: AddFavouritsInput = {
        type: "genres",
        id,
      };

      const response: Favourite = await favouritesAPI.addToFavourits(
        favouritsGenreInput
      );

      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },
    removeTrackFromFavourites: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const removeTrackFavouritesInput: AddFavouritsInput = {
        type: "tracks",
        id,
      };
      const response = await favouritesAPI.removeFromFavourites(
        removeTrackFavouritesInput
      );
      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },

    removeBandFromFavourites: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const removeBandFavouritesInput: AddFavouritsInput = {
        type: "bands",
        id,
      };
      const response = await favouritesAPI.removeFromFavourites(
        removeBandFavouritesInput
      );
      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },

    removeArtistFromFavourites: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const removeArtistFavouritesInput: AddFavouritsInput = {
        type: "artists",
        id,
      };
      const response = await favouritesAPI.removeFromFavourites(
        removeArtistFavouritesInput
      );
      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },

    removeGenreFromFavourites: async (
      _: any,
      { id }: { id: string },
      {
        dataSources: {
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI,
          favouritesAPI,
        },
      }: {
        dataSources: {
          artistsAPI: ArtistsAPI;
          bandsAPI: BandsAPI;
          genresAPI: GenresAPI;
          tracksAPI: TracksAPI;
          albumsAPI: AlbumsAPI;
          favouritesAPI: FavouritesAPI;
        };
      }
    ) => {
      const removeGenreFavouritesInput: AddFavouritsInput = {
        type: "genres",
        id,
      };
      const response = await favouritesAPI.removeFromFavourites(
        removeGenreFavouritesInput
      );
      return await favouritesToOutput(
        response,
        artistsAPI,
        bandsAPI,
        genresAPI,
        tracksAPI,
        albumsAPI
      );
    },
  },
};

export { favouritesResolvers };
