import { ArtistOutput } from "../artists/types";
import { BandOutput } from "../bands/types";
import { Genre, GenreOutput } from "../genres/types";
import { TrackAlbumOutput, TrackOutput } from "../tracks/types";

interface Album {
  _id: string;
  name: string;
  released: number;
  artistsIds: string[];
  bandsIds: string[];
  trackIds: string[];
  genresIds: string[];
  image: string;
}

interface AlbumOutput {
  id: string;
  name?: string;
  released?: number;
  artists?: ArtistOutput[];
  bands?: BandOutput[];
  tracks?: TrackAlbumOutput[];
  genres?: GenreOutput[];
  image?: string;
}

interface AlbumInput {
  name: string;
  released?: number;
  artistsIds?: string[];
  bandsIds?: string[];
  trackIds?: string[];
  genresIds?: string[];
  image?: string;
}

interface AlbumUpdateInput {
  name: string;
  released?: number;
  artistsIds?: string[];
  bandsIds?: string[];
  trackIds?: string[];
  genresIds?: string[];
  image?: string;
}

export { Album, AlbumInput, AlbumUpdateInput, AlbumOutput };
