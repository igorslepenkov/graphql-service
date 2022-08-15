import { AlbumsAPI } from "../albums/service";
import { artistToOutput } from "../artists/artistsObjectMutation";
import { ArtistsAPI } from "../artists/service";
import { bandsToOutput } from "../bands/bandsObjectMutation";
import { BandsAPI } from "../bands/service";
import { genresToOutput } from "../genres/genresObjectMutation";
import { GenresAPI } from "../genres/service";
import { TracksAPI } from "../tracks/service";
import { trackToOutput } from "../tracks/tracksObjectMutation";
import { Favourite, FavouriteOutput } from "./types";

async function favouritesToOutput(
  favouritesObject: Favourite,
  artistsAPI: ArtistsAPI,
  bandsAPI: BandsAPI,
  genresAPI: GenresAPI,
  tracksAPI: TracksAPI,
  albumsAPI: AlbumsAPI
): Promise<FavouriteOutput> {
  const { _id, userId, bandsIds, genresIds, artistsIds, tracksIds } =
    favouritesObject;

  const newObject: FavouriteOutput = {
    id: _id,
    userId,
  };

  if (bandsIds) {
    const bands = await Promise.all(
      bandsIds.map(async (bandId) => {
        const band = await bandsAPI.getBandById(bandId);
        return await bandsToOutput(band, genresAPI, artistsAPI, bandsAPI);
      })
    );
    newObject.bands = bands;
  }

  if (genresIds) {
    const genres = await Promise.all(
      genresIds.map(async (genreId) => {
        const genre = await genresAPI.getGenreById(genreId);
        return genresToOutput(genre);
      })
    );
    newObject.genres = genres;
  }

  if (artistsIds) {
    const artists = await Promise.all(
      artistsIds.map(async (artistId) => {
        const artist = await artistsAPI.getArtistById(artistId);
        return await artistToOutput(artist, bandsAPI, genresAPI, artistsAPI);
      })
    );
    newObject.artists = artists;
  }

  if (tracksIds) {
    const tracks = await Promise.all(
      tracksIds.map(async (trackId) => {
        const track = await tracksAPI.getTrackById(trackId);
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
    newObject.tracks = tracks;
  }

  return newObject;
}

export { favouritesToOutput };
