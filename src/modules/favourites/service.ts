import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { Favourite, AddFavouritsInput } from "./types";

class FavouritesAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.FAVOURITS_PORT}`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.authToken}`);
  }

  async getFavourits() {
    const favourits: Favourite = await this.get(`/v1/favourites`);
    return favourits;
  }

  async addToFavourits(data: AddFavouritsInput) {
    const response: Favourite = await this.put(`/v1/favourites/add`, data);
    return response;
  }

  async removeFromFavourites(data: AddFavouritsInput) {
    const response: Favourite = await this.put(`/v1/favourites/remove`, data);
    return response;
  }
}

export { FavouritesAPI };
