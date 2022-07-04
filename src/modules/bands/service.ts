import { RESTDataSource, RequestOptions } from "apollo-datasource-rest";
import { BandInput, BandUpdateInput } from "./types";

class BandsAPI extends RESTDataSource {
  constructor() {
    super();
    this.baseURL = `http://localhost:${process.env.BANDS_PORT}`;
  }

  willSendRequest(request: RequestOptions) {
    request.headers.set("Authorization", `Bearer ${this.context.authToken}`);
  }

  async getBands() {
    const bands = await this.get("/v1/bands");
    return bands.items;
  }

  async getBandById(id: string) {
    const band = await this.get(`/v1/bands/${id}`);
    return band;
  }

  async createBand(data: BandInput) {
    const response = await this.post(`/v1/bands`, data);
    return response;
  }

  async deleteBand(id: string) {
    const response = await this.delete(`/v1/bands/${id}`);
    return response;
  }

  async updateBand(id: string, body: BandUpdateInput) {
    const response = await this.put(`/v1/bands/${id}`, body);
    return response;
  }
}

export { BandsAPI };
