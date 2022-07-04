import { Artist, ArtistOutput } from "./types";

function artistToOutput(artistObject: Artist) {
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

  birthDate ? (newObject.birthDate = birthDate) : false;
  birthPlace ? (newObject.birthPlace = birthPlace) : false;
  bandsIds ? (newObject.bandsIds = bandsIds) : false;
  instruments ? (newObject.instruments = instruments) : false;

  return newObject;
}

export { artistToOutput };
