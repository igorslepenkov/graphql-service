import { Band, BandOutput } from "./types";

function bandsToOutput(bandObject: Band) {
  const { _id, name, origin, members, website, genresIds } = bandObject;

  const newObject: BandOutput = {
    id: _id,
  };

  name ? (newObject.name = name) : false;
  origin ? (newObject.origin = origin) : false;
  members ? (newObject.members = members) : false;
  website ? (newObject.website = website) : false;
  genresIds ? (newObject.genresIds = genresIds) : false;

  return newObject;
}

export { bandsToOutput };
