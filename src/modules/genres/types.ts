interface Genre {
  _id: string;
  name: string;
  description: string;
  country: string;
  year: string;
}

interface GenreOutput {
  id: string;
  name?: string;
  description?: string;
  country?: string;
  year?: number;
}

interface GenreInput {
  name: string;
  description?: string;
  country?: string;
  year?: number;
}

interface GenreUpdateInput {
  name?: string;
  description?: string;
  country?: string;
  year?: number;
}

export { Genre, GenreOutput, GenreInput, GenreUpdateInput };
