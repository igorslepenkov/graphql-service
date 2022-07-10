import { ArtistOutput } from "../artists/types";
import { BandOutput } from "../bands/types";
import { GenreOutput } from "../genres/types";
import { TrackOutput } from "../tracks/types";

interface Favourite {
  _id: string;
  userId: string;
  bandsIds: string[];
  genresIds: string[];
  artistsIds: string[];
  tracksIds: string[];
}

interface FavouriteOutput {
  id?: string;
  userId?: string;
  bands?: BandOutput[];
  genres?: GenreOutput[];
  artists?: ArtistOutput[];
  tracks?: TrackOutput[];
}

type FavoriteTypeInput = "artists" | "bands" | "genres" | "tracks";

interface AddFavouritsInput {
  type: FavoriteTypeInput;
  id: string;
}

export { Favourite, FavouriteOutput, FavoriteTypeInput, AddFavouritsInput };
