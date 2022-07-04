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
  membersId: Member[];
  website: string;
  genresIds: string[];
}

export { Band };
