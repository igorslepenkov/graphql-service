import { artistToOutput } from "../artists/artistsObjectMutation";
import { ArtistsAPI } from "../artists/service";
import { GenresAPI } from "../genres/service";
import { BandsAPI } from "./service";
import { genresToOutput } from "../genres/genresObjectMutation";
import { Band, BandOutput, MemberOutput } from "./types";
import { Artist, ArtistMembersOutput } from "../artists/types";

function artistToMemberOutput(artistObject: Artist) {
  const {
    _id,
    firstName,
    secondName,
    country,
    middleName,
    birthDate,
    birthPlace,
    instruments,
  } = artistObject;

  const newObject: ArtistMembersOutput = {
    id: _id,
    firstName,
    secondName,
    country,
  };

  middleName ? (newObject.middleName = middleName) : false;
  birthDate ? (newObject.birthDate = birthDate) : false;
  birthPlace ? (newObject.birthPlace = birthPlace) : false;
  instruments ? (newObject.instruments = instruments) : false;

  return newObject;
}

async function bandsToOutput(
  bandObject: Band,
  genresAPI: GenresAPI,
  artistsAPI: ArtistsAPI,
  bandsAPI: BandsAPI
) {
  const { _id, name, origin, members, website, genresIds } = bandObject;

  const newObject: BandOutput = {
    id: _id,
  };

  name ? (newObject.name = name) : false;
  origin ? (newObject.origin = origin) : false;
  website ? (newObject.website = website) : false;

  if (members) {
    const artists = await Promise.all(
      members.map(async (member) => {
        const { artist: artistId } = member;
        return artistsAPI.getArtistById(artistId);
      })
    );
    newObject.members = artists.map((artist, idx) => {
      const memberOutput: MemberOutput = {
        artist: artistToMemberOutput(artist),
        instrument: members[idx].instrument,
        years: members[idx].years,
      };
      return memberOutput;
    });
  }

  if (genresIds) {
    const genres = Promise.all(
      genresIds.map(async (genreId) => {
        const genreObj = await genresAPI.getGenreById(genreId);
        return genresToOutput(genreObj);
      })
    );
    newObject.genres = await genres;
  }
  return newObject;
}

export { bandsToOutput };
