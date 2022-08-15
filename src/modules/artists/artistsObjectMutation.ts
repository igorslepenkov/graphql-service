import { bandsToOutput } from "../bands/bandsObjectMutation";
import { BandsAPI } from "../bands/service";
import { Band } from "../bands/types";
import { GenresAPI } from "../genres/service";
import { ArtistsAPI } from "./service";
import { Artist, ArtistOutput } from "./types";

async function artistToOutput(
  artistObject: Artist,
  bandsAPI: BandsAPI,
  genresAPI: GenresAPI,
  artistsAPI: ArtistsAPI
) {
  const {
    _id,
    firstName,
    secondName,
    country,
    middleName,
    birthDate,
    birthPlace,
    bandsIds,
    instruments,
  } = artistObject;

  const newObject: ArtistOutput = {
    id: _id,
    firstName,
    secondName,
    country,
  };

  middleName ? (newObject.middleName = middleName) : false;
  birthDate ? (newObject.birthDate = birthDate) : false;
  birthPlace ? (newObject.birthPlace = birthPlace) : false;
  instruments ? (newObject.instruments = instruments) : false;

  if (bandsIds) {
    const bandsPromise = Promise.all(
      bandsIds.map(async (bandId) => {
        return await bandsAPI.getBandById(bandId);
      })
    );
    const bands: Band[] = await bandsPromise;

    const bandsOutput = Promise.all(
      bands.map(async (band) => {
        return await bandsToOutput(band, genresAPI, artistsAPI, bandsAPI);
      })
    );

    newObject.bands = await bandsOutput;
  }
  return newObject;
}

export { artistToOutput };
