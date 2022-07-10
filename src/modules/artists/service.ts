import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { ArtistInput, ArtistUpdateInput } from "./types";

class ArtistsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.ARTISTS_PORT}`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.authToken}`);
  }

  async getArtists(params: { limit: number; offset: number }) {
    const artists = await this.get(`/v1/artists`, params);
    return artists.items;
  }

  async getArtistById(id: string) {
    const artist = await this.get(`/v1/artists/${id}`);
    return artist;
  }

  async createArtist(data: ArtistInput) {
    const response = await this.post(`/v1/artists`, data);
    return response;
  }

  async deleteArtist(id: string) {
    const response = await this.delete(`/v1/artists/${id}`);
    return response;
  }

  async updateAtrist(id: string, body: ArtistUpdateInput) {
    const response = await this.put(`/v1/artists/${id}`, body);
    return response;
  }
}

export { ArtistsAPI };
