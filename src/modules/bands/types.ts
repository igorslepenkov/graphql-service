import { ArtistMembersOutput } from "../artists/types";
import { GenreOutput } from "../genres/types";

interface Member {
  artist: string;
  instrument: string;
  years: string;
}

interface MemberOutput {
  artist: ArtistMembersOutput;
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
  members?: MemberOutput[];
  website?: string;
  genres?: GenreOutput[];
}

interface BandInput {
  name: string;
  origin?: string;
  membersId?: string[];
  website?: string;
  genresIds?: string[];
}

interface BandUpdateInput {
  id?: string;
  name?: string;
  origin?: string;
  membersId?: string[];
  website?: string;
  genresIds?: string[];
}

export { Member, MemberOutput, Band, BandOutput, BandInput, BandUpdateInput };
