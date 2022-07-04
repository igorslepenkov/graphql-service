import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { ArtistInput } from "./types";

class ArtistsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.ARTISTS_PORT}`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.authToken}`);
  }

  async getArtists() {
    const artists = await this.get(`/v1/artists`);
    return artists;
  }

  async createArtist(data: ArtistInput) {
    const response = await this.post(`/v1/artists`, data);
    return response;
  }
}

export { ArtistsAPI };
