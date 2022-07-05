import { Genre, GenreOutput } from "./types";

function genresToOutput(genreObject: Genre) {
  const { _id, name, description, country, year } = genreObject;

  const newObject: GenreOutput = {
    id: _id,
  };

  name ? (newObject.name = name) : false;
  description ? (newObject.description = description) : false;
  country ? (newObject.country = country) : false;
  year ? (newObject.year = Number(year)) : false;

  return newObject;
}

export { genresToOutput };
