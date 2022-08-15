import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { Genre, GenreInput, GenreUpdateInput } from "./types";

class GenresAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.GENRES_PORT}`;
  }

  willSendRequest(request: RequestOptions) {
    if (this.context) {
      request.headers.set("Authorization", `Bearer ${this.context.authToken}`);
    }
  }

  async getGenres(params: { limit: number; offset: number }) {
    const genres = await this.get("/v1/genres", params);
    return genres.items;
  }

  async getGenreById(id: string) {
    const genre = await this.get(`/v1/genres/${id}`);
    return genre;
  }

  async createGenre(data: GenreInput) {
    const response = await this.post(`/v1/genres`, data);
    return response;
  }

  async deleteGenre(id: string) {
    const response = await this.delete(`/v1/genres/${id}`);
    return response;
  }

  async updateGenre(id: string, body: GenreUpdateInput) {
    const response = await this.put(`/v1/genres/${id}`, body);
    return response;
  }
}

export { GenresAPI };
