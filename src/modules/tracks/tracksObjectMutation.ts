import { albumToOutput } from "../albums/albumObjectMutation";
import { AlbumsAPI } from "../albums/service";
import { artistToOutput } from "../artists/artistsObjectMutation";
import { ArtistsAPI } from "../artists/service";
import { bandsToOutput } from "../bands/bandsObjectMutation";
import { BandsAPI } from "../bands/service";
import { genresToOutput } from "../genres/genresObjectMutation";
import { GenresAPI } from "../genres/service";
import { TracksAPI } from "./service";
import { Track, TrackOutput } from "./types";

async function trackToOutput(
  trackObject: Track,
  artistAPI: ArtistsAPI,
  bandsAPI: BandsAPI,
  genresAPI: GenresAPI,
  albumsAPI: AlbumsAPI,
  tracksAPI: TracksAPI
): Promise<TrackOutput> {
  const {
    _id,
    title,
    albumId,
    artistsIds,
    bandsIds,
    duration,
    released,
    genresIds,
  } = trackObject;

  const newObject: TrackOutput = {
    id: _id,
    title,
  };

  if (albumId) {
    const album = await albumsAPI.getAlbumById(albumId);
    newObject.album = await albumToOutput(
      album,
      artistAPI,
      bandsAPI,
      tracksAPI,
      genresAPI,
      albumsAPI
    );
  }

  if (artistsIds) {
    const artists = Promise.all(
      artistsIds.map(async (artistId) => {
        const artist = await artistAPI.getArtistById(artistId);
        return await artistToOutput(artist, bandsAPI, genresAPI, artistAPI);
      })
    );
    newObject.artists = await artists;
  }

  if (bandsIds) {
    const bands = Promise.all(
      bandsIds.map(async (bandId) => {
        const band = await bandsAPI.getBandById(bandId);
        return await bandsToOutput(band, genresAPI, artistAPI, bandsAPI);
      })
    );
    newObject.bands = await bands;
  }

  duration ? (newObject.duration = duration) : false;
  released ? (newObject.released = released) : false;

  if (genresIds) {
    const genres = Promise.all(
      genresIds.map(async (genreId) => {
        const genre = await genresAPI.getGenreById(genreId);
        return genresToOutput(genre);
      })
    );
    newObject.genres = await genres;
  }
  return newObject;
}

export { trackToOutput };
