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
import { Track } from "../tracks/types";
import { Album, AlbumOutput } from "./types";

async function albumToOutput(
  albumObject: Album,
  artistsAPI: ArtistsAPI,
  bandsAPI: BandsAPI,
  tracksAPI: TracksAPI,
  genresAPI: GenresAPI
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
        return await trackToOutput(track, artistsAPI, bandsAPI, genresAPI);
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
