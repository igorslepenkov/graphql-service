import { AlbumOutput } from "../albums/types";
import { ArtistOutput } from "../artists/types";
import { BandOutput } from "../bands/types";
import { GenreOutput } from "../genres/types";

interface Track {
  _id: string;
  title: string;
  albumId?: string;
  artistsIds?: string[];
  bandsIds?: string[];
  duration?: number;
  released?: number;
  genresIds?: string[];
}

interface TrackOutput {
  id: string;
  title: string;
  album?: AlbumOutput;
  artists?: ArtistOutput[];
  bands?: BandOutput[];
  duration?: number;
  released?: number;
  genres?: GenreOutput[];
}

interface TrackAlbumOutput {
  id: string;
  title: string;
  album?: string;
  artists?: ArtistOutput[];
  bands?: BandOutput[];
  duration?: number;
  released?: number;
  genres?: GenreOutput[];
}

interface TrackInput {
  title: string;
  albumId?: string;
  artistsIds?: string[];
  bandsIds?: string[];
  duration?: number;
  released?: number;
  genresIds?: string[];
}

interface TrackUpdateInput {
  title?: string;
  albumId?: string;
  artistsIds?: string[];
  bandsIds?: string[];
  duration?: number;
  released?: number;
  genresIds?: string[];
}

export { Track, TrackInput, TrackUpdateInput, TrackOutput, TrackAlbumOutput };
