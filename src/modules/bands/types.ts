import { Artist } from "../artists/types";

interface Member {
  artist: Artist;
  instrument: string;
  years: string;
}

interface Band {
  _id: string;
  name: string;
  origin: string;
  members: Member[];
  website: string;
  genresIds: string[];
}

interface BandOutput {
  id: string;
  name?: string;
  origin?: string;
  members?: Member[];
  website?: string;
  genresIds?: string[];
}

interface BandInput {
  name: string;
  origin?: string;
  membersId?: Member[];
  website?: string;
  genresIds?: string[];
}

interface BandUpdateInput {
  id?: string;
  name?: string;
  origin?: string;
  membersId?: Member[];
  website?: string;
  genresIds?: string[];
}

export { Member, Band, BandOutput, BandInput, BandUpdateInput };
