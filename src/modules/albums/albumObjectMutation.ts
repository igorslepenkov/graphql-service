import { artistToOutput } from "../artists/artistsObjectMutation";
import { ArtistsAPI } from "../artists/service";
import { Artist } from "../artists/types";
import { bandsToOutput } from "../bands/bandsObjectMutation";
import { BandsAPI } from "../bands/service";
import { Band } from "../bands/types";
import { genresToOutput } from "../genres/genresObjectMutation";
import { GenresAPI } from "../genres/service";
import { Genre } from "../genres/types";
import { TracksAPI } from "../tracks/service";
import { trackToOutput } from "../tracks/tracksObjectMutation";
import { Track, TrackAlbumOutput } from "../tracks/types";
import { AlbumsAPI } from "./service";
import { Album, AlbumOutput } from "./types";

async function trackToAlbumOutput(
  trackObject: Track,
  artistAPI: ArtistsAPI,
  bandsAPI: BandsAPI,
  genresAPI: GenresAPI,
  tracksAPI: TracksAPI,
  albumsAPI: AlbumsAPI
) {
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

  const newObject: TrackAlbumOutput = {
    id: _id,
    title,
  };

  if (albumId) {
    const album = await albumsAPI.getAlbumById(albumId);
    newObject.album = album.name;
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

async function albumToOutput(
  albumObject: Album,
  artistsAPI: ArtistsAPI,
  bandsAPI: BandsAPI,
  tracksAPI: TracksAPI,
  genresAPI: GenresAPI,
  albumsAPI: AlbumsAPI
) {
  const {
    _id,
    name,
    released,
    artistsIds,
    bandsIds,
    trackIds,
    genresIds,
    image,
  } = albumObject;

  const newObject: AlbumOutput = {
    id: _id,
    name,
  };

  released ? (newObject.released = released) : false;

  if (artistsIds) {
    const artists = Promise.all(
      artistsIds.map(async (artistId) => {
        const artist: Artist = await artistsAPI.getArtistById(artistId);
        return await artistToOutput(artist, bandsAPI, genresAPI, artistsAPI);
      })
    );
    newObject.artists = await artists;
  }

  if (bandsIds) {
    const bands = Promise.all(
      bandsIds.map(async (bandId) => {
        const band: Band = await bandsAPI.getBandById(bandId);
        return await bandsToOutput(band, genresAPI, artistsAPI, bandsAPI);
      })
    );
    newObject.bands = await bands;
  }

  if (trackIds) {
    const tracks = Promise.all(
      trackIds.map(async (trackId) => {
        const track: Track = await tracksAPI.getTrackById(trackId);
        return await trackToAlbumOutput(
          track,
          artistsAPI,
          bandsAPI,
          genresAPI,
          tracksAPI,
          albumsAPI
        );
      })
    );
    newObject.tracks = await tracks;
  }

  if (genresIds) {
    const genres = Promise.all(
      genresIds.map(async (genreid) => {
        const genre: Genre = await genresAPI.getGenreById(genreid);
        return genresToOutput(genre);
      })
    );
    newObject.genres = await genres;
  }

  image ? (newObject.image = image) : false;

  return newObject;
}

export { albumToOutput };
