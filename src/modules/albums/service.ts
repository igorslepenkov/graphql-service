import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { AlbumInput, AlbumUpdateInput } from "./types";

class AlbumsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.ALBUMS_PORT}`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.authToken}`);
  }

  async getAlbums(params: { limit: number; offset: number }) {
    const albums = await this.get(`/v1/albums`, params);
    return albums.items;
  }

  async getAlbumById(id: string) {
    const album = await this.get(`/v1/albums/${id}`);
    return album;
  }

  async createAlbum(data: AlbumInput) {
    const response = await this.post(`/v1/albums`, data);
    return response;
  }

  async deleteAlbum(id: string) {
    const response = await this.delete(`/v1/albums/${id}`);
    return response;
  }

  async updateAlbum(id: string, body: AlbumUpdateInput) {
    const response = await this.put(`/v1/albums/${id}`, body);
    return response;
  }
}

export { AlbumsAPI };
