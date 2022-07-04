interface UserOutput {
  id?: string;
  firstName?: string;
  secondName?: string;
  password?: string;
  email?: string;
  favouriteArtistIds?: string[];
  favouriteSongsIds?: string[];
  favouriteBandsIds?: string[];
  favouriteGenresIds?: string[];
}

interface UserInput {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
}

export { UserOutput, UserInput };
