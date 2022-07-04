interface Artist {
  _id: string;
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bandsIds?: string[];
  instruments?: string[];
}

interface ArtistOutput {
  id: string;
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bandsIds?: string[];
  instruments?: string[];
}

interface ArtistInput {
  firstName: string;
  secondName: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country: string;
  bandsIds?: string[];
  instruments?: string[];
}

interface ArtistUpdateInput {
  firstName?: string;
  secondName?: string;
  middleName?: string;
  birthDate?: string;
  birthPlace?: string;
  country?: string;
  bandsIds?: string[];
  instruments?: string[];
}

export { Artist, ArtistInput, ArtistOutput, ArtistUpdateInput };
